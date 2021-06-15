import { DISCOVER_WEEKLY } from "./playlistIds.json";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyClient = new SpotifyWebApi();

const _token = { value: null };

export const initializeSpotifyClient = (token) => {
  _token.value = token;
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

export const getAlbum = async (id, album = {}) => {
  return await spotifyClient.getAlbum(id).then(async (res) => {
    const mergedAlbum = { ...album, ...res };
    if (res.tracks.next) {
      const extraSongs = await getAlbumTracks(id);
      mergedAlbum.tracks.items = {
        ...mergedAlbum.tracks.items,
        ...extraSongs,
      };
    }
    return mergedAlbum;
  });
};

const getAlbumTracks = async (id, offset = 50, songs = []) => {
  return await spotifyClient
    .getAlbumTracks(id, { limit: 50, offset })
    .then((res) => {
      const mergedSongs = [...songs, ...res.items];
      if (res.next) {
        offset += 50;
        return getAlbumTracks(id, offset, mergedSongs);
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

export const getUsersAlbums = async (offset = 0, albums = []) => {
  await axios
    .get("https://api.spotify.com/v1/me/albums", {
      headers: { Authorization: "Bearer " + _token, limit: 50, offset },
    })
    .then((res) => {
      const mergedAlbums = [...albums, ...res.items];
      if (res.next) {
        offset += 50;
        return getUsersAlbums(offset, mergedAlbums);
      }
      return mergedAlbums;
    });
};

export const removeSongFromSaved = async (id) => {
  return await spotifyClient.removeFromMySavedTracks([id]);
};

export const addSongToSaved = async (id) => {
  return await spotifyClient.addToMySavedTracks([id]);
};

export const getUsersProfilePic = async (id) => {
  return await spotifyClient.getUser(id);
};

export const getFeaturedPlaylists = async () => {
  return await spotifyClient.getFeaturedPlaylists({ limit: 6 });
};

export const getNewReleases = async () => {
  return await spotifyClient.getNewReleases({ limit: 10 });
};

export const getCategoryPlaylists = async (category) => {
  return await spotifyClient.getCategoryPlaylists(category, { limit: 10 });
};

export const getDiscoverWeekly = async () => {
  return await spotifyClient.getPlaylist(DISCOVER_WEEKLY);
};

export const getRecommendations = async (ids) => {
  return await spotifyClient.getRecommendations({ seed_tracks: ids, limit: 9 });
};

export const Search = async (qry) => {
  const searchAlbums = await spotifyClient.searchAlbums(qry, { limit: 10 });
  const searchTracks = await spotifyClient.searchTracks(qry, { limit: 10 });
  const searchPlaylists = await spotifyClient.searchPlaylists(qry, {
    limit: 10,
  });
  const searchArtists = await spotifyClient.searchArtists(qry, { limit: 10 });
  return {
    ...searchAlbums,
    ...searchArtists,
    ...searchPlaylists,
    ...searchTracks,
  };
};

export const getPlaybackState = async () => {
  return await spotifyClient.getMyCurrentPlaybackState();
};

export const getRecentlyPlayed = async () => {
  return await spotifyClient.getMyRecentlyPlayedTracks({ limit: 10 });
};
