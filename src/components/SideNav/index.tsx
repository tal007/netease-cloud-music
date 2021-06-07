import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import MyIcon from "../../Icons";

const quickAccess = [
  { name: "首页", icon: "icon-xuanzhongshangcheng", to: "/" },
  { name: "私人FM", icon: "icon-fm", to: "/fm" },
];

const LinkItem: FC<{ name: string; to: string; icon: string }> = ({
  name,
  to,
  icon,
}) => {
  return (
    <Item exact to={to}>
      <MyIcon type={icon} />
      <LinkItemText>{name}</LinkItemText>
    </Item>
  );
};

const SideNav: FC = () => {
  return (
    <Container>
      <Inner>
        {quickAccess.map((value) => (
          <LinkItem key={value.name} {...value} />
        ))}
      </Inner>
    </Container>
  );
};

export default SideNav;

const Container = styled.div``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(NavLink)`
  padding: 4px 0;
  text-transform: uppercase;
  border-left: 4px solid transparent;
  opacity: 0.5;
  color: var(--text-color);
  text-indent: 20px;
  margin-bottom: 1rem;

  &.active {
    opacity: 1;
    border-left: 4px solid #2763bb;
    background-color: #000;
  }

  &:hover {
    color: var(--text-color);
  }
`;

const LinkItemText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;
