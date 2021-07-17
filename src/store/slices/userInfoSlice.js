import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getUsersSavedTracks,
  getUsersPlaylists,
  // getUsersAlbums,
} from "services/spotifyApi";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",

  async () => {
    try {
      const userData = await getUserInfo();
      const userSavedTracks = await getUsersSavedTracks();
      const userPlayLists = await getUsersPlaylists();
      // const userAlbums = await getUsersAlbums();
      return {
        ...userData,
        likedSongs: userSavedTracks,
        playlists: userPlayLists,
        // albums: userAlbums,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUsersSavedTracks = createAsyncThunk(
  "user/fetchUsersSavedTracks",
  async () => {
    const data = await getUsersSavedTracks();
    return data;
  }
);

export const userInfoSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    link: null,
    imageLink: null,
    likedSongs: null,
    playlists: null,
    // albums: null,
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        username: action?.payload.display_name,
        link: action?.payload.external_urls.spotify,
        imageLink: action?.payload.images[0]?.url,
        likedSongs: action?.payload.likedSongs,
        playlists: action?.payload.playlists,
        // albums: action.payload.albums,
      };
    },
    [fetchUsersSavedTracks.fulfilled]: (state, action) => {
      return {
        ...state,
        likedSongs: action.payload,
      };
    },
  },
});

export default userInfoSlice.reducer;
