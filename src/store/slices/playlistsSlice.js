import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFeaturedPlaylists,
  getNewReleases,
  getDiscoverWeekly,
  getRecommendations,
} from "services/spotifyApi";

export const fetchHomePagePlaylists = createAsyncThunk(
  "playlists/fetchHomePagePlaylists",
  async () => {
    const featuredPlaylists = await getFeaturedPlaylists();
    const newReleases = await getNewReleases();
    const discoverWeekly = await getDiscoverWeekly();
    const recommended = await getRecommendations(
      discoverWeekly.tracks.items.map((song) => song?.track?.id).slice(0, 5)
    );
    return {
      featuredPlaylists,
      newReleases,
      discoverWeekly,
      recommended,
    };
  }
);

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    featuredPlaylists: null,
    newReleases: null,
    discoverWeekly: null,
    recommended: null,
  },
  extraReducers: {
    [fetchHomePagePlaylists.fulfilled]: (state, action) => {
      return {
        ...state,
        featuredPlaylists: action.payload.featuredPlaylists,
        newReleases: action.payload.newReleases,
        discoverWeekly: action.payload.discoverWeekly,
        recommended: action.payload.recommended,
      };
    },
  },
});

export default playlistsSlice.reducer;
