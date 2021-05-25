/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:03:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 15:50:41
 * 音乐信息
 */

import './new-music-item.less';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image, Col } from 'antd';
import Pubsub from 'pubsub-js';
import { MUISCID, MUISCLIST } from '../../constant';

import MusicName from '../../components/MusicName';

const NewMusicItem: FC<{
  music: MusicItem;
  num: number | string;
  musicList: MusicItem[];
}> = ({ music, num, musicList }) => {
  const handleClick = (id: number) => {
    Pubsub.publish(MUISCID, id);
    Pubsub.publish(MUISCLIST, musicList);
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
        icon={<Image preview={false} src={music.picUrl} alt={music.name} />}
      />
      <span className="num">{num}</span>
      <div className="desc">
        <MusicName name={music.name} alia={music.song.alias} />
        <div>
          <Link to="">{music.song.artists[0].name}</Link>
        </div>
      </div>
    </Col>
  );
};

export default NewMusicItem;
