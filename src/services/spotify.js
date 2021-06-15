const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://not-spotify-60242.web.app";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-private",
  "user-read-email",
  "user-follow-read",
  "user-follow-modify",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "ugc-image-upload",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () =>
  window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
