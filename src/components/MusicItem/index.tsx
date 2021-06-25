/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 18:23:27
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 16:25:47
 */

/*
 * @Author: 刘玉田
 * @Date: 2021-05-26 10:52:45
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 10:22:46
 */

import { FC } from "react";
import { Avatar, Button, Dropdown, List, Space } from "antd";
import MusicName from "components/MusicName";
import { formatTime, fillNumber, mySubString } from "utils";
import styled from "@emotion/styled";
import { CustomImage } from "components/CustomImage";
import { MusicItemProps } from "types/musicItem";
import { useDispatch } from "react-redux";
import { musicActions } from "store/music.slice";
import { playListActions } from "store/playList.slice";

const MusicItem: FC<{
  music: MusicItemProps;
  i: number;
  musicList: MusicItemProps[];
  showImage?: boolean;
}> = ({ music, i, musicList, showImage = true }) => {
  const dispatch = useDispatch();

  const handleDBClick = () => {
    dispatch(musicActions.setMusicId(music.id));
    dispatch(playListActions.setMusicList(musicList));
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

  const addToPlaylist = () => {
    dispatch(playListActions.addMusic(music));
  };

  // ! 8 才是免费的 1是购买单曲 3是购买专辑
  if (music.fee !== 8) return null;
  return (
    <ListItem
      onDoubleClick={handleDBClick}
      actions={[
        <Button type={"link"} onClick={addToPlaylist}>
          添加到播放列表
        </Button>,
      ]}
    >
      <Space size={20} style={{ width: 370 }}>
        <SerialNumber>{fillNumber(i)}</SerialNumber>
        {showImage && (
          <Avatar
            shape="square"
            size={48}
            icon={<CustomImage url={imageUrl} />}
          />
        )}
        <MusicName name={music.name} alia={music.alia || music.alias || []} />
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
