import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import userInfoSlice from "./slices/userInfoSlice";
import tempPlaylistSlice from "./slices/tempPlaylistSlice";

export default configureStore({
  reducer: {
    token: tokenSlice,
    user: userInfoSlice,
    playlist: tempPlaylistSlice,
  },
});
