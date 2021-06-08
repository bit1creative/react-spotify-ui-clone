import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getUsersSavedTracks,
  getUsersPlaylists,
} from "services/spotifyApi";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const data = await getUserInfo();
    return data;
  }
);

export const fetchUsersSavedTracks = createAsyncThunk(
  "user/fetchUsersSavedTracks",
  async () => {
    const data = await getUsersSavedTracks();
    return data;
  }
);

export const fetchUsersPlaylists = createAsyncThunk(
  "user/fetchUsersPlaylists",
  async () => {
    const data = await getUsersPlaylists();
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
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        username: action.payload.display_name,
        link: action.payload.external_urls.spotify,
        imageLink: action.payload.images[0].url,
      };
    },
    [fetchUsersSavedTracks.fulfilled]: (state, action) => {
      return {
        ...state,
        likedSongs: action.payload,
      };
    },
    [fetchUsersPlaylists.fulfilled]: (state, action) => {
      return {
        ...state,
        playlists: action.payload,
      };
    },
  },
});

export default userInfoSlice.reducer;
