import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "pages/Home/index";
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
import SearchHeader from "components/SearchHeader";
import Artists from "pages/Artists";
import { Artist } from "pages/Artist";
import { AlbumDetail } from "pages/AlbumDetail";
import SongList from "pages/SongList";

const Layout: FC = () => {
  return (
    <Grid>
      <LeftSide />
      <Main>
        <SearchHeader />
        <RenderPageContainer>
          <Outlet />
        </RenderPageContainer>
        <Player />
      </Main>
      <RightSide />
    </Grid>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="fm" element={<FM />} />
          <Route path="newmusic" element={<NewMusic />} />
          <Route path="songlist">
            <Route path="/" element={<SongList />} />
            <Route path="detail/:id" element={<SongListDetail />} />
          </Route>
          <Route path="albums">
            <Route path="/" element={<Album />} />
            <Route path=":id" element={<AlbumDetail />} />
          </Route>
          <Route path="artists">
            <Route path="/" element={<Artists />} />
            <Route path=":id" element={<Artist />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "left main right"
    "left main right"
    "left main right";
  /* grid-gap: 10rem; */
  overflow: hidden;
`;

const Main = styled.main`
  min-width: 900px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 8rem 1fr 6rem;
  background: linear-gradient(180deg, #000c1d 0%, #08152d 100%);
  color: #fff;
`;

const RenderPageContainer = styled.div`
  padding: 0 1rem;
  height: calc(100vh - 14rem);
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
  }
`;
