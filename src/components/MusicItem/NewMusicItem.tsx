/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:03:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 15:34:55
 * 音乐信息
 */

import './new-music-item.less';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image, Col } from 'antd';

const NewMusicItem: FC<{ music: NewMusicItem; num: number | string }> = ({
  music,
  num,
}) => {
  return (
    <Col span={12} className="new-music-item">
      <Avatar
        shape="square"
        size={64}
        icon={
          <Image preview={false} src={music.album.picUrl} alt={music.name} />
        }
      />
      <span className="num">{num}</span>
      <div className="desc">
        <div>
          {music.name} <span className="alias">{music.album.alias[0] && `(${music.album.alias[0]})`}</span>
        </div>
        <div>
          <Link to="">{music.album.artists[0].name}</Link>
        </div>
      </div>
    </Col>
  );
};

export default NewMusicItem;
