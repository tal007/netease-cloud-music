/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 15:52:00
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 16:34:13
 * 当前播放音乐切片
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  id: number;
}

const initialState: State = {
  id: 0,
};

export const currentMusicSlice = createSlice({
  name: "currentPlayMusic",
  initialState,
  reducers: {
    setMusicId(state, action) {
      state.id = action.payload;
    },
  },
});

export const musicActions = currentMusicSlice.actions;

export const currentMusicId = (state: RootState) => state.currentMusicID.id;
