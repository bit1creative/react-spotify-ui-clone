import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlaylist, checkIfSongsSaved } from "services/spotifyApi";

export const fetchPlaylist = createAsyncThunk(
  "user/fetchPlaylist",
  async (id) => {
    const data = await getPlaylist(id);
    return data;
  }
);

export const checkForSavedTracksInPlaylist = createAsyncThunk(
  "user/checkForSavedTracksInPlaylist",
  async (songs) => {
    let savedBoolArray = [];
    for (let i = 0; i < Math.ceil(songs.length / 50); i++) {
      savedBoolArray = [
        ...savedBoolArray,
        ...(await checkIfSongsSaved(
          songs.slice(i * 50, i * 50 + 50).map((song) => song.track.id)
        )),
      ];
    }
    return savedBoolArray;
  }
);

export const tempPlaylistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
    songsAreSaved: null,
  },
  extraReducers: {
    [fetchPlaylist.fulfilled]: (state, action) => {
      return {
        ...state,
        playlist: action.payload,
      };
    },
    [checkForSavedTracksInPlaylist.fulfilled]: (state, action) => {
      return {
        ...state,
        songsAreSaved: action.payload,
      };
    },
  },
});

export default tempPlaylistSlice.reducer;
