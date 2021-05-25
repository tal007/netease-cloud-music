/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:40:48
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 15:41:59
 * 音乐播放组件
 */

import './index.less';
import { FC, useEffect, useState, useRef } from 'react';
import Pubsub from 'pubsub-js';
import { Avatar, Image, Spin } from 'antd';

import MyIcon from '../../Icons';

import useUrlLoader from '../../hooks/useURLLoader';
import { MUISCID } from '../../constant';
import { formatTime } from '../../util';

import MusicName from '../../components/MusicName';
import Progress from './Progress';
import MusicList from './MusicList';

interface Music {
  name: string;
  id: number;
  mv: number;
  playUrl: string;
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

const Player: FC = () => {
  const audioNode = useRef<HTMLAudioElement | null>(null);
  const [music, setMusic] = useState<Music | null>(null);
  const [percent, setPercent] = useState<number>(0);
  // 音乐列表
  const [hiddenList, setHiddenList] = useState<boolean>(false)
  const { ajax, loading } = useUrlLoader();

  useEffect(() => {
    const pubsub = Pubsub.subscribe(
      MUISCID,
      (msg: string, data: number | string) => {
        let timer: any;
        ajax<MusicResponse>(`/song/detail?ids=${data}`, 'GET')
          .then((response) => {
            const playUrl = `https://music.163.com/song/media/outer/url?id=${data}.mp3`;
            setMusic(Object.assign(response.songs[0], { playUrl }));
            setPercent(0);
            clearInterval(timer);

            timer = setInterval(() => {
              if (audioNode.current) {
                const percent = audioNode.current.currentTime / audioNode.current.duration;
                if (percent >= 1) {
                  clearInterval(timer);
                }
                setPercent(percent * 100);
              }
            }, 1000);
          })
          .catch((err) => {});
      }
    );

    return () => {
      Pubsub.unsubscribe(pubsub);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playOrPauseMusic = () => {
    if (audioNode.current) {
      audioNode.current.paused ? audioNode.current.play() : audioNode.current.pause();
    }
  };

  const showMusicList = () => {
    setHiddenList(!hiddenList);
  }
  

  if (!music)
    return <div className="music-player-no-music">请选择要播放的音乐</div>;

  return (
    <div className="music-player">
      <audio ref={audioNode} src={music.playUrl} autoPlay></audio>
      {audioNode.current ? (
        <div className="controler">
          <Progress current={percent} />
          <div className="info">
            <div className="muisc">
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
            </div>
            <div className="control">
              <MyIcon type="icon-shangyiqu1" className="prev" />
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
              <MyIcon type="icon-xiayiqu" className="next" />
            </div>
            <div className="list">
              <MyIcon type="icon-yinliang" className="vioce" />
              <MyIcon type="icon-bofangliebiao" className="musiclist" onClick={showMusicList} />
              <MyIcon type="icon-shunxubofang" className="playtype" />
            </div>
          </div>
        </div>
      ) : (
        <div className="music-player-no-music">
          <Spin />
        </div>
      )}
      <MusicList hidden={hiddenList}/>
    </div>
  );
};

export default Player;
