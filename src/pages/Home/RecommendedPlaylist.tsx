/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:49:18
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:09:22
 */

import { FC, useEffect } from "react";
import { Col, Row } from "antd";

import EntryTitle from "../../components/EntryTitle/index";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";

interface ResultItem {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
}
const RecommendedPlaylist: FC = () => {
  const client = useAjax();
  const {
    run,
    isLoading,
    data: recommendedPlaylist,
  } = useAsync<{
    category: number;
    code: number;
    hasTaste: boolean;
    result: ResultItem[];
  }>();

  useEffect(() => {
    run(client("/personalized", { data: { limit: 12 } }));
  }, [client, run]);

  return (
    <PageContainer isLoading={isLoading}>
      <div>
        <EntryTitle titleName="推荐歌单" to="/songlist" />
        <Row gutter={[30, 30]}>
          {recommendedPlaylist &&
            recommendedPlaylist.result.map((playlistItem) => (
              <RecommendedPlaylistItem
                key={playlistItem.id}
                name={playlistItem.name}
                imageUrl={playlistItem.picUrl}
                id={playlistItem.id}
              />
            ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default RecommendedPlaylist;

const RecommendedPlaylistItem: FC<{
  name: string;
  imageUrl: string;
  id: number;
  span?: number;
}> = ({ name, imageUrl, id, span = 6 }) => {
  return (
    <Container data-id={id} span={span} md={6} xl={4}>
      <Link to={`song-list-detail/${id}`}>
        <CustomImage url={imageUrl} />
        {name}
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
