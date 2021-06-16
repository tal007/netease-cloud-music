/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 10:50:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 14:26:12
 * 专辑
 */

import { useAjax } from "ajax";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { FC } from "react";
import { PageContainer } from "components/PageContainer";
import { AlbumItem } from "components/AlbumItem";
import { Row } from "antd";
import { MyPageHeader } from "style";
import Helmet from "react-helmet";
export interface AlbumItemProps {
  name: string;
  picUrl: string;
  id: number;
  publishTime: number;
}

const Album: FC = () => {
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{ code: number; albums: AlbumItemProps[] }>();

  useMount(() => {
    run(client("/album/newest"));
  });

  return (
    <>
      <Helmet title={"最新专辑"} />
      <MyPageHeader title={"最新专辑"} subTitle={"Albums"} />
      <PageContainer isLoading={isLoading}>
        <Row gutter={[30, 30]}>
          {data &&
            data.albums.map((value) => <AlbumItem key={value.id} {...value} />)}
        </Row>
      </PageContainer>
    </>
  );
};

export default Album;
