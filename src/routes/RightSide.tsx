import styled from "@emotion/styled";
import React, { FC } from "react";

import { FlexBoxCenter, MyButton } from "style";
import { Divider } from "antd";
import { useAuth } from "context/authContext";
import { Link } from "react-router-dom";

const RightSide: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <FlexBoxCenter>
          未登录，<Link to="/login">点击去登录</Link>
        </FlexBoxCenter>
      </Container>
    );
  }

  return (
    <Container>
      <MyButton block ml={"5%"} width={"90%"}>
        Made For You
      </MyButton>
      <Divider />
    </Container>
  );
};

export default RightSide;

const Container = styled.div`
  padding: 1.5rem 0;
  box-sizing: border-box;
  height: 100%;
  background: var(--light-gradient);
  /* filter: blur(1px); */
  opacity: 0.91;
  color: #afafaf;
`;
