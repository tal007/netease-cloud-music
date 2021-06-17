/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:57:07
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 11:42:11
 * 歌单详情
 */

import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import dayjs from "dayjs";
import { Image, Avatar, Typography, Space, Divider, Tag } from "antd";

import Item from "./Item";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { PageContainer } from "components/PageContainer";
import styled from "@emotion/styled";
import { CustomImage } from "components/CustomImage";

interface SongList {
  name: string;
  coverImgUrl: string;
  userId: number;
  createTime: number;
  description: string;
  tags: string[];
  creator: {
    nickname: string;
    avatarUrl: string;
  };
  trackIds: { id: number }[];
}

export interface MusicItem {
  name: string;
  al: { name: string; id: number; picUrl: string };
  ar: { name: string; id: number }[];
  alia: string[];
  dt: number;
  publishTime: number;
  id: number;
}

const SongListDetail: FC = () => {
  const id = queryString.parse(window.location.search).id;
  const client = useAjax();
  const {
    run: getSongList,
    isLoading: songListLoading,
    data: songList,
  } = useAsync<{ code: number; playlist: SongList }>();
  const {
    run: getMusicList,
    isLoading: musicListLoading,
    data: musicList,
  } = useAsync<{ code: number; songs: MusicItem[] }>();

  function ids(arr: { id: number }[]) {
    let s = "";
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (i === len - 1) {
        s += arr[i].id;
      } else {
        s += arr[i].id + ",";
      }
    }
    return s;
  }

  useEffect(() => {
    getSongList(client("/playlist/detail", { data: { id } }));
  }, [client, getSongList, id]);

  useEffect(() => {
    if (songList) {
      getMusicList(
        client("/song/detail", {
          data: { ids: ids(songList.playlist.trackIds) },
        })
      );
    }
  }, [client, getMusicList, songList]);

  console.log(songList);
  console.log(musicList);

  return (
    <PageContainer isLoading={songListLoading && musicListLoading}>
      {songList && (
        <>
          <Header>
            <CustomImage
              url={songList.playlist.coverImgUrl}
              width={200}
              height={200}
            />
            <Infos>
              <Typography.Title level={3}>
                {songList.playlist.name}
              </Typography.Title>
              <Space direction="vertical">
                <Space size={10}>
                  <Avatar
                    icon={
                      <Image
                        preview={false}
                        src={songList.playlist.creator.avatarUrl}
                      />
                    }
                  />
                  <Link to="">{songList.playlist.creator.nickname}</Link>
                  <span>
                    {dayjs(songList.playlist.createTime).format("YYYY-MM-DD")}
                    创建
                  </span>
                </Space>
                <div>
                  <span>标签：</span>
                  {songList.playlist.tags.map((value) => (
                    <Tag color="warning" key={value}>
                      {value}
                    </Tag>
                  ))}
                </div>
                <div>
                  <span>简介：{songList.playlist.description}</span>
                </div>
              </Space>
            </Infos>
          </Header>
          <Divider />
          <div>
            <Typography.Title level={5}>歌曲列表</Typography.Title>
            <ul>
              {musicList &&
                musicList.songs.map((music, index) => (
                  <Item
                    key={music.id}
                    music={music}
                    i={index}
                    musicList={musicList.songs}
                  />
                ))}
            </ul>
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default SongListDetail;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;

  .ant-image {
    border-radius: 8px;
    overflow: hidden;
  }
`;

const Infos = styled.div`
  width: calc(100% - 200px);
  margin-left: 20px;
`;
