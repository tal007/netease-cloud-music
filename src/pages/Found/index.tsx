import "./index.less";
import { FC } from "react";
import { Divider } from "antd";

import Banner from "./Banner";
import RecommendedPlaylist from "./RecommendedPlaylist";
import NewMusic from "./NewMusic";
import Helmet from "react-helmet";

const Found: FC = () => {
  return (
    <div className="app-found">
      <Helmet title={"聆听音乐 - 沐浴自然 Mock 网易云音乐"} />
      <Banner />
      {/* <Divider style={{borderTopColor: "transparent"}}/> */}
      <NewMusic />
      <Divider style={{ borderTopColor: "transparent" }} />
      <RecommendedPlaylist />
      <Divider style={{ borderTopColor: "transparent" }} />
    </div>
  );
};

export default Found;
