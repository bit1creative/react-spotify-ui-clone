// import IDS from "./playlistIds.json";
// import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyClient = new SpotifyWebApi();

export const initializeSpotifyClient = (token) => {
  spotifyClient.setAccessToken(token);
};

export const getUserInfo = async () => {
  return await spotifyClient.getMe();
};

export const getUsersSavedTracks = async (offset = 0, songs = []) => {
  return await spotifyClient
    .getMySavedTracks({ limit: 50, offset })
    .then((res) => {
      const mergedSongs = [...songs, ...res.items];
      if (res.next) {
        offset += 50;
        return getUsersSavedTracks(offset, mergedSongs);
      }
      return mergedSongs;
    });
};

export const getPlaylist = async (id, playlist = {}) => {
  return await spotifyClient.getPlaylist(id).then(async (res) => {
    const mergedPlaylist = { ...playlist, ...res };
    if (res.tracks.next) {
      const extraSongs = await getPlaylistTracks(id);
      mergedPlaylist.tracks.items = [
        ...mergedPlaylist.tracks.items,
        ...extraSongs,
      ];
    }
    return mergedPlaylist;
  });
};

const getPlaylistTracks = async (id, offset = 100, songs = []) => {
  return await spotifyClient
    .getPlaylistTracks(id, { limit: 100, offset })
    .then((res) => {
      const mergedSongs = [...songs, ...res.items];
      if (res.next) {
        offset += 100;
        return getPlaylistTracks(id, offset, mergedSongs);
      }
      return mergedSongs;
    });
};

export const checkIfSongsSaved = async (ids) => {
  return await spotifyClient.containsMySavedTracks(ids);
};

export const getUsersPlaylists = async (offset = 0, playlists = []) => {
  return await spotifyClient
    .getUserPlaylists({ limit: 50, offset })
    .then((res) => {
      const mergedPlaylists = [...playlists, ...res.items];
      if (res.next) {
        offset += 50;
        return getUsersPlaylists(offset, mergedPlaylists);
      }
      return mergedPlaylists;
    });
};

export const removeSongFromSaved = async (id) => {
  return await spotifyClient.removeFromMySavedTracks([id]);
};

export const addSongToSaved = async (id) => {
  return await spotifyClient.addToMySavedTracks([id]);
};

// export const userAPI = async (token) =>
//   await axios
//     .get("https://api.spotify.com/v1/me", {
//       headers: { Authorization: "Bearer " + token },
//     })
//     .then((response) => response.data);
