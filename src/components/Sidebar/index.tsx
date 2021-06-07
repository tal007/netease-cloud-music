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
  padding: 4.5rem 2.7rem 0 1.6rem;
  box-sizing: border-box;
  width: 30.2rem;
  height: 100%;
  background: var(--light-gradient);
  /* filter: blur(1px); */
  opacity: 0.91;
`;
