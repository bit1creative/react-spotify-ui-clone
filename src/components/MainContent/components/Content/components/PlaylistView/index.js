import "./playlistview.scss";
import PlaylistHeader from "./components/PlaylistHeader";
import SongsView from "./components/SongsView";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import {
  fetchPlaylist,
  resetPlaylistState,
} from "store/slices/tempPlaylistSlice";

const PlaylistView = () => {
  const isPlaylist = useLocation().pathname.split("/")[1] === "playlist";
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const isLikedSongs = id === "liked";
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist?.playlist);
  const playlistOwnerPicURL = useSelector(
    (state) => state.playlist?.ownerImageLink
  );

  useEffect(() => {
    if (isLikedSongs) return;
    if (user) {
      (async () => {
        await dispatch(resetPlaylistState());
        dispatch(fetchPlaylist({ id, isPlaylist }));
      })();
    }
  }, [id]);

  return (
    <div className="playlist">
      <PlaylistHeader
        user={user}
        playlist={playlist}
        picURL={playlistOwnerPicURL}
        isLikedSongs={isLikedSongs}
      ></PlaylistHeader>
      <SongsView
        songs={isLikedSongs ? user.likedSongs : playlist?.tracks.items}
        isLikedSongs={isLikedSongs}
      ></SongsView>{" "}
    </div>
  );
};

export default PlaylistView;
