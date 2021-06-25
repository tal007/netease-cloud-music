/*
 * @Author: 刘玉田
 * @Date: 2021-06-25 13:35:07
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 14:45:56
 * 搜索页面
 */

import { List, Menu, Row } from "antd";
import { AlbumItem } from "components/AlbumItem";
import MusicItem from "components/MusicItem";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { ArtistItem } from "components/ArtistItem";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { searchText } from "store/searchText.slice";
import { AlbumItemProps } from "types/album";
import { MusicItemProps } from "types/musicItem";
import { ArtistsItemProps } from "types/artists";
import { SongListItem, SongListItemProps } from "components/SongListItem";
import { MVItem } from "components/MVItem";
import { MVProps } from "types/mv";
import styled from "@emotion/styled";

//  搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
type Type = 1 | 10 | 100 | 1000 | 1004;

export const Search = () => {
  const keywords = useSelector(searchText);

  const client = useAjax();
  const { isLoading, data, mutate } = useMutation((current: Type) =>
    client("/cloudsearch", {
      data: {
        keywords,
        type: current,
      },
    })
  );

  useEffect(() => {
    if (keywords) mutate(1);
  }, [keywords, mutate]);

  const [current, setCurrent] = useState<Type>(1);

  const handleClick = (e: any) => {
    setCurrent(e.key);
    mutate(e.key);
  };

  const renderContent = () => {
    switch (current * 1) {
      case 1: {
        return (
          <RenderSongs songs={data?.result.songs || ([] as MusicItemProps[])} />
        );
      }
      case 10: {
        return (
          <RenderAlbums
            albums={data?.result.albums || ([] as AlbumItemProps[])}
          />
        );
      }
      case 100: {
        return (
          <RenderSinger
            singers={data?.result.artists || ([] as ArtistsItemProps[])}
          />
        );
      }
      case 1000: {
        return (
          <RenderPlaylist
            playlists={data?.result.playlists || ([] as SongListItemProps[])}
          />
        );
      }
      case 1004: {
        return <RenderMV mvs={data?.result.mvs || ([] as MVProps[])} />;
      }
    }
  };

  return (
    <>
      <Menus
        theme={"dark"}
        onClick={handleClick}
        selectedKeys={[`${current}`]}
        mode="horizontal"
        // 使用styled theme不生效
        className="ant-menu-dark"
      >
        <Menu.Item key={1}>单曲</Menu.Item>
        <Menu.Item key={10}>专辑</Menu.Item>
        <Menu.Item key={100}>歌手</Menu.Item>
        <Menu.Item key={1000}>歌单</Menu.Item>
        <Menu.Item key={1004}>MV</Menu.Item>
      </Menus>
      <PageContainer isLoading={isLoading}>{renderContent()}</PageContainer>
    </>
  );
};

const Menus = styled(Menu)`
  background: transparent;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  color: var(--text-color);
  z-index: 1;
`;

const RenderSongs: FC<{ songs: MusicItemProps[] }> = ({ songs }) => {
  return (
    <List
      split={false}
      dataSource={songs}
      // header={}
      rowKey={(song) => `${song.id}`}
      renderItem={(value, index) => (
        <MusicItem
          key={value.id}
          music={value}
          musicList={songs}
          i={index + 1}
          showImage
        />
      )}
    />
  );
};

const RenderAlbums: FC<{ albums: AlbumItemProps[] }> = ({ albums }) => {
  return (
    <Row gutter={[30, 30]}>
      {albums.map((album) => (
        <AlbumItem key={album.id} {...album} />
      ))}
    </Row>
  );
};

const RenderSinger: FC<{ singers: ArtistsItemProps[] }> = ({ singers }) => {
  return (
    <Row gutter={[30, 30]}>
      {singers.map((value) => (
        <ArtistItem key={value.id} {...value} />
      ))}
    </Row>
  );
};

const RenderPlaylist: FC<{ playlists: SongListItemProps[] }> = ({
  playlists,
}) => {
  return (
    <Row gutter={[30, 30]}>
      {playlists.map((playlistItem) => (
        <SongListItem key={playlistItem.id} itemData={playlistItem} />
      ))}
    </Row>
  );
};

const RenderMV: FC<{ mvs: MVProps[] }> = ({ mvs }) => {
  return (
    <Row gutter={[30, 30]}>
      {mvs.map((mv) => (
        <MVItem key={mv.id} {...mv} />
      ))}
    </Row>
  );
};
