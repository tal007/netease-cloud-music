/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 10:50:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 14:22:31
 * 专辑
 */

import { useAjax } from "hooks/useAjax";
import { FC } from "react";
import { PageContainer } from "components/PageContainer";
import { Row } from "antd";
import { MyPageHeader } from "style";
import { ArtistItem } from "components/ArtistItem";
import Helmet from "react-helmet";
import { useQuery } from "react-query";
import { ArtistsItemProps } from "types/artists";

const Artists: FC = () => {
  const client = useAjax();

  const { isLoading, data, error } = useQuery<
    { code: number; more: boolean; artists: ArtistsItemProps[] },
    Error
  >("artists", () => client("/top/artists", { data: { limit: 60 } }));

  return (
    <>
      <Helmet title={"热门歌手"} />
      <MyPageHeader title={"热门歌手 Top 60"} subTitle={"Artists"} />
      <PageContainer isLoading={isLoading} error={error}>
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
