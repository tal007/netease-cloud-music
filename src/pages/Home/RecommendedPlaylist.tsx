/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:49:18
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:38:04
 */

import { FC, useEffect } from "react";
import { Row } from "antd";

import EntryTitle from "../../components/EntryTitle/index";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { SongListItem, SongListItemProps } from "components/SongListItem";

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
    result: SongListItemProps[];
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
              <SongListItem key={playlistItem.id} itemData={playlistItem} />
            ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default RecommendedPlaylist;
