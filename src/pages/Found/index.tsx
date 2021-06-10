import "./index.less";
import { FC } from "react";
import { Divider } from "antd";

import Banner from "./Banner";
import RecommendedPlaylist from "./RecommendedPlaylist";
import NewMusic from "./NewMusic";

const Found: FC = () => {
  return (
    <div className="app-found">
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
