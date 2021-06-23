/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:05:54
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-23 16:17:46
 * 歌手详情
 */

import { useAjax } from "hooks/useAjax";
import { PageContainer } from "components/PageContainer";
import { useAsync } from "hooks/useAsync";
import { useParams } from "react-router-dom";
import { MyPageHeader } from "style";
import { useEffect } from "react";
import { useQuery } from "react-query";

interface ArtistDetail {
  videoCount: number;
  artist: {
    id: number;
    cover: string;
    name: string;
    briefDesc: string;
    albumSize: number; // 专辑数
    musicSize: number; // 歌曲数
    mvSize: number; // MV数
  };
}

export const Artist = () => {
  const { id } = useParams();

  const client = useAjax();

  const { isLoading, error, data } = useQuery<
    { code: number; message: string; data: ArtistDetail },
    Error
  >(["artist", { id }], () =>
    client(`/artist/detail?id=${id}`, { data: { limit: 60 } })
  );

  return (
    <PageContainer isLoading={isLoading} error={error}>
      <MyPageHeader title={data?.data.artist.name} />
    </PageContainer>
  );
};
