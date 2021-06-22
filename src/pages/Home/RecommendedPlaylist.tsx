/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:49:18
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:38:04
 */

import { FC } from "react";
import { Row } from "antd";

import EntryTitle from "../../components/EntryTitle/index";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { SongListItem, SongListItemProps } from "components/SongListItem";
import { useQuery } from "react-query";

const RecommendedPlaylist: FC = () => {
  const client = useAjax();

  const { isLoading, error, data } = useQuery<{
    category: number;
    code: number;
    hasTaste: boolean;
    result: SongListItemProps[];
  }>("recommendedPlaylist", () => client("personalized"));

  return (
    <PageContainer isLoading={isLoading}>
      <div>
        <EntryTitle titleName="推荐歌单" to="/songlist" />
        <Row gutter={[30, 30]}>
          {data &&
            data.result.map((playlistItem) => (
              <SongListItem key={playlistItem.id} itemData={playlistItem} />
            ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default RecommendedPlaylist;
