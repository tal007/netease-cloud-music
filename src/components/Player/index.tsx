/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:40:48
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 12:49:48
 * 音乐播放组件
 */

import "./index.less";
import { FC, useEffect, useState, useRef } from "react";
import Pubsub from "pubsub-js";
import { Avatar, Image, Spin, Space, message } from "antd";

import MyIcon from "../../Icons";

import useUrlLoader from "../../hooks/useURLLoader";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import { MUSICID, MUISCLIST } from "../../constant";
import { formatTime } from "../../util";

import MusicName from "../../components/MusicName";
import Progress from "./Progress";
import MusicList from "./MusicList";
import MusicLyric from "./MusicLyric";
import { MusicItemProps } from "components/MusicItem";

type playType = "NEXT" | "PREV" | "RANDOM" | "CYCLE";

const Player: FC = () => {
  const audioNode = useRef<HTMLAudioElement | null>(null);
  const [currentMusicID, setCurrentMusicID] = useState<number | string>(0);
  const [music, setMusic] = useState<MusicItemProps | null>(null);
  const [musicList, setMusicList] = useState<MusicItemProps[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [runing, setRunning] = useState<boolean>(false);
  // 音乐列表
  const [hiddenList, setHiddenList] = useState<boolean>(true);
  const [hiddenLyric, setHiddenLyric] = useState<boolean>(true);
  const { ajax, loading } = useUrlLoader();

  const setProgress = () => {
    if (audioNode.current) {
      const percent =
        audioNode.current.currentTime / audioNode.current.duration;
      if (percent >= 1) {
        PubSub.publish(MUSICID, findMusic("NEXT").id);
      }
      setPercent(percent * 100);
      setCurrentTime(audioNode.current.currentTime);
    }
  };

  useAnimationFrame(setProgress, runing);

  useEffect(() => {
    function keydownPauseOrPlay(e: KeyboardEvent) {
      if (e.code === "Space") {
        playOrPauseMusic();
      }
    }

    window.addEventListener("keydown", keydownPauseOrPlay);

    const pubsubNusicID = Pubsub.subscribe(
      MUSICID,
      (msg: string, data: number | string) => {
        setRunning(false);
      }
    );

    const pubsubNusicList = Pubsub.subscribe(
      MUISCLIST,
      (msg: string, data: MusicItemProps[]) => {
        if (data !== musicList) {
          setMusicList(data);
        }
      }
    );

    return () => {
      Pubsub.unsubscribe(pubsubNusicID);
      Pubsub.unsubscribe(pubsubNusicList);

      window.removeEventListener("keydown", keydownPauseOrPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      return music.id === currentMusicID;
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
    PubSub.publish(MUSICID, findMusic("NEXT").id);
  };

  const playPreviousMusic = () => {
    PubSub.publish(MUSICID, findMusic("PREV").id);
  };

  const showLyric = () => {
    setHiddenLyric(!hiddenLyric);
  };

  if (!music)
    return <div className="music-player-no-music">请选择要播放的音乐</div>;

  return (
    <div className="music-player">
      {/* <audio ref={audioNode} src={music.playUrl} autoPlay />
      {!loading && audioNode.current ? (
        <div className="controler">
          <Progress current={percent} />
          <div className="info">
            <Space size={10} className="muisc">
              <Avatar
                shape="square"
                size={40}
                icon={
                  <Image
                    preview={false}
                    src={music.al.picUrl}
                    onClick={showLyric}
                  />
                }
              />
              <div>
                <MusicName name={music.name} alia={music.alia} />
                <div>
                  {formatTime(audioNode.current.currentTime)} /{" "}
                  {formatTime(audioNode.current.duration)}
                </div>
              </div>
            </Space>
            <Space size={10} className="control">
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
            </Space>
            <Space className="list">
              <MyIcon type="icon-yinliang" className="vioce" />
              <MyIcon
                type="icon-bofangliebiao"
                className="musiclist"
                onClick={showMusicList}
              />
              <MyIcon type="icon-shunxubofang" className="playtype" />
            </Space>
          </div>
        </div>
      ) : (
        <div className="music-player-no-music">
          <Spin />
        </div>
      )}
      <MusicList hidden={hiddenList} musicList={musicList} />
      <MusicLyric
        hidden={hiddenLyric}
        id={currentMusicID}
        currentTime={currentTime}
        percent={percent}
        runing={runing}
      /> */}
    </div>
  );
};

export default Player;
