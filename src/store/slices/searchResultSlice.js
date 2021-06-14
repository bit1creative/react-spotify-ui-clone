import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Search } from "services/spotifyApi";
import { checkForSavedTracksInPlaylist } from "store/slices/tempPlaylistSlice";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (qry) => {
    const searchResult = await Search(qry);
    const songsAreSaved = await checkForSavedTracksInPlaylist(
      searchResult.tracks.items
    );
    return { searchResult, songsAreSaved };
  }
);

const searchResultSlice = createSlice({
  name: "search",
  initialState: {
    result: null,
    songsAreSaved: null,
  },
  reducers: {
    resetSearchResultState: (state, action) => {
      return {
        ...state,
        result: null,
        songsAreSaved: null,
      };
    },
  },
  extraReducers: {
    [fetchSearchResults.fulfilled]: (state, action) => {
      return {
        ...state,
        result: action.payload.searchResult,
        songsAreSaved: action.payload.songsAreSaved,
      };
    },
  },
});

export const { resetSearchResultState } = searchResultSlice.actions;

export default searchResultSlice.reducer;
