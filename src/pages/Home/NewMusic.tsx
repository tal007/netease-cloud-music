/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 14:28:41
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 17:20:12
 * 新歌速递
 */

import { FC } from "react";
import { Avatar, Col, Row } from "antd";

import { fillNumber } from "../../utils";
import EntryTitle from "../../components/EntryTitle/index";
import { useAjax } from "hooks/useAjax";
import { PageContainer } from "components/PageContainer";
import styled from "@emotion/styled";
import MusicName from "components/MusicName";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { musicActions } from "store/music.slice";
import { playListActions } from "store/playList.slice";
import { HomeNewMusicItemProps } from "types/musicItem";

const NewMusic: FC = () => {
  const client = useAjax();

  const { isLoading, error, data } = useQuery<
    {
      category: number;
      code: number;
      result: HomeNewMusicItemProps[];
    },
    Error
  >("newsong", () => client("/personalized/newsong"));

  return (
    <PageContainer isLoading={isLoading} error={error}>
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
  music: HomeNewMusicItemProps;
  num: number | string;
  musicList: HomeNewMusicItemProps[];
}> = ({ music, num, musicList }) => {
  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(musicActions.setMusicId(id));
    dispatch(playListActions.setMusicList(musicList));
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
