/*
 * @Author: 刘玉田
 * @Date: 2021-05-26 10:52:45
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 10:22:46
 */

import { FC } from "react";
import { Avatar, List, Space } from "antd";
import Pubsub from "pubsub-js";

import { MUSICID, MUISCLIST } from "../../constant";
import MusicName from "../../components/MusicName";
import { formatTime, fillNumber, mySubString } from "../../util";
import { ResponseDataItem } from ".";
import styled from "@emotion/styled";
import { CustomImage } from "components/CustomImage";

const Item: FC<{
  music: ResponseDataItem;
  i: number;
  musicList: ResponseDataItem[];
}> = ({ music, i, musicList }) => {
  const handleDBClick = () => {
    Pubsub.publish(MUSICID, music.id);
    Pubsub.publish(MUISCLIST, musicList);
  };

  return (
    <ListItem onDoubleClick={handleDBClick}>
      <Space size={20}>
        <SerialNumber>{fillNumber(i)}</SerialNumber>
        <Avatar
          shape="square"
          size={48}
          icon={<CustomImage url={music.album.picUrl} />}
        />
        {music.alias && <MusicName name={music.name} alia={music.alias} />}
      </Space>
      <div>
        <AlbumAndSinger>{music.artists?.[0].name}</AlbumAndSinger>
        <AlbumAndSinger>{mySubString(music.album.name, 20)}</AlbumAndSinger>
        <PlayTime>{formatTime(music.duration)}</PlayTime>
      </div>
    </ListItem>
  );
};

export default Item;

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
