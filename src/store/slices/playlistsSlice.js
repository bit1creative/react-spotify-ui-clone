import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFeaturedPlaylists,
  getNewReleases,
  // getDiscoverWeekly,
  // getRecommendations,
  getCategoryPlaylists,
} from "services/spotifyApi";

export const fetchHomePagePlaylists = createAsyncThunk(
  "playlists/fetchHomePagePlaylists",
  async () => {
    const featuredPlaylists = await getFeaturedPlaylists();
    const newReleases = await getNewReleases();
    // const discoverWeekly = await getDiscoverWeekly();
    // const recommended = await getRecommendations(
    //   discoverWeekly.tracks.items.map((song) => song?.track?.id).slice(0, 5)
    // );
    const moodPlaylists = await getCategoryPlaylists("mood");
    const workoutPlaylists = await getCategoryPlaylists("workout");
    const chillPlaylists = await getCategoryPlaylists("chill");
    const toplistsPlaylists = await getCategoryPlaylists("toplists");
    const hiphopPlaylists = await getCategoryPlaylists("hiphop");
    const popPlaylists = await getCategoryPlaylists("pop");
    return {
      featuredPlaylists,
      newReleases,
      // discoverWeekly,
      // recommended,
      moodPlaylists,
      workoutPlaylists,
      chillPlaylists,
      toplistsPlaylists,
      hiphopPlaylists,
      popPlaylists,
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
    moodPlaylists: null,
    workoutPlaylists: null,
    chillPlaylists: null,
    toplistsPlaylists: null,
    hiphopPlaylists: null,
    popPlaylists: null,
  },
  extraReducers: {
    [fetchHomePagePlaylists.fulfilled]: (state, action) => {
      return {
        ...state,
        featuredPlaylists: action.payload.featuredPlaylists,
        newReleases: action.payload.newReleases,
        // discoverWeekly: action.payload.discoverWeekly,
        // recommended: action.payload.recommended,
        moodPlaylists: action.payload.moodPlaylists,
        workoutPlaylists: action.payload.workoutPlaylists,
        chillPlaylists: action.payload.chillPlaylists,
        toplistsPlaylists: action.payload.toplistsPlaylists,
        hiphopPlaylists: action.payload.hiphopPlaylists,
        popPlaylists: action.payload.popPlaylists,
      };
    },
  },
});

export default playlistsSlice.reducer;
