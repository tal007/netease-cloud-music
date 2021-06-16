/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:49:18
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 17:48:01
 */

import { FC, useEffect } from "react";
import { Row } from "antd";

import EntryTitle from "../../components/EntryTitle/index";
import RecommendedPlaylistItem from "../../components/RecommendedPlaylistItem";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";

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
        <EntryTitle titleName="推荐歌单" />
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
