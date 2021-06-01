/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:57:07
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-01 16:49:34
 * 歌单详情
 */

import { FC, useState, useEffect } from 'react';
import queryString from 'query-string';
import { Image, Avatar, Typography } from 'antd';

import useUrlLoader from '../../hooks/useURLLoader';

import Loading from '../../components/Loading';

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
  playlist: SongList
}

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
        setSongListDetail(playlistResponse.playlist);
        let trackIds = ids(playlistResponse.playlist.trackIds);

        ajax<{ songs: MusicList }>(`/song/detail?ids=${trackIds}`, 'GET')
          .then((songResponse) => {
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
        <Avatar
          size={200}
          shape="square"
          icon={
            <Image
              preview={false}
              width={200}
              height={200}
              src={songListDetail.coverImgUrl}
            />
          }
        />
        <div className="infos">
          <Typography.Title level={3}>
            {songListDetail.name}
          </Typography.Title>
        </div>
      </header>
      <div className="song-list-detail-content"></div>
    </div>
  );
};

export default SongListDetail;
