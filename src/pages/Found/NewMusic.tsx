/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 17:24:10
 * 新歌速递
 */

import { FC, useEffect } from "react";
import { Row, Skeleton } from "antd";

import { fillNumber } from "../../util";
import EntryTitle from "../../components/EntryTitle/index";
import Loading from "../../components/Loading/index";
import NewMusicItem from "../../components/MusicItem/NewMusicItem";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";

const NewMusic: FC = () => {
  const client = useAjax();
  const { run, isLoading, data: newMusicList } = useAsync<MusicList>();

  useEffect(() => {
    // limt 最大30
    // ajax<MusicItemListResponse>('/personalized/newsong?limit=10', 'GET')
    run(client("/top/song?type=0"));
  }, [client, run]);

  console.log(newMusicList);

  if (isLoading)
    return (
      <Loading showIcon={false}>
        <Skeleton avatar paragraph={{ rows: 2 }} />
      </Loading>
    );

  return (
    <div className="app-found-new-music">
      <EntryTitle titleName="新歌速递" to="/new-music" />
      <Row gutter={[30, 30]} className="app-found-new-music-list">
        {/* {newMusicList.map((music, index) => {
          return (
            <NewMusicItem
              music={music}
              num={fillNumber(index + 1)}
              key={music.id}
              musicList={newMusicList}
            />
          );
        })} */}
      </Row>
    </div>
  );
};

export default NewMusic;
