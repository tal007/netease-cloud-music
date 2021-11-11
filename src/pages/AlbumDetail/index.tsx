/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:38:40
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 17:27:28
 * 专辑详情
 */

import styled from "@emotion/styled";
import { useAjax } from "hooks/useAjax";
import { Divider, List, Menu, Tag, Typography } from "antd";
import { CustomImage } from "components/CustomImage";
import { PageContainer } from "components/PageContainer";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FlexBoxCenter, MyButton } from "style";
import MusicItem from "components/MusicItem";
import { MusicItemProps } from "types/musicItem";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { musicActions } from "store/music.slice";
import { playListActions } from "store/playList.slice";

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

export const AlbumDetail = () => {
  const { id } = useParams();
  const client = useAjax();
  const { isLoading, data, error } = useQuery<
    {
      code: number;
      resourceState: boolean;
      album: AlbumData;
      songs: MusicItemProps[];
    },
    Error
  >(["album-detail", { id }], () =>
    client(`/album`, { data: { id, limit: 60 } })
  );

  return (
    <PageContainer isLoading={isLoading} error={error}>
      {data && (
        <>
          <Header album={data.album} songs={data.songs} />
          <Divider />
          <Content songs={data.songs} description={data.album.description} />
        </>
      )}
    </PageContainer>
  );
};

const Header: FC<{ album: AlbumData; songs: MusicItemProps[] }> = ({
  album,
  songs,
}) => {
  const dispatch = useDispatch();

  const palyAll = () => {
    dispatch(musicActions.setMusicId(songs[0].id));
    dispatch(playListActions.setMusicList(songs));
  };

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
        <MyButton onClick={palyAll}>播放全部</MyButton>
      </Description>
    </HeaderContainer>
  );
};

const Content = ({
  songs,
  description,
}: {
  songs: MusicItemProps[];
  description: string;
}) => {
  const [current, setCurrent] = useState("list");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        style={{ background: "transparent" }}
        theme={"dark"}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key={"list"}>歌曲列表</Menu.Item>
        <Menu.Item key={"description"}>专辑详情</Menu.Item>
      </Menu>
      {current === "list" ? (
        <MusicList songs={songs} />
      ) : (
        <AlbumDescription description={description} />
      )}
    </>
  );
};

const MusicList = ({ songs }: { songs: MusicItemProps[] }) => (
  <List split={false}>
    {songs.map((value, index) => (
      <MusicItem
        key={value.id}
        i={index + 1}
        showImage={false}
        music={value}
        musicList={songs}
      />
    ))}
  </List>
);

const AlbumDescription = ({ description }: { description: string }) => {
  return <div>{description}</div>;
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--light-gradient);
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  margin-left: 2rem;
`;
