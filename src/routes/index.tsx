import { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import SearchHeader from 'components/SearchHeader';
import Home from "pages/Found/index";
import FM from "pages/FM/index";
import NewMusic from "pages/NewMusic";
import SongListDetail from "pages/SongListDetail";
import Login from "pages/Login";
import Register from "pages/Register";

import Sidebar from "components/Sidebar/index";
import styled from "@emotion/styled";
import Player from "components/Player";

const RenderPage: FC = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/fm" component={FM} />
          <Route path="/new-music" component={NewMusic} />
          <Route path="/song-list-detail" component={SongListDetail} />
        </Switch>
      </div>
    </div>
  );
};

const Layout: FC = () => {
  return (
    <>
      <div>
        <Sidebar />
        <RenderPage />
      </div>
      <Player />
    </>
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
  height: 100%;
`;
