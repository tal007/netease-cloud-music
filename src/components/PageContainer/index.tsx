/*
 * @Author: 刘玉田
 * @Date: 2021-06-15 11:25:25
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 11:40:43
 * 页面容器，loading，数据渲染等功能
 */

import styled from "@emotion/styled";
import { FlexBoxCenter } from "style";
import Loading from "components/Loading";
import { ReactNode } from "react";

interface PageContainerProps {
  isLoading: boolean;
  children: ReactNode;
}

export const PageContainer = (props: PageContainerProps) => {
  if (props.isLoading) {
    return (
      <LoadingContainer>
        <FlexBoxCenter>
          <Loading />
        </FlexBoxCenter>
      </LoadingContainer>
    );
  }

  return <Container>{props.children}</Container>;
};

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;
