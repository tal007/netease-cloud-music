/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:05:54
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-15 17:37:59
 * 歌手详情
 */

import styled from "@emotion/styled";
import { useAjax } from "ajax";
import { PageContainer } from "components/PageContainer";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { useParams } from "react-router-dom";
import { MyPageHeader } from "style";

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
  const {
    run: getArtistDetail,
    isLoading: artistDetailLoading,
    data: artistDetail,
  } = useAsync<{ code: number; message: string; data: ArtistDetail }>();
  useMount(() => {
    getArtistDetail(client(`/artist/detail?id=${id}`, { data: { limit: 60 } }));
  });

  console.log(artistDetail);

  return (
    <PageContainer isLoading={artistDetailLoading}>
      <MyPageHeader title={artistDetail?.data.artist.name} />
    </PageContainer>
  );
};

const Container = styled.div``;
