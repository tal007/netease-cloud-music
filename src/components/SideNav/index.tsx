import { FC } from "react";
import { NavLink } from "react-router-dom";

import MyIcon from "../../Icons";
import styled from "@emotion/styled";

const LinkItem: FC<{ name: string; to: string; icon: React.ReactElement }> = ({
  name,
  to,
  icon,
}) => {
  return (
    <li>
      <LinkItemS exact to={to}>
        {icon}
        <LinkItemText>{name}</LinkItemText>
      </LinkItemS>
    </li>
  );
};

const SideNav: FC = () => {
  return (
    <Container className="app-side-nav">
      <ul>
        <LinkItem
          to="/"
          name="发现音乐"
          icon={<MyIcon type="icon-xuanzhongshangcheng" />}
        />
        <LinkItem to="fm" name="私人FM" icon={<MyIcon type="icon-fm" />} />
      </ul>
    </Container>
  );
};

export default SideNav;

const Container = styled.div`
  border-top: 4px solid var(--color-deep);
  border-bottom: 4px solid var(--color-deep);
`;

const LinkItemS = styled(NavLink)`
  display: inline-block;
  margin: 1em 10px 0;
  padding: 10px 10px;
  color: var(--text-color);
  text-transform: uppercase;
  border-left: 4px solid transparent;

  &.active {
    color: var(--red);
    border-left: 4px solid var(--red);
    background-image: linear-gradient(
      to right,
      var(--red-linear-gradient),
      var(--color-middle)
    );
  }
`;

const LinkItemText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;
