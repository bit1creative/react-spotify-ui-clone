import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlaylist,
  checkIfSongsSaved,
  getUsersProfilePic,
  getAlbum,
} from "services/spotifyApi";

export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async ({ id, isPlaylist }) => {
    try {
      const playlist = isPlaylist ? await getPlaylist(id) : await getAlbum(id);
      const songsAreSaved = await checkForSavedTracksInPlaylist(
        playlist.tracks.items,
        isPlaylist
      );
      const ownerImageLink = isPlaylist
        ? await getUsersProfilePic(playlist.owner.id)
        : null;
      return {
        playlist,
        songsAreSaved,
        ownerImageLink: ownerImageLink?.images[0]?.url,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const checkForSavedTracksInPlaylist = async (songs, isPlaylist) => {
  let savedBoolArray = [];
  if (isPlaylist) {
    for (let i = 0; i < Math.ceil(songs.length / 50); i++) {
      savedBoolArray = [
        ...savedBoolArray,
        ...(await checkIfSongsSaved(
          songs.slice(i * 50, i * 50 + 50).map((song) => song?.track?.id)
        )),
      ];
    }
  } else {
    for (let i = 0; i < Math.ceil(songs.length / 50); i++) {
      savedBoolArray = [
        ...savedBoolArray,
        ...(await checkIfSongsSaved(
          songs.slice(i * 50, i * 50 + 50).map((song) => song.id)
        )),
      ];
    }
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
  reducers: {
    resetPlaylistState: (state, action) => {
      return {
        ...state,
        playlist: null,
        ownerImageLink: null,
        songsAreSaved: null,
      };
    },
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

export const { resetPlaylistState } = tempPlaylistSlice.actions;

export default tempPlaylistSlice.reducer;
