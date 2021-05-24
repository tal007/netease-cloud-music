/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 15:23:40
 * 新歌速递
 */

import { FC, useState, useEffect } from 'react';
import { Row } from 'antd'

import { fillNumber } from '../../util';
import EntryTitle from '../../components/EntryTitle/index';
import useUrlLoader from '../../hooks/useURLLoader';
import NewMusicItem from '../../components/MusicItem/NewMusicItem';

type NewMusicItemList = NewMusicItem[];
interface NewMusicItemListResponse {
  data: NewMusicItem[];
}

const NewMusic: FC = () => {
  const { ajax, loading } = useUrlLoader();
  const [newMusicList, setNewMusicList] = useState<NewMusicItemList>([]);

  useEffect(() => {
    // limt 最大30
    ajax<NewMusicItemListResponse>('/top/song?type=0', 'GET')
      .then((response) => {
        setNewMusicList(response.data.slice(0, 10));
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-found-new-music">
      <EntryTitle titleName="新歌速递" />
      <Row gutter={[30, 30]} className="app-found-new-music-list">
        {newMusicList.map((music, index) => {
          return (
            <NewMusicItem
              music={music}
              num={fillNumber(index + 1)}
              key={music.id}
            />
          );
        })}
      </Row>
    </div>
  );
};

export default NewMusic;
