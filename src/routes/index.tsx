import './index.less';
import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SearchHeader from 'components/SearchHeader';
import Found from 'pages/Found/index';
import FM from 'pages/FM/index';
import NewMusic from 'pages/NewMusic';
import SongListDetail from 'pages/SongListDetail'

import Sidebar from 'components/Sidebar/index';
import Player from 'components/Player';
import { useTimeoutWithUnmount } from 'hooks/useTimeoutWithUnmount';

const RenderPage: FC = () => {
  return (
    <div className="app-render-page">
      <div className="app-content">
        <Switch>
          <Route path="/" exact component={Found} />
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
    <div className="app">
      <div className="app-content">
        <Sidebar />
        <RenderPage />
      </div>
      <Player />
    </div>
  );
};

const App: FC = () => {
  useTimeoutWithUnmount(
    () => {
      console.log('页面加载');
    },
    () => {
      console.log('页面卸载');
    },
    1000
  );

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
