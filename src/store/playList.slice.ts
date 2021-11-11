/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 15:52:00
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 16:15:58
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
      state.musicList = newList;
    },
    addMusic(state, action) {
      const newList = [...state.musicList];
      newList.push(action.payload);
      state.musicList = newList;
    },
    removeMusic(state, action) {
      const newList = [...state.musicList];
      newList.splice(action.payload, 1);
      state.musicList = newList;
    },
  },
});

export const playListActions = playListSlice.actions;

export const playList = (state: RootState) => state.playList.musicList;
