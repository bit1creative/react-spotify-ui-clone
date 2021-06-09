import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlaylist,
  checkIfSongsSaved,
  getUsersProfilePic,
} from "services/spotifyApi";

export const fetchPlaylist = createAsyncThunk(
  "user/fetchPlaylist",
  async (id) => {
    const playlist = await getPlaylist(id);
    const songsAreSaved = await checkForSavedTracksInPlaylist(
      playlist.tracks.items
    );
    const ownerImageLink = await getUsersProfilePic(playlist.owner.id);
    return {
      playlist,
      songsAreSaved,
      ownerImageLink: ownerImageLink.images[0].url,
    };
  }
);

const checkForSavedTracksInPlaylist = async (songs) => {
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
};

export const tempPlaylistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
    ownerImageLink: null,
    songsAreSaved: null,
  },
  extraReducers: {
    [fetchPlaylist.fulfilled]: (state, action) => {
      return {
        ...state,
        playlist: action.payload.playlist,
        songsAreSaved: action.payload.songsAreSaved,
        ownerImageLink: action.payload.ownerImageLink,
      };
    },
  },
});

export default tempPlaylistSlice.reducer;
