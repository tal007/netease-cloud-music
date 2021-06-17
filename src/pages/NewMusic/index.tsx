/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 16:36:59
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 10:13:49
 * 新歌速递页面
 */

import { FC, useState, useEffect } from "react";
import { List, Menu } from "antd";
import Item from "./Item";
import { useAsync } from "hooks/useAsync";
import { useAjax } from "hooks/useAjax";
import { PageContainer } from "components/PageContainer";
import { menus } from "./menus";
import styled from "@emotion/styled";

type Type = 0 | 7 | 96 | 8 | 16;

export interface ResponseDataItem {
  name: string;
  id: number;
  duration: number;
  alias: string[];
  album: {
    id: number;
    name: string;
    picUrl: string;
    publishTime: number;
  };
  artists: [
    {
      name: string;
      id: number;
    }
  ];
}

const NewMusic: FC = () => {
  const [type, setType] = useState<Type>(0);
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{ code: number; data: ResponseDataItem[] }>();

  useEffect(() => {
    run(client("/top/song", { data: { type } }));
  }, [client, run, type]);

  const handleClick = (e: any) => {
    setType(e.key);
  };

  console.log(data);

  return (
    <>
      <Menus onClick={handleClick} selectedKeys={[`${type}`]} mode="horizontal">
        {menus.map((value) => (
          <Menu.Item key={value.type}>{value.text}</Menu.Item>
        ))}
      </Menus>
      <PageContainer isLoading={isLoading}>
        {/* {
          data && data.data.map((value, index) => {
            return <Item key={value.id} music={value} musicList={data.data} i={index + 1}/>;
          })
        } */}
        {data && (
          <List
            dataSource={data.data}
            // header={}
            rowKey={(value) => `${value.id}`}
            renderItem={(value, index) => (
              <Item
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
