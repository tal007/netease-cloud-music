/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 16:36:59
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-23 16:14:09
 * 新歌速递页面
 */

import { FC, useState } from "react";
import { List, Menu } from "antd";
import { useAjax } from "hooks/useAjax";
import { PageContainer } from "components/PageContainer";
import { menus } from "./menus";
import styled from "@emotion/styled";
import MusicItem from "components/MusicItem";
import { MusicItemProps } from "types/musicItem";
import { useQuery } from "react-query";

type Type = 0 | 7 | 96 | 8 | 16;

const NewMusic: FC = () => {
  const [type, setType] = useState<Type>(0);
  const client = useAjax();

  const { isLoading, data, error } = useQuery<
    { code: number; data: MusicItemProps[] },
    Error
  >(["top-songs", { type: Number(type) }], () =>
    client("/top/song", { data: { type } })
  );

  const handleClick = (e: any) => {
    setType(e.key);
  };

  return (
    <>
      <Menus onClick={handleClick} selectedKeys={[`${type}`]} mode="horizontal">
        {menus.map((value) => (
          <Menu.Item key={value.type}>{value.text}</Menu.Item>
        ))}
      </Menus>
      <PageContainer isLoading={isLoading} error={error}>
        {data && (
          <List
            split={false}
            dataSource={data.data}
            // header={}
            rowKey={(value) => `${value.id}`}
            renderItem={(value, index) => (
              <MusicItem
                key={value.id}
                music={value}
                musicList={data.data}
                i={index + 1}
              />
            )}
          />
        )}
      </PageContainer>
    </>
  );
};

export default NewMusic;

const Menus = styled(Menu)`
  background: var(--dark-gradient);
  position: sticky;
  z-index: 10;
  top: 0;
  color: #fff;
  border-bottom: 0;
`;
