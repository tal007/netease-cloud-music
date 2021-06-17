/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 18:23:27
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 13:00:30
 */

/*
 * @Author: 刘玉田
 * @Date: 2021-05-26 10:52:45
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 10:22:46
 */

import { FC } from "react";
import { Avatar, List, Space } from "antd";
import Pubsub from "pubsub-js";

import { MUSICID, MUISCLIST } from "constant";
import MusicName from "components/MusicName";
import { formatTime, fillNumber, mySubString } from "util/index";
import styled from "@emotion/styled";
import { CustomImage } from "components/CustomImage";
export interface MusicItemProps {
  name: string;
  id: number;
  dt?: number;
  alia?: string[];
  al?: { name: string; id: number; picUrl: string };
  ar?: { name: string; id: number }[];
  publishTime?: number;

  duration?: number;
  alias?: string[];
  album?: {
    id: number;
    name: string;
    picUrl: string;
    publishTime: number;
  };
  artists?: [
    {
      name: string;
      id: number;
    }
  ];
}

const MusicItem: FC<{
  music: MusicItemProps;
  i: number;
  musicList: MusicItemProps[];
}> = ({ music, i, musicList }) => {
  const handleDBClick = () => {
    Pubsub.publish(MUSICID, music.id);
    Pubsub.publish(MUISCLIST, musicList);
  };

  const imageUrl = music.album
    ? music.album.picUrl
    : music.al
    ? music.al.picUrl
    : "";
  const album = music.album ? music.album.name : music.al ? music.al.name : "";
  const singer = music.artists
    ? music.artists[0].name
    : music.ar
    ? music.ar[0].name
    : "";

  return (
    <ListItem onDoubleClick={handleDBClick}>
      <Space size={20}>
        <SerialNumber>{fillNumber(i)}</SerialNumber>
        <Avatar
          shape="square"
          size={48}
          icon={<CustomImage url={imageUrl} />}
        />
        {music.alias && (
          <MusicName name={music.name} alia={music.alia || music.alias} />
        )}
      </Space>
      <div>
        <AlbumAndSinger>{singer}</AlbumAndSinger>
        <AlbumAndSinger>{mySubString(album, 20)}</AlbumAndSinger>
        <PlayTime>{formatTime(music.duration || music.dt || 0)}</PlayTime>
      </div>
    </ListItem>
  );
};

export default MusicItem;

const ListItem = styled(List.Item)`
  color: #fff;
  border-bottom: 0 !important;
`;

const SerialNumber = styled.span`
  display: inline-block;
  width: 28px;
  text-align: right;
  color: var(--gray-text-color);
`;

const AlbumAndSinger = styled.span`
  display: inline-block;
  min-width: 240px;
  text-align: center;
  margin-left: 10px;
`;

const PlayTime = styled.span`
  display: inline-block;
  min-width: 50px;
  text-align: center;
  margin-left: 10px;
`;
