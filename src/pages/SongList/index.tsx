/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:29:21
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:45:30
 * 歌单页面
 */

import { Row } from "antd";
import { PageContainer } from "components/PageContainer";
import { SongListItem, SongListItemProps } from "components/SongListItem";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { FC, useEffect } from "react";

const SongList: FC = () => {
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{
      code: number;
      lasttime: number;
      more: boolean;
      playlists: SongListItemProps[];
      total: number;
    }>();

  useEffect(() => {
    // TODO 目前只是精品歌单，而且没有做请求更多处理
    run(client("/top/playlist/highquality"));
  }, [client, run]);

  return (
    <PageContainer isLoading={isLoading}>
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
