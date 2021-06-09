import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import SearchHeader from 'components/SearchHeader';
import Home from "pages/Found/index";
import FM from "pages/FM/index";
import NewMusic from "pages/NewMusic";
import SongListDetail from "pages/SongListDetail";
import Login from "pages/Login";
import Register from "pages/Register";

import styled from "@emotion/styled";
import Player from "components/Player";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Album from "pages/Album";

const RenderPage: FC = () => {
  return (
    <RenderPageContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/fm" component={FM} />
        <Route path="/new-music" component={NewMusic} />
        <Route path="/song-list-detail" component={SongListDetail} />
        <Route path="/albums" component={Album} />
      </Switch>
    </RenderPageContainer>
  );
};

const Layout: FC = () => {
  return (
    <Grid>
      <LeftSide />
      <Main>
        <RenderPage />
        <Player />
      </Main>
      <RightSide />
    </Grid>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Layout} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "left main right"
    "left main right"
    "left main right";
  /* grid-gap: 10rem; */
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: 1fr 10rem;
`;

const RenderPageContainer = styled.div`
  padding: 0 1rem;
  height: calc(100vh - 10rem);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }
`;
