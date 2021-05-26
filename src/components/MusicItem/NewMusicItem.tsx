/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:03:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-26 14:56:26
 * 音乐信息
 */

import './new-music-item.less';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image, Col } from 'antd';
import Pubsub from 'pubsub-js';
import { MUSICID, MUISCLIST } from '../../constant';

import MusicName from '../../components/MusicName';

const NewMusicItem: FC<{
  music: MusicItem;
  num: number | string;
  musicList: MusicItem[];
}> = ({ music, num, musicList }) => {
  const handleClick = (id: number) => {
    Pubsub.publish(MUSICID, id);
    setTimeout(() => Pubsub.publish(MUISCLIST, musicList), 1000)
  };

  return (
    <Col
      lg={12}
      xs={24}
      sm={24}
      className="new-music-item"
      onDoubleClick={() => handleClick(music.id)}
    >
      <Avatar
        shape="square"
        size={64}
        icon={<Image preview={false} src={music.album.picUrl} alt={music.name} />}
      />
      <span className="num">{num}</span>
      <div className="desc">
        <MusicName name={music.name} alia={music.alias} />
        <div>
          <Link to="">{music.artists[0].name}</Link>
        </div>
      </div>
    </Col>
  );
};

export default NewMusicItem;
