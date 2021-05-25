/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:40:48
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 14:23:26
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

import Progress from './Progress';

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
  const ref = useRef<HTMLAudioElement | null>(null);
  const [music, setMusic] = useState<Music | null>(null);
  const [percent, setPercent] = useState(0);
  const { ajax, loading } = useUrlLoader();

  useEffect(() => {
    const pubsub = Pubsub.subscribe(
      MUISCID,
      (msg: string, data: number | string) => {
        let timer:any;
        ajax<MusicResponse>(`/song/detail?ids=${data}`, 'GET')
          .then((response) => {
            const playUrl = `https://music.163.com/song/media/outer/url?id=${data}.mp3`;
            setMusic(Object.assign(response.songs[0], { playUrl }));
            setPercent(0);
            clearInterval(timer)

            timer = setInterval(() => {
              if (ref.current) {
                const percent = ref.current.currentTime / ref.current.duration;
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
    if (ref.current) {
      ref.current.paused ? ref.current.play() : ref.current.pause();
    }
  };

  if (!music)
    return <div className="music-player-no-music">请选择要播放的音乐</div>;

  return (
    <div className="music-player">
      <audio ref={ref} src={music.playUrl} autoPlay></audio>
      {ref.current ? (
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
                <div>
                  {music.name}{' '}
                  {music.alia[0] &&
                    (music.alia[0].length < 10
                      ? `(${music.alia[0]})`
                      : `(${music.alia[0].slice(
                          0,
                          12 - music.name.length
                        )}...`)}
                </div>
                <div>
                  {formatTime(ref.current.currentTime)} /{' '}
                  {formatTime(ref.current.duration)}
                </div>
              </div>
            </div>
            <div className="control">
              <MyIcon type="icon-shangyiqu1" className="prev" />
              {ref.current.paused ? (
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
              <MyIcon type="icon-yinliang" className="vioce"/>
              <MyIcon type="icon-bofangliebiao" className="musiclist"/>
              <MyIcon type="icon-shunxubofang" className="playtype"/>
            </div>
          </div>
        </div>
      ) : (
        <div className="music-player-no-music">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Player;
