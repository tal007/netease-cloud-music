/*
 * @Author: 刘玉田
 * @Date: 2021-05-26 10:52:45
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-26 14:49:00
 */

import { FC } from 'react';
import { Avatar, Image, Space } from 'antd';
import Pubsub from 'pubsub-js';

import { MUSICID, MUISCLIST } from '../../constant';
import MusicName from '../../components/MusicName';
import { formatTime, fillNumber, mySubString } from '../../util';

const Item: FC<{ music: MusicItem; i: number; musicList: MusicItem[] }> = ({
  music,
  i,
  musicList,
}) => {
  const handleDBClick = () => {
    Pubsub.publish(MUSICID, music.id);
    Pubsub.publish(MUISCLIST, musicList);
  };

  return (
    <li className="app-new-music-item" onDoubleClick={handleDBClick}>
      <Space size={20}>
        <span className="serial-number">{fillNumber(i + 1)}</span>
        <Avatar
          shape="square"
          size={48}
          icon={<Image preview={false} src={music.album?.picUrl} />}
        />
        {music.alias && <MusicName name={music.name} alia={music.alias} />}
      </Space>
      <span className="singer">{music.artists?.[0].name}</span>
      {music.album && (
        <span className="album">{mySubString(music.album.name, 20)}</span>
      )}
      {music.lMusic && (
        <span className="playtime">
          {formatTime(music.lMusic.playTime / 1000)}
        </span>
      )}
    </li>
  );
};

export default Item;
