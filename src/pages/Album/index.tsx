/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 10:50:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-09 13:41:01
 * 专辑
 */

import styled from "@emotion/styled";
import { useAjax } from "ajax";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import { FC } from "react";

const Album: FC = () => {
  const client = useAjax();
  const { run, isLoading, data } = useAsync();

  useMount(() => {
    run(client("/album/newest"));
  });

  console.log(isLoading, data);

  return <Container>abbum</Container>;
};

export default Album;

const Container = styled.div``;
