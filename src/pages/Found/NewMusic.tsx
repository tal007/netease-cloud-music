/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-28 13:47:45
 * 新歌速递
 */

import { FC, useState, useEffect } from 'react';
import { Row, Skeleton } from 'antd'

import { fillNumber } from '../../util';
import EntryTitle from '../../components/EntryTitle/index';
import Loading from '../../components/Loading/index'
import useUrlLoader from '../../hooks/useURLLoader';
import NewMusicItem from '../../components/MusicItem/NewMusicItem';


interface MusicItemListResponse {
  data: MusicItem[];
}

const NewMusic: FC = () => {
  const { ajax, loading } = useUrlLoader();
  const [newMusicList, setNewMusicList] = useState<MusicList>([]);

  useEffect(() => {
    // limt 最大30
    // ajax<MusicItemListResponse>('/personalized/newsong?limit=10', 'GET')
    ajax<MusicItemListResponse>('/top/song?type=0', 'GET')
      .then((response) => {
        const res = response.data.slice(0, 10)
        setNewMusicList(res);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (
    <Loading showIcon={false}>
      <Skeleton avatar paragraph={{ rows: 2 }} />
    </Loading>
  )

  return (
    <div className="app-found-new-music">
      <EntryTitle titleName="新歌速递" to="/new-music"/>
      <Row gutter={[30, 30]} className="app-found-new-music-list">
        {newMusicList.map((music, index) => {
          return (
            <NewMusicItem
              music={music}
              num={fillNumber(index + 1)}
              key={music.id}
              musicList={newMusicList}
            />
          );
        })}
      </Row>
    </div>
  );
};

export default NewMusic;
