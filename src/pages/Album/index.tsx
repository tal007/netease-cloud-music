/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 10:50:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-15 12:37:25
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
      <MyPageHeader title={"专辑"} subTitle={"Albums"} />
      <PageContainer isLoading={isLoading} data={data?.albums || []}>
        <Row gutter={[30, 30]}>
          {data &&
            data.albums.map((value) => <AlbumItem key={value.id} {...value} />)}
        </Row>
      </PageContainer>
    </>
  );
};

export default Album;
