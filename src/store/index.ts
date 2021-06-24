/*
 * @Author: 刘玉田
 * @Date: 2021-06-24 16:33:36
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-24 16:35:57
 * redux 管理，有趣的是，文件夹名字必须命名为 store
 */

import { configureStore } from "@reduxjs/toolkit";
import { currentMusicSlice } from "./music.slice";
import { playListSlice } from "./playList.slice";

export const rootReducer = {
  currentMusicID: currentMusicSlice.reducer,
  playList: playListSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch = () => useDispatch<AppDispatch>()
