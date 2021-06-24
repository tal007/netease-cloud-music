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

export const MVItem = (props: MVProps) => {
  const { name, id, imgurl16v9, playCount, duration } = props;

  return (
    <Container span={6} md={6} xl={4}>
      <Link to={`/mv/${id}`}>
        <CustomImage url={imgurl16v9} />
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
