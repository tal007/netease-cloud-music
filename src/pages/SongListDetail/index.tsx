/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:57:07
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-01 18:21:35
 * 歌单详情
 */

import './index.less';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import dayjs from 'dayjs';
import { Image, Avatar, Typography, Space } from 'antd';

import useUrlLoader from '../../hooks/useURLLoader';

import Loading from '../../components/Loading';

import Item from './Item';

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
interface SongListResponse {
  playlist: SongList;
}

export interface MusicItem {
  name: string;
  al: {name: string, id: number}
  ar: {name: string, id: number}[]
  dt: number
}

type MusicList = MusicItem[]

const SongListDetail: FC = () => {
  const id = queryString.parse(window.location.search).id;
  const { ajax, loading } = useUrlLoader();
  const [songListDetail, setSongListDetail] = useState<SongList | null>();
  const [musicList, setMusicList] = useState<MusicList>([]);

  function ids(arr: { id: number }[]) {
    let s = '';
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (i === len - 1) {
        s += arr[i].id;
      } else {
        s += arr[i].id + ',';
      }
    }
    return s;
  }

  useEffect(() => {
    ajax<SongListResponse>(`/playlist/detail?id=${id}`, 'GET')
      .then((playlistResponse) => {
        console.log(playlistResponse.playlist);
        setSongListDetail(playlistResponse.playlist);
        let trackIds = ids(playlistResponse.playlist.trackIds);

        ajax<{ songs: MusicList }>(`/song/detail?ids=${trackIds}`, 'GET')
          .then((songResponse) => {
            console.log(songResponse);
            setMusicList(songResponse.songs);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !songListDetail) return <Loading />;

  return (
    <div className="song-list-detail">
      <header className="song-list-detail-info">
        <Image
          preview={false}
          width={200}
          height={200}
          src={songListDetail.coverImgUrl}
        />
        <div className="infos">
          <Typography.Title level={3}>{songListDetail.name}</Typography.Title>
          <Space direction="vertical">
            <Space size={10}>
              <Avatar
                icon={
                  <Image
                    preview={false}
                    src={songListDetail.creator.avatarUrl}
                  />
                }
              />
              <Link to="">{songListDetail.creator.nickname}</Link>
              <span>
                {dayjs(songListDetail.createTime).format('YYYY-MM-DD')}创建
              </span>
            </Space>
            <div>
              <span>标签：</span>
              <span>{songListDetail.tags.join('/')}</span>
            </div>
            <div>
              <span>简介：{songListDetail.description}</span>
            </div>
          </Space>
        </div>
      </header>
      <div className="song-list-detail-content">
        <Typography.Title level={5}>歌曲列表</Typography.Title>
        <ul>
          {musicList.map((music, index) => (
            <Item music={music} i={index} musicList={musicList} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongListDetail;
