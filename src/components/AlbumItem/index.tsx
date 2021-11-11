/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 11:23:05
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 15:27:55
 * 专辑项
 */

import styled from "@emotion/styled";
import { Typography, Col } from "antd";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";
import { AlbumItemProps } from "types/album";

interface Props extends AlbumItemProps {
  span?: number;
}

export const AlbumItem = (props: Props) => {
  const { name, id, span, picUrl } = props;

  return (
    <Container data-id={id} span={span || 6} md={6} xl={4}>
      <Link to={`/albums/${id}`}>
        <CustomImage url={picUrl} />
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
