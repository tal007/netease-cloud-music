/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:40:48
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-26 16:30:47
 * 音乐播放组件
 */

import './index.less';
import { FC, useEffect, useState, useRef } from 'react';
import Pubsub from 'pubsub-js';
import { Avatar, Image, Spin, Space, message } from 'antd';

import MyIcon from '../../Icons';

import useUrlLoader from '../../hooks/useURLLoader';
import { MUSICID, MUISCLIST } from '../../constant';
import { formatTime } from '../../util';

import MusicName from '../../components/MusicName';
import Progress from './Progress';
import MusicList from './MusicList';

interface Music {
  name: string;
  id: number;
  mv: number;
  playUrl: string;
  // 版权 0 免费
  copyright: number;
  ar: [
    {
      id: number;
      name: string;
    }
  ];
  alia: string[];
  al: {
    picUrl: string;
  };
}
interface MusicResponse {
  songs: Music[];
}

interface UrlResponse {
  data: {
    url: string | null;
  }
}

type playType = 'NEXT' | 'PREV' | 'RANDOM' | 'CYCLE';

const Player: FC = () => {
  const audioNode = useRef<HTMLAudioElement | null>(null);
  const [currentMusicID, setCurrentMusicID] = useState<number | string>(0);
  const [music, setMusic] = useState<Music | null>(null);
  const [musicList, setMusicList] = useState<MusicList>([]);
  const [percent, setPercent] = useState<number>(0);
  // 音乐列表
  const [hiddenList, setHiddenList] = useState<boolean>(true);
  const { ajax, loading } = useUrlLoader();

  function setProgress(animation: any) {
    if (audioNode.current) {
      const percent =
        audioNode.current.currentTime / audioNode.current.duration;
      if (percent >= 1) {
        cancelAnimationFrame(animation);
        PubSub.publish(MUSICID, findMusic('NEXT').id);
      } else {
        requestAnimationFrame(setProgress);
      }
      setPercent(percent * 100);
    }
  }

  useEffect(() => {
    const pubsubNusicID = Pubsub.subscribe(
      MUSICID,
      (msg: string, data: number | string) => {
        let animation: any;
        ajax<MusicResponse>(`/song/detail?ids=${data}`, 'GET')
          .then((response) => {
            // // // ajax<UrlResponse>(`/song/url?id=${data}`, 'GET')
            // // // .then(urlData => {
            // //   let playUrl = urlData.data.url;
            // //   if (!playUrl) playUrl = `https://music.163.com/song/media/outer/url?id=${data}.mp3`;

            // //   setCurrentMusicID(data);
            // //   setMusic(Object.assign(response.songs[0], { playUrl }));
            // //   setPercent(0);
            // //   cancelAnimationFrame(animation);

            // //   animation = requestAnimationFrame(setProgress);
            // // })
            // .catch(() => {
              let playUrl = `https://music.163.com/song/media/outer/url?id=${data}.mp3`;

              setCurrentMusicID(data);
              setMusic(Object.assign(response.songs[0], { playUrl }));
              setPercent(0);
              cancelAnimationFrame(animation);

              animation = requestAnimationFrame(setProgress);
            // })
            // if (response.songs[0].copyright) {
            //   // 没有版权
            //   // setMusic(Object.assign(response.songs[0], { playUrl }));
            //   setCurrentMusicID(data);
            //   setTimeout(() => platNextMusic, 300)
            //   Promise.reject('没有版权，播放下一首');
            // }
          })
          .catch((err) => {
            console.log(err.message);
            if (err === '没有版权，播放下一首') {
              message.info(err);
            }
          });
      }
    );

    const pubsubNusicList = Pubsub.subscribe(
      MUISCLIST,
      (msg: string, data: MusicList) => {
        if (data !== musicList) {
          setMusicList(data);
        }
      }
    );

    return () => {
      Pubsub.unsubscribe(pubsubNusicID);
      Pubsub.unsubscribe(pubsubNusicList);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playOrPauseMusic = () => {
    if (audioNode.current) {
      audioNode.current.paused
        ? audioNode.current.play()
        : audioNode.current.pause();
    }
  };

  const showMusicList = () => {
    setHiddenList(!hiddenList);
  };

  const findMusic = (type: playType) => {
    const i = musicList.findIndex((music) => {
      return music.id === currentMusicID;
    });
    console.log(i, currentMusicID);

    switch (type) {
      case 'NEXT':
        return i < musicList.length - 1 ? musicList[i + 1] : musicList[0];
      case 'PREV':
        return i < 1 ? musicList[musicList.length - 1] : musicList[i - 1];
      default:
        return i < musicList.length - 1 ? musicList[i + 1] : musicList[0];
    }
  };

  const platNextMusic = () => {
    PubSub.publish(MUSICID, findMusic('NEXT').id);
  };

  const playPreviousMusic = () => {
    PubSub.publish(MUSICID, findMusic('PREV').id);
  };

  if (!music)
    return <div className="music-player-no-music">请选择要播放的音乐</div>;

  return (
    <div className="music-player">
      <audio ref={audioNode} src={music.playUrl} autoPlay />
      {audioNode.current ? (
        <div className="controler">
          <Progress current={percent} />
          <div className="info">
            <Space size={10} className="muisc">
              <Avatar
                shape="square"
                size={40}
                icon={<Image src={music.al.picUrl} />}
              />
              <div>
                <MusicName name={music.name} alia={music.alia} />
                <div>
                  {formatTime(audioNode.current.currentTime)} /{' '}
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
    </div>
  );
};

export default Player;
