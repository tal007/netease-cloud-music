/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 11:23:05
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-15 17:40:02
 * 专辑项
 */

import styled from "@emotion/styled";
import React from "react";
import { AlbumItemProps } from "pages/Album";
import { Typography, Col } from "antd";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";

interface Props extends AlbumItemProps {
  span?: number;
}

export const AlbumItem = (props: Props) => {
  return (
    <Container data-id={props.id} span={props?.span || 6} md={6} xl={4}>
      <Link to={`${props.id}`}>
        <CustomImage url={props.picUrl} />
        <Typography.Text ellipsis={false}>{props.name}</Typography.Text>
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
