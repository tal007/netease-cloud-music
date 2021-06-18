import styled from "@emotion/styled";
import React, { FC } from "react";

import { FlexBoxCenter } from "style";
import { Avatar, Button } from "antd";
import { useAuth } from "context/authContext";
import { Link } from "react-router-dom";
import { CustomImage } from "components/CustomImage";
import { loginOut } from "authProvider";

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
      <FlexBoxCenter height={"5rem"}>
        <Avatar icon={<CustomImage url={user.profile.avatarUrl} />} />
        <span style={{ marginLeft: "1rem" }}>{user.profile.nickname}</span>
      </FlexBoxCenter>
      <Button type={"link"} onClick={loginOut}>
        退出登录
      </Button>
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
