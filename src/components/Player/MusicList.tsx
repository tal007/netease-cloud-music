/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 14:34:24
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 18:10:54
 * 播放列表
 */

import { FC } from "react";
import Pubsub from "pubsub-js";
import { Avatar, Image, List } from "antd";

import { MUSICID } from "constant";
import { fillNumber } from "util/index";
import useWindowResize from "hooks/useWindowResize";
import MusicName from "components/MusicName";
import { MusicItemProps } from "components/MusicItem";
import styled from "@emotion/styled";

const MusicItem: FC<{ music: MusicItemProps; i: number }> = ({ music, i }) => {
  const play = () => Pubsub.publish(MUSICID, music.id);

  const imageUrl = music.album
    ? music.album.picUrl
    : music.al
    ? music.al.picUrl
    : "";
  return (
    <List.Item onDoubleClick={play}>
      <Index>{fillNumber(i + 1)}</Index>
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
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
