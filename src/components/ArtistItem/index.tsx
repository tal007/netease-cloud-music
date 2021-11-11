/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 15:17:04
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 14:22:26
 * 歌手
 */

import styled from "@emotion/styled";
import { Typography, Col } from "antd";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";
import { ArtistsItemProps } from "types/artists";

interface Props extends ArtistsItemProps {
  span?: number;
}

export const ArtistItem = (props: Props) => {
  return (
    <Container data-id={props.id} span={props?.span || 6} md={6} xl={4}>
      <Link to={`${props.id}`}>
        <CustomImage url={props.img1v1Url} />
        <Typography.Text ellipsis={false}>
          {props.name}
          {props.alias[0] && `(${props.alias[0]})`}
        </Typography.Text>
      </Link>
    </Container>
  );
};

const Container = styled(Col)`
  cursor: pointer;
  .ant-typography {
    color: #afafaf;
    /* color: var(--text-color); */
  }
  .ant-image {
    border-radius: 8px;
    overflow: hidden;
  }
`;
