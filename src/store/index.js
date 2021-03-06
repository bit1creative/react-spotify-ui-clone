import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import userInfoSlice from "./slices/userInfoSlice";
import tempPlaylistSlice from "./slices/tempPlaylistSlice";
import playlistsSlice from "./slices/playlistsSlice";
import searchResultSlice from "./slices/searchResultSlice";
import playerSlice from "./slices/playerSlice";

export default configureStore({
  reducer: {
    token: tokenSlice,
    user: userInfoSlice,
    playlist: tempPlaylistSlice,
    playlists: playlistsSlice,
    search: searchResultSlice,
    player: playerSlice,
  },
});
