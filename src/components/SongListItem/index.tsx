/*
 * @Author: 刘玉田
 * @Date: 2021-06-17 14:22:16
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:42:46
 * 歌单 Item
 */

import styled from "@emotion/styled";
import { Col } from "antd";
import { CustomImage } from "components/CustomImage";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface SongListItemProps {
  id: number;
  name: string;
  copywriter: string;
  picUrl?: string;
  coverImgUrl?: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
}

export const SongListItem: FC<{ itemData: SongListItemProps; span?: number }> =
  ({ itemData, span = 6 }) => {
    return (
      <Container data-id={itemData.id} span={span} md={6} xl={4}>
        <Link to={`/songlist/detail/${itemData.id}`}>
          <CustomImage url={itemData.picUrl || itemData.coverImgUrl || ""} />
          {itemData.name}
        </Link>
      </Container>
    );
  };

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
