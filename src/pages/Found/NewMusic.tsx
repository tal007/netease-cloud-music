/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 17:48:25
 * 新歌速递
 */

import { FC, useEffect } from "react";
import { Row } from "antd";

import { fillNumber } from "../../util";
import EntryTitle from "../../components/EntryTitle/index";
import NewMusicItem from "../../components/MusicItem/NewMusicItem";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { PageContainer } from "components/PageContainer";

const NewMusic: FC = () => {
  const client = useAjax();
  const {
    run,
    isLoading,
    data: newMusicList,
  } = useAsync<{ data: MusicList }>();

  useEffect(() => {
    // limt 最大30
    // ajax<MusicItemListResponse>('/personalized/newsong?limit=10', 'GET')
    run(
      client("/top/song", {
        data: { type: 0 },
      })
    );
  }, [client, run]);

  return (
    <PageContainer isLoading={isLoading}>
      <div>
        <EntryTitle titleName="新歌速递" to="/new-music" />
        <Row gutter={[30, 30]}>
          {newMusicList &&
            newMusicList.data.map((music, index) => {
              return (
                <NewMusicItem
                  music={music}
                  num={fillNumber(index + 1)}
                  key={music.id}
                  musicList={newMusicList.data}
                />
              );
            })}
        </Row>
      </div>
    </PageContainer>
  );
};

export default NewMusic;
