/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:58:39
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-01 16:00:37
 */

import './index.less';
import { FC } from 'react';
import { Image, Col } from 'antd';
import { Link } from 'react-router-dom';

const RecommendedPlaylistItem: FC<{
  name: string;
  imageUrl: string;
  id: number;
  span?: number;
}> = ({ name, imageUrl, id, span = 6 }) => {
  return (
    <Col
      className="recommended-playlist-item gutter-row"
      data-id={id}
      span={span}
      md={6}
      xl={4}
    >
      <Link to={`song-list-detail?id=${id}`}>
        <Image preview={false} src={imageUrl} />
        {name}
      </Link>
    </Col>
  );
};

export default RecommendedPlaylistItem;
