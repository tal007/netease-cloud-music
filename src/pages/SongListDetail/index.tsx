/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:57:07
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 13:56:25
 * 歌单详情
 */

import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Image, Avatar, Typography, Space, Divider, Tag, List } from "antd";

import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { PageContainer } from "components/PageContainer";
import styled from "@emotion/styled";
import { CustomImage } from "components/CustomImage";
import MusicItem, { MusicItemProps } from "components/MusicItem";

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

const SongListDetail: FC = () => {
  const { id } = useParams();
  const client = useAjax();
  const { run: getSongList, data: songList } =
    useAsync<{ code: number; playlist: SongList }>();
  const {
    run: getMusicList,
    isLoading: musicListLoading,
    data: musicList,
  } = useAsync<{ code: number; songs: MusicItemProps[] }>();

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

  return (
    <PageContainer isLoading={musicListLoading}>
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
          <Typography.Title level={5}>歌曲列表</Typography.Title>
          {musicList && (
            <List
              dataSource={musicList.songs}
              // header={}
              rowKey={(value) => `${value.id}`}
              style={{ color: "#FFF" }}
              renderItem={(value, index) => (
                <MusicItem
                  key={value.id}
                  music={value}
                  musicList={musicList.songs}
                  i={index + 1}
                />
              )}
            />
          )}
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
  background: var(--light-gradient);

  .ant-image {
    border-radius: 8px;
    overflow: hidden;
  }
`;

const Infos = styled.div`
  width: calc(100% - 200px);
  margin-left: 20px;
`;
