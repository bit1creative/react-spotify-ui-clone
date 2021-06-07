import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginUrl, getTokenFromUrl } from "services/spotify";
import { initializeSpotifyClient } from "services/spotifyApi";
// import { userAPI } from "./services/spotifyApi";

import LoginPage from "pages/LoginPage";
import MainPage from "pages/MainPage";

import { setToken } from "store/slices/tokenSlice";
import {
  fetchUserInfo,
  fetchUsersSavedTracks,
} from "store/slices/userInfoSlice";
import { fetchPlaylist } from "store/slices/tempPlaylistSlice";

function App() {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    // const userInfo = async (token) => {
    //   const data = await getUserInfo(token);
    //   await dispatch(setUserInfo(data));
    // };

    if (_token) {
      dispatch(setToken(_token));
      initializeSpotifyClient(_token);
      dispatch(fetchUserInfo());
      dispatch(fetchUsersSavedTracks());
      dispatch(fetchPlaylist("4raIDgvPbAwipwRrd8ekxo"));
      // userInfo(_token);
    }
  }, []);
  return token ? (
    <MainPage></MainPage>
  ) : (
    <LoginPage loginUrl={loginUrl}></LoginPage>
  );
}

export default App;
