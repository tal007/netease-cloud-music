import { FC } from "react";
import { Spin } from "antd";
import styled from "@emotion/styled";

export const LoadingContainer: FC<{
  children?: React.ReactElement;
  showIcon?: boolean;
}> = ({ children, showIcon = true }) => {
  return (
    <Container>
      {children}
      {showIcon && (
        <Loading>
          <Spin size={"large"} />
        </Loading>
      )}
    </Container>
  );
};

export default LoadingContainer;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
  width: 100%;
`;

const Loading = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
