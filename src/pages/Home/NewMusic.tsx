/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 14:10:56
 * 新歌速递
 */

import { FC, useEffect } from "react";
import { Avatar, Col, Row } from "antd";

import { fillNumber } from "../../util";
import EntryTitle from "../../components/EntryTitle/index";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { PageContainer } from "components/PageContainer";
import styled from "@emotion/styled";
import MusicName from "components/MusicName";
import { Link } from "react-router-dom";
import { MUISCLIST, MUSICID } from "constant";
import pubsub from "pubsub-js";
import { CustomImage } from "components/CustomImage";

interface ResultItem {
  alg: string;
  canDislike: boolean;
  id: number;
  name: string;
  picUrl: string;
  song: {
    alias: string[];
    album: {
      artists: [
        {
          name: string;
          id: number;
        }
      ];
    };
    duration: number;
  };
}

const NewMusic: FC = () => {
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{ category: number; code: number; result: ResultItem[] }>();

  useEffect(() => {
    // limt 最大30
    // ajax<MusicItemListResponse>('/personalized/newsong?limit=10', 'GET')
    run(client("/personalized/newsong"));
  }, [client, run]);

  console.log(data);

  return (
    <PageContainer isLoading={isLoading}>
      <div>
        <EntryTitle titleName="新歌速递" to="/newmusic" />
        <Row gutter={[30, 30]}>
          {data &&
            data.result.map((music, index) => {
              return (
                <NewMusicItem
                  music={music}
                  num={fillNumber(index + 1)}
                  key={music.id}
                  musicList={data.result}
                />
              );
            })}
        </Row>
      </div>
    </PageContainer>
  );
};

export default NewMusic;

const NewMusicItem: FC<{
  music: ResultItem;
  num: number | string;
  musicList: ResultItem[];
}> = ({ music, num, musicList }) => {
  const handleClick = (id: number) => {
    pubsub.publish(MUSICID, id);
    setTimeout(() => pubsub.publish(MUISCLIST, musicList), 1000);
  };

  return (
    <Container
      lg={12}
      xs={24}
      sm={24}
      onDoubleClick={() => handleClick(music.id)}
    >
      <Avatar
        shape="square"
        size={64}
        icon={<CustomImage url={music.picUrl} alt={music.name} />}
      />
      <Num>{num}</Num>
      <div className="desc">
        <MusicName name={music.name} alia={music.song.alias} />
        <div>
          <Link to="" style={{ color: `var(--gray-text-color)` }}>
            {music.song.album.artists[0].name}
          </Link>
        </div>
      </div>
    </Container>
  );
};

const Container = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Num = styled.span`
  margin: 0 15px;
  color: var(--gray-text-color);
`;
