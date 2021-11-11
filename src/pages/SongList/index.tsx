/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:29:21
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-23 16:16:06
 * 歌单页面
 */

import { Row } from "antd";
import { PageContainer } from "components/PageContainer";
import { SongListItem, SongListItemProps } from "components/SongListItem";
import { useAjax } from "hooks/useAjax";
import { FC } from "react";
import { useQuery } from "react-query";

const SongList: FC = () => {
  const client = useAjax();

  // TODO 目前只是精品歌单，而且没有做请求更多处理
  const { isLoading, error, data } = useQuery<
    {
      code: number;
      lasttime: number;
      more: boolean;
      playlists: SongListItemProps[];
      total: number;
    },
    Error
  >("song-list", () => client("/top/playlist/highquality"));

  return (
    <PageContainer isLoading={isLoading} error={error}>
      <Row gutter={[30, 30]}>
        {data &&
          data.playlists.map((value, index) => (
            <SongListItem key={value.id} itemData={value} />
          ))}
      </Row>
    </PageContainer>
  );
};

export default SongList;
