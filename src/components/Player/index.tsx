/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:40:48
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 17:03:29
 * 音乐播放组件
 */

import { FC, useEffect, useState, useRef } from "react";
import { Avatar, Image, Space } from "antd";

import MyIcon from "../../Icons";

import useAnimationFrame from "../../hooks/useAnimationFrame";
import { formatTime } from "../../utils";

import MusicName from "../../components/MusicName";
import Progress from "./Progress";
import MusicList from "./MusicList";
import MusicLyric from "./MusicLyric";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { PageContainer } from "components/PageContainer";
import styled from "@emotion/styled";
import { FlexBoxCenter } from "style";
import { MusicItemProps } from "types/musicItem";
import { useSelector } from "react-redux";
import { currentMusicId, musicActions } from "store/music.slice";
import { playList } from "store/playList.slice";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

type playType = "NEXT" | "PREV" | "RANDOM" | "CYCLE";

const Player: FC = () => {
  const audioNode = useRef<HTMLAudioElement | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [runing, setRunning] = useState<boolean>(false);
  // 音乐列表
  const [hiddenList, setHiddenList] = useState<boolean>(true);
  const [hiddenLyric, setHiddenLyric] = useState<boolean>(true);

  const dispatch = useDispatch();
  const musicId = useSelector(currentMusicId);
  const musicList = useSelector(playList);

  const client = useAjax();

  const {
    isLoading,
    error,
    data: music,
  } = useQuery<{ songs: MusicItemProps[] }, Error>(
    ["currentMusic", { musicId }],
    () => client("/song/detail", { data: { ids: musicId } })
  );

  const setProgress = () => {
    if (audioNode.current) {
      const percent =
        audioNode.current.currentTime / audioNode.current.duration;
      if (percent >= 1) {
        dispatch(musicActions.setMusicId(findMusic("NEXT").id));
      }
      setPercent(percent * 100);
      setCurrentTime(audioNode.current.currentTime);
    }
  };

  useAnimationFrame(setProgress, runing);

  useEffect(() => {
    setRunning(false);
    setRunning(true);
    setPercent(0);
  }, [musicId]);

  useEffect(() => {
    function keydownPauseOrPlay(e: KeyboardEvent) {
      if (e.code === "Space") {
        playOrPauseMusic();
      }
    }

    window.addEventListener("keydown", keydownPauseOrPlay);

    return () => {
      window.removeEventListener("keydown", keydownPauseOrPlay);
    };
  }, []);

  useEffect(() => {}, []);

  const playOrPauseMusic = () => {
    if (audioNode.current) {
      if (audioNode.current.paused) {
        audioNode.current.play();
        setRunning(true);
      } else {
        audioNode.current.pause();
        setRunning(false);
      }
    }
  };

  const showMusicList = () => {
    setHiddenList(!hiddenList);
  };

  const findMusic = (type: playType) => {
    const i = musicList.findIndex((music) => {
      return music.id === musicId;
    });

    switch (type) {
      case "NEXT":
        return i < musicList.length - 1 ? musicList[i + 1] : musicList[0];
      case "PREV":
        return i < 1 ? musicList[musicList.length - 1] : musicList[i - 1];
      default:
        return i < musicList.length - 1 ? musicList[i + 1] : musicList[0];
    }
  };

  const platNextMusic = () => {
    dispatch(musicActions.setMusicId(findMusic("NEXT").id));
  };

  const playPreviousMusic = () => {
    dispatch(musicActions.setMusicId(findMusic("PREV").id));
  };

  const showLyric = () => {
    setHiddenLyric(!hiddenLyric);
  };

  if (musicId === 0)
    return (
      <MusicPlayer>
        <FlexBoxCenter>请选择要播放的音乐</FlexBoxCenter>
      </MusicPlayer>
    );

  return (
    <MusicPlayer>
      <audio
        ref={audioNode}
        src={`https://music.163.com/song/media/outer/url?id=${musicId}.mp3`}
        autoPlay
      />
      <PageContainer isLoading={isLoading} error={error}>
        <MusicPlayer>
          {audioNode.current && (
            <ControlerContainer>
              <Progress current={percent} />
              <Info>
                <Music size={10}>
                  <Avatar
                    shape="square"
                    size={40}
                    icon={
                      <Image
                        preview={false}
                        src={music?.songs[0].al?.picUrl}
                        onClick={showLyric}
                      />
                    }
                  />
                  <div>
                    <MusicName
                      name={music?.songs[0]?.name || ""}
                      alia={music?.songs[0].alia || []}
                    />
                    <div>
                      {formatTime(audioNode.current.currentTime * 1000)} /{" "}
                      {formatTime(audioNode.current.duration * 1000)}
                    </div>
                  </div>
                </Music>
                <Control size={10}>
                  <MyIcon
                    type="icon-shangyiqu1"
                    className="prev"
                    onClick={playPreviousMusic}
                  />
                  {audioNode.current.paused ? (
                    <MyIcon
                      type="icon-bofang"
                      className="pause"
                      onClick={playOrPauseMusic}
                    />
                  ) : (
                    <MyIcon
                      type="icon-zantingtingzhi"
                      className="play"
                      onClick={playOrPauseMusic}
                    />
                  )}
                  <MyIcon
                    type="icon-xiayiqu"
                    className="next"
                    onClick={platNextMusic}
                  />
                </Control>
                <List split={false}>
                  <MyIcon type="icon-yinliang" className="vioce" />
                  <MyIcon
                    type="icon-bofangliebiao"
                    className="musiclist"
                    onClick={showMusicList}
                  />
                  <MyIcon type="icon-shunxubofang" className="playtype" />
                </List>
              </Info>
            </ControlerContainer>
          )}
        </MusicPlayer>
      </PageContainer>
      <MusicList hidden={hiddenList} musicList={musicList} />
      <MusicLyric
        hidden={hiddenLyric}
        id={musicId}
        music={music?.songs[0] || ({} as MusicItemProps)}
        currentTime={currentTime}
        percent={percent}
        runing={runing}
        setHiddenLyric={setHiddenLyric}
      />
    </MusicPlayer>
  );
};

export default Player;

const MusicPlayer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 6rem;
  background-image: linear-gradient(360deg, #020814 0%, #030d20 100%);
  color: var(--text-color);
`;

const ControlerContainer = styled.div`
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 100%;
`;

const Music = styled(Space)`
  display: flex;
  flex-direction: row;
  flex-basis: 250px;

  .ant-avatar {
    margin-right: 10px;
    cursor: pointer;
  }
`;

const Control = styled(Space)`
  margin: 0 auto;
  font-size: 20px;

  .next,
  .prev,
  .play,
  .pause {
    color: var(--text-color);
  }

  .play,
  .pause {
    margin: 0 10px;
    transform: scale(1.3);
  }
`;

const List = styled(Space)`
  direction: rtl;
  font-size: 16px;
  flex-basis: 250px;
  color: var(--text-color);

  .musiclist {
    margin: 0 20px;
  }
`;
