/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 14:34:24
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 17:24:46
 * 播放列表
 */

import { FC } from "react";
import { Avatar, Image, List } from "antd";
import { fillNumber } from "utils";
import useWindowResize from "hooks/useWindowResize";
import MusicName from "components/MusicName";
import styled from "@emotion/styled";
import { MusicItemProps } from "types/musicItem";
import { useDispatch } from "react-redux";
import { musicActions } from "store/music.slice";

const MusicItem: FC<{ music: MusicItemProps; i: number }> = ({ music, i }) => {
  const dispatch = useDispatch();
  const play = () => dispatch(musicActions.setMusicId(music.id));

  const imageUrl = music.album
    ? music.album.picUrl
    : music.al
    ? music.al.picUrl
    : "";

  // ! 8 才是免费的 1是购买单曲 3是购买专辑
  if (music.fee && music.fee !== 8) return null;

  return (
    <List.Item onDoubleClick={play}>
      <Index>{fillNumber(i + 1)}</Index>
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            // ? 这里还要兼容首页请求的新歌速递的音乐类型
            icon={<Image preview={false} src={music.picUrl || imageUrl} />}
          />
        }
        title={
          <MusicName name={music.name} alia={music.alias || music.alia || []} />
        }
      />
    </List.Item>
  );
};

const MusicList: FC<{ hidden: boolean; musicList: MusicItemProps[] }> = ({
  hidden,
  musicList,
}) => {
  const { windowInnerHeight } = useWindowResize();

  return (
    <MusicListContainer
      style={{ width: hidden ? 0 : `40rem`, height: windowInnerHeight - 60 }}
    >
      <List split={false}>
        {musicList.map((music, index) => (
          <MusicItem key={music.id} i={index} music={music} />
        ))}
      </List>
    </MusicListContainer>
  );
};

export default MusicList;

const MusicListContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 100%;
  z-index: 21;

  width: 40rem;
  background-image: var(--dark-gradient);
  box-shadow: 0 0 5px var(--color-middle);
  overflow-y: scroll;
  transition: width 0.3s ease;
`;

const Index = styled.span`
  display: inline-block;
  width: 3rem;
  margin: 0 1.5rem 0 0;
  color: #fff;
  text-align: right;
`;
