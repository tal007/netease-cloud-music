/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 10:50:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 14:26:54
 * 专辑
 */

import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { FC } from "react";
import { PageContainer } from "components/PageContainer";
import { Row } from "antd";
import { MyPageHeader } from "style";
import { ArtistItem } from "./ArtistItem";
import Helmet from "react-helmet";
export interface ArtistsItemProps {
  name: string;
  img1v1Url: string;
  id: number;
  publishTime: number;
  alias: string[];
}

const Artists: FC = () => {
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{ code: number; more: boolean; artists: ArtistsItemProps[] }>();

  useMount(() => {
    run(client("/top/artists", { data: { limit: 60 } }));
  });

  return (
    <>
      <Helmet title={"热门歌手"} />
      <MyPageHeader title={"热门歌手 Top 60"} subTitle={"Artists"} />
      <PageContainer isLoading={isLoading}>
        <Row gutter={[30, 30]}>
          {data &&
            data.artists.map((value) => (
              <ArtistItem key={value.id} {...value} />
            ))}
        </Row>
      </PageContainer>
    </>
  );
};

export default Artists;
