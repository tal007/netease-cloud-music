/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 11:53:42
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 11:54:25
 * 为你而生
 */

import styled from "@emotion/styled";
import { List, Typography } from "antd";
import MusicItem from "components/MusicItem";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { useQuery } from "react-query";
import { MusicItemProps } from "types/musicItem";

export const MadeForYou = () => {
  const client = useAjax();
  const {
    isLoading,
    error,
    data: dailySongs,
  } = useQuery<{ data: { dailySongs: MusicItemProps[] } }, Error>(
    "recommend-songs",
    () => client("/recommend/songs")
  );
  console.log(dailySongs);

  return (
    <Container>
      <Typography.Title level={3}>每日推荐歌曲</Typography.Title>
      <PageContainer isLoading={isLoading} error={error}>
        <List
          split={false}
          dataSource={dailySongs?.data.dailySongs || []}
          // header={}
          rowKey={(value) => `${value.id}`}
          renderItem={(value, index) => (
            <MusicItem
              key={value.id}
              music={value}
              musicList={dailySongs?.data.dailySongs || []}
              i={index + 1}
              showImage
            />
          )}
        />
      </PageContainer>
    </Container>
  );
};

const Container = styled.div``;
