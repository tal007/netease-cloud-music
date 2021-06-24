/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 15:52:00
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 17:04:48
 * 播放列表切片
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { MusicItemProps } from "types/musicItem";
import { filterMusic } from "utils";

interface State {
  musicList: MusicItemProps[];
}

const initialState: State = {
  musicList: [],
};

export const playListSlice = createSlice({
  name: "currentPlayMusic",
  initialState,
  reducers: {
    setMusicList(state, action) {
      const newList = filterMusic(action.payload);
      console.log(newList);
      state.musicList = newList;
    },
  },
});

export const playListActions = playListSlice.actions;

export const playList = (state: RootState) => state.playList.musicList;
