import styled from "@emotion/styled";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import MyIcon from "Icons";
import { MyButton } from "style";
import { Divider } from "antd";

interface NavItem {
  name: string;
  icon: string;
  to: string;
}

const quickAccess = [
  { name: "首页", icon: "icon-xuanzhongshangcheng", to: "/" },
  { name: "私人FM", icon: "icon-fm", to: "/fm" },
];

const Library = [
  { name: "专辑", icon: "icon-zhuanji", to: "/albums" },
  { name: "艺人", icon: "icon-yiren", to: "/artists" },
];

const LinkItem: FC<{ name: string; to: string; icon: string }> = ({
  name,
  to,
  icon,
}) => {
  return (
    <Item end={to === "/"} to={to}>
      <MyIcon type={icon} />
      <LinkItemText>{name}</LinkItemText>
    </Item>
  );
};

const Group: FC<{ data: NavItem[]; title: string }> = ({ data, title }) => (
  <GroupContainer>
    <GroupTitle>{title}</GroupTitle>
    {data.map((value) => (
      <LinkItem key={value.name} {...value} />
    ))}
  </GroupContainer>
);

const LeftSide: FC = () => {
  return (
    <Container>
      <MyButton block ml={"5%"} width={"90%"}>
        Made For You
      </MyButton>
      <Group data={quickAccess} title={"快速通道"} />
      <Group data={Library} title={"藏品"} />
      <Divider />
    </Container>
  );
};

export default LeftSide;

const Container = styled.div`
  padding: 1.5rem 0;
  box-sizing: border-box;
  height: 100%;
  background: var(--light-gradient);
  /* filter: blur(1px); */
  opacity: 0.91;
`;

const GroupContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
`;

const GroupTitle = styled.h6`
  padding-left: 2rem;
  color: #3b4c64;
  font-size: 1.8rem;
`;

const Item = styled(NavLink)`
  padding: 0.4rem 0 0.4rem 2rem;
  text-transform: uppercase;
  border-left: 4px solid transparent;
  color: #afafaf;
  margin-bottom: 1rem;

  &.active {
    color: var(--text-color);
    border-left: 4px solid #2763bb;
    background-color: #000;
  }

  &:hover {
    color: var(--text-color);
  }
`;

const LinkItemText = styled.span`
  margin-left: 10px;
`;
