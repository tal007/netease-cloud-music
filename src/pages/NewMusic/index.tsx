/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 16:36:59
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-26 15:57:21
 * 新歌速递页面
 */

import './index.less';
import { FC, useState, useEffect } from 'react';

import useUrlLoader from '../../hooks/useURLLoader';

import Item from './Item';

type Type = 0 | 7 | 96 | 8 | 16;

type MusicListResponse = {
  data: MusicItem[];
};

const NewMusic: FC = () => {
  const [musicList, setMusicList] = useState<MusicList>([]);
  const [type, setType] = useState<Type>(0);
  const { ajax, loading } = useUrlLoader();

  useEffect(() => {
    ajax<MusicListResponse>(`/top/song?type=${type}`, 'GET')
      .then((response) => {
        setMusicList(response.data);
      })
      .catch((error) => {});
  }, [type]);

  return (
    <div className="app-new-musics">
      <ul>
        {musicList.map((music, index) => (
          <Item key={music.id} i={index} music={music} musicList={musicList} />
        ))}
      </ul>
    </div>
  );
};

export default NewMusic;
