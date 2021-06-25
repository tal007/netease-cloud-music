/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:05:54
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 15:33:31
 * 歌手详情
 */

import { useAjax } from "hooks/useAjax";
import { PageContainer } from "components/PageContainer";
import { useParams } from "react-router-dom";
import { MyPageHeader } from "style";
import { useQuery } from "react-query";
import { CustomImage } from "components/CustomImage";
import styled from "@emotion/styled";
import { Divider, Menu, Row, Space, Tag, Typography } from "antd";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { MusicItemProps } from "types/musicItem";
import MusicItem from "components/MusicItem";
import { AlbumItemProps } from "types/album";
import { AlbumItem } from "components/AlbumItem";
import { MVProps } from "types/mv";
import { MVItem } from "components/MVItem";

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
      <Helmet title={`歌手详情 -- ${data?.data.artist.name}`} />
      <MyPageHeader title={"歌手详情"} />
      <Space size={"middle"}>
        <CustomImage
          width={"20rem"}
          height={"20rem"}
          url={data?.data.artist.cover || ""}
        />
        <Space size={"middle"} align={"start"} direction={"vertical"}>
          <Typography.Title level={3}>
            {data?.data.artist.name}
          </Typography.Title>
          <Space size={"middle"}>
            <div>
              单曲数：<Tag color="magenta">{data?.data.artist.musicSize}</Tag>
            </div>
            <div>
              专辑数：<Tag color="red">{data?.data.artist.albumSize}</Tag>
            </div>
            <div>
              MV数：<Tag color="volcano">{data?.data.artist.mvSize}</Tag>
            </div>
          </Space>
          <div>{data?.data.artist.briefDesc}</div>
        </Space>
      </Space>
      <Divider />
      <TabContent />
    </PageContainer>
  );
};

const TabContent = () => {
  const [current, setCurrent] = useState("music");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        style={{ background: "transparent", marginBottom: "1rem" }}
        theme={"dark"}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key={"music"}>热门50首</Menu.Item>
        <Menu.Item key={"album"}>专辑</Menu.Item>
        <Menu.Item key={"mv"}>MV</Menu.Item>
      </Menu>
      {current === "music" ? (
        <MusicTop50 />
      ) : current === "mv" ? (
        <MV />
      ) : (
        <Album />
      )}
    </>
  );
};

const MusicTop50 = () => {
  const { id } = useParams();
  const client = useAjax();
  // 热门50首
  const { data, isLoading, error } = useQuery<
    { songs: MusicItemProps[] },
    Error
  >(["top-song", { id }], () => client(`/artist/top/song?id=${id}`));

  return (
    <ItemContainer>
      <PageContainer isLoading={isLoading} error={error}>
        {data?.songs.map((song, index) => (
          <MusicItem
            key={song.id}
            music={song}
            i={index + 1}
            musicList={data?.songs || []}
            showImage
          />
        ))}
      </PageContainer>
    </ItemContainer>
  );
};

const MV = () => {
  const { id } = useParams();
  const client = useAjax();

  const { data, isLoading, error } = useQuery<{ mvs: MVProps[] }, Error>(
    ["mv", { id }],
    () => client(`/artist/mv?id=${id}`)
  );

  return (
    <ItemContainer>
      <PageContainer isLoading={isLoading} error={error}>
        <Row gutter={[30, 30]}>
          {data?.mvs.map((mv) => (
            <MVItem key={mv.id} {...mv} />
          ))}
        </Row>
      </PageContainer>
    </ItemContainer>
  );
};

const Album = () => {
  const { id } = useParams();
  const client = useAjax();

  const { data, isLoading, error } = useQuery<
    { hotAlbums: AlbumItemProps[] },
    Error
  >(["album", { id }], () => client(`/artist/album?id=${id}&limit=30`));

  return (
    <ItemContainer>
      <PageContainer isLoading={isLoading} error={error}>
        <Row gutter={[30, 30]}>
          {data?.hotAlbums.map((album) => (
            <AlbumItem key={album.id} {...album} />
          ))}
        </Row>
      </PageContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  height: auto;
`;
