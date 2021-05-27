/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 16:36:59
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-27 10:44:06
 * 新歌速递页面
 */

import './index.less';
import { FC, useState, useEffect, MouseEventHandler } from 'react';
import { Button, Space } from 'antd';

import useUrlLoader from '../../hooks/useURLLoader';

import Loading from '../../components/Loading';
import Item from './Item';

type Type = 0 | 7 | 96 | 8 | 16;

type MusicListResponse = {
  data: MusicItem[];
};

const MyButton: FC<{
  text: string;
  active: boolean;
  onClick: MouseEventHandler;
}> = ({ text, active, onClick }) => {
  return (
    <Button
      shape="round"
      type={active ? 'primary' : 'default'}
      onClick={onClick}
    >
      {text}
    </Button>
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="app-new-musics">
      {/* 类型选择 */}
      <div className="type-choose">
        <Space size={30}>
          <MyButton active={type === 0} onClick={() => setType(0)} text="全部" />
          <MyButton active={type === 7} onClick={() => setType(7)} text="华语" />
          <MyButton active={type === 96} onClick={() => setType(96)} text="欧美" />
          <MyButton active={type === 8} onClick={() => setType(8)} text="韩国" />
          <MyButton active={type === 16} onClick={() => setType(16)} text="日本" />
        </Space>
      </div>
      <ul className="music-list">
        {loading ? (
          <Loading />
        ) : (
          <>
            {musicList.map((music, index) => (
              <Item
                key={music.id}
                i={index}
                music={music}
                musicList={musicList}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default NewMusic;
