import "./playlistview.scss";
import PlaylistHeader from "./components/PlaylistHeader";
import SongsView from "./components/SongsView";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPlaylist } from "store/slices/tempPlaylistSlice";

const PlaylistView = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const isLikedSongs = id === "liked";
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);

  useEffect(() => {
    if (isLikedSongs) return;
    dispatch(fetchPlaylist(id));
  }, [id]);

  return (
    <div className="playlist">
      <PlaylistHeader
        user={user}
        playlist={playlist}
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
