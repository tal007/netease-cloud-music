import { FC } from "react";

import User from "../User/index";
import SideNav from "../SideNav/index";
import styled from "@emotion/styled";

const Sidebar: FC = () => {
  return (
    <Container>
      <User />
      <SideNav />
    </Container>
  );
};

export default Sidebar;

const Container = styled.aside`
  min-width: 20rem;
  width: 20rem;
  height: 100%;
  background: var(--color-middle);
`;
