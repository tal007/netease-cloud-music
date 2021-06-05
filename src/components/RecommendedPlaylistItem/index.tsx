/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:58:39
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-05 11:20:17
 */

import { FC } from "react";
import { Image, Col } from "antd";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const RecommendedPlaylistItem: FC<{
  name: string;
  imageUrl: string;
  id: number;
  span?: number;
}> = ({ name, imageUrl, id, span = 6 }) => {
  return (
    <Container data-id={id} span={span} md={6} xl={4}>
      <Link to={`song-list-detail?id=${id}`}>
        <Image preview={false} src={imageUrl} />
        {name}
      </Link>
    </Container>
  );
};

export default RecommendedPlaylistItem;

const Container = styled(Col)`
  cursor: pointer;
  a {
    color: var(--text-color);
  }
  .ant-image {
    border-radius: 8px;
    overflow: hidden;
  }
`;
