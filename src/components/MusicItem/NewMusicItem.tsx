/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 15:03:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-05 11:41:16
 * 音乐信息
 */

import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Image, Col } from "antd";
import Pubsub from "pubsub-js";
import styled from "@emotion/styled";
import { MUSICID, MUISCLIST } from "../../constant";

import MusicName from "../../components/MusicName";

const NewMusicItem: FC<{
  music: MusicItem;
  num: number | string;
  musicList: MusicItem[];
}> = ({ music, num, musicList }) => {
  const handleClick = (id: number) => {
    Pubsub.publish(MUSICID, id);
    setTimeout(() => Pubsub.publish(MUISCLIST, musicList), 1000);
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
        icon={
          <Image preview={false} src={music.album.picUrl} alt={music.name} />
        }
      />
      <Num>{num}</Num>
      <div className="desc">
        <MusicName name={music.name} alia={music.alias} />
        <div>
          <Link to="" style={{ color: `var(--gray-text-color)` }}>
            {music.artists[0].name}
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default NewMusicItem;

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
