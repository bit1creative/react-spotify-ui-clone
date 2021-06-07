import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlaylist } from "services/spotifyApi";

export const fetchPlaylist = createAsyncThunk(
  "user/fetchPlaylist",
  async (id) => {
    const data = await getPlaylist(id);
    return data;
  }
);

export const tempPlaylistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
  },
  extraReducers: {
    [fetchPlaylist.fulfilled]: (state, action) => {
      return {
        ...state,
        playlist: action.payload,
      };
    },
  },
});

export default tempPlaylistSlice.reducer;
