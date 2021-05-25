/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:49:18
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 10:43:55
 */

import { FC, useEffect, useState } from 'react';
import { Row } from 'antd';

import EntryTitle from '../../components/EntryTitle/index';
import useUrlLoader from '../../hooks/useURLLoader';
import Loading from '../../components/Loading';
import RecommendedPlaylistItem from '../../components/RecommendedPlaylistItem';

type RecommendedPlaylistType = RecommendedPlaylistItem[];
interface RecommendedPlaylistResponse {
  result: RecommendedPlaylistType;
}

const RecommendedPlaylist: FC = () => {
  const { ajax, loading } = useUrlLoader();
  const [recommendedPlaylist, setRecommendedPlaylist] =
    useState<RecommendedPlaylistType>([]);

  useEffect(() => {
    // limt 最大30
    ajax<RecommendedPlaylistResponse>('/personalized?limit=12', 'GET')
      .then((response) => {
        setRecommendedPlaylist(response.result);
      })
      .catch((err) => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="recommended-playlist">
      <EntryTitle titleName="推荐歌单" />
      <Row gutter={[30, 30]} className="recommended-playlist-content">
        {recommendedPlaylist.map((playlistItem) => (
          <RecommendedPlaylistItem
            key={playlistItem.id}
            name={playlistItem.name}
            imageUrl={playlistItem.picUrl}
          />
        ))}
      </Row>
    </div>
  );
};

export default RecommendedPlaylist;
