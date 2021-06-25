/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 15:10:30
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 15:22:16
 * MV
 */

import styled from "@emotion/styled";
import { Col, Typography } from "antd";
import { CustomImage } from "components/CustomImage";
import { Link } from "react-router-dom";
import { MVProps } from "types/mv";
import { formatTime } from "utils";

export const MVItem = (props: MVProps) => {
  const { name, id, imgurl16v9, playCount, duration } = props;

  return (
    <Container span={6} md={6} xl={4}>
      <Link to={`/mv/${id}`}>
        <ImageContainer>
          <CustomImage url={imgurl16v9}></CustomImage>
          <PlayCount>{playCount}</PlayCount>
          <Duration>{formatTime(duration)}</Duration>
        </ImageContainer>
        <Typography.Text ellipsis={false}>{name}</Typography.Text>
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

const ImageContainer = styled.div`
  position: relative;
  color: var(--text-color);
`;

const PlayCount = styled.span`
  position: absolute;
  top: 0;
  right: 0.4rem;
`;

const Duration = styled.span`
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
`;
