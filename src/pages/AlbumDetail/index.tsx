/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 17:38:40
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 09:16:18
 * 专辑详情
 */

import styled from "@emotion/styled";
import { useAjax } from "hooks/useAjax";
import { Divider, Menu, Tag, Typography } from "antd";
import { CustomImage } from "components/CustomImage";
import { PageContainer } from "components/PageContainer";
import dayjs from "dayjs";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FlexBoxCenter, MyButton } from "style";
import { fillNumber, formatTime } from "util/index";

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
  dt: number;
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
          <Divider />
          <Content songs={data.songs} description={data.album.description} />
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

const Content = ({
  songs,
  description,
}: {
  songs: Song[];
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

const MusicList = ({ songs }: { songs: Song[] }) => (
  <MusicListContainer>
    {songs.map((value, index) => (
      <MusicListItem key={value.id} i={index + 1} {...value} />
    ))}
  </MusicListContainer>
);

const MusicListItem = (props: Song & { i: number | string }) => (
  <MusicListItemStyle>
    <span className={"index"}>{fillNumber(props.i)}</span>
    <span className={"name"}>{props.name}</span>
    <span className={"singer"}>
      {props.ar.map((value) => value.name + "/")}
    </span>
    <span className={"duration"}>{formatTime(props.dt)}</span>
  </MusicListItemStyle>
);

const AlbumDescription = ({ description }: { description: string }) => {
  return <div>{description}</div>;
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  margin-left: 2rem;
`;

const MusicListContainer = styled.ul``;

const MusicListItemStyle = styled.li`
  height: 4rem;
  line-height: 1.4;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .index {
  }
`;
