/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:38:40
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-15 18:20:54
 * 专辑详情
 */

import styled from "@emotion/styled";
import { useAjax } from "ajax";
import { Tag, Typography } from "antd";
import { CustomImage } from "components/CustomImage";
import { PageContainer } from "components/PageContainer";
import dayjs from "dayjs";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { FlexBoxCenter, MyButton } from "style";

interface AlbumData {
  name: string;
  picUrl: string;
  description: string;
  publishTime: number;
  artist: {
    name: string;
    id: number;
    picUrl: string;
  };
}

interface Song {
  id: number;
  name: string;
  mv: number;
  ar: { id: number; name: string }[];
}

export const AlbumDetail = () => {
  const { id } = useParams();

  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{
      code: number;
      resourceState: boolean;
      album: AlbumData;
      songs: Song[];
    }>();
  useMount(() => {
    run(client(`/album?id=${id}`, { data: { limit: 60 } }));
  });

  return (
    <PageContainer isLoading={isLoading}>
      {data && (
        <>
          <Header album={data.album} />
        </>
      )}
    </PageContainer>
  );
};

const Header: FC<{ album: AlbumData }> = ({ album }) => {
  return (
    <HeaderContainer>
      <CustomImage url={album.picUrl} width={"20rem"} height={"20rem"} />
      <Description>
        <Typography.Title level={3}>
          <FlexBoxCenter>
            {album.name}{" "}
            <Tag color="warning" style={{ marginLeft: "1rem" }}>
              专辑
            </Tag>
          </FlexBoxCenter>
        </Typography.Title>
        <p>
          歌手：
          <Link to={`/artists/${album.artist.id}`}>{album.artist.name}</Link>
        </p>
        <p>时间：{dayjs(album.publishTime).format("YYYY-MM-DD")}</p>
        <MyButton>播放全部</MyButton>
      </Description>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  margin-left: 2rem;
`;
