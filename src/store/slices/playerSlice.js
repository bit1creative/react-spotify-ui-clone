import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlaybackState, getRecentlyPlayed } from "services/spotifyApi";

export const fetchCurrentlyPlaying = createAsyncThunk(
  "player/fetchCurrentlyPlaying",
  async () => {
    const playbackState = await getPlaybackState();

    const recentlyPlayed = await getRecentlyPlayed();
    return { playbackState, recentlyPlayed };
  }
);

const PlayerSlice = createSlice({
  name: "player",
  initialState: {
    playbackState: null,
    recentlyPlayed: null,
  },
  extraReducers: {
    [fetchCurrentlyPlaying.fulfilled]: (state, action) => {
      return {
        ...state,
        playbackState: action.payload.playbackState,
        recentlyPlayed: action.payload.recentlyPlayed,
      };
    },
  },
});

export default PlayerSlice.reducer;
