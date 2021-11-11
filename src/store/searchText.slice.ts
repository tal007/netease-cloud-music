/*
 * @Author: 刘玉田
 * @Date: 2021-06-25 13:42:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 13:47:12
 * 搜索关键词
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  keywords: string;
}

const initialState: State = {
  keywords: "",
};

export const searchTextSlice = createSlice({
  name: "currentPlayMusic",
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keywords = action.payload;
    },
  },
});

export const searchTextActions = searchTextSlice.actions;

export const searchText = (state: RootState) => state.searchText.keywords;
