/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:03:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 16:15:58
 * 音乐信息
 */

import './new-music-item.less';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image, Col } from 'antd';
import Pubsub from 'pubsub-js'
import { MUISCID } from '../../constant'

const NewMusicItem: FC<{ music: NewMusicItem; num: number | string }> = ({
  music,
  num,
}) => {
  const handleClick = (id: number) => {
    Pubsub.publish(MUISCID, id)
  }
  
  return (
    <Col span={12} className="new-music-item" onClick={() => handleClick(music.id)}>
      <Avatar
        shape="square"
        size={64}
        icon={
          <Image preview={false} src={music.picUrl} alt={music.name} />
        }
      />
      <span className="num">{num}</span>
      <div className="desc">
        <div>
          {music.name} <span className="alias">{music.song.alias[0] && `(${music.song.alias[0]})`}</span>
        </div>
        <div>
          <Link to="">{music.song.artists[0].name}</Link>
        </div>
      </div>
    </Col>
  );
};

export default NewMusicItem;
