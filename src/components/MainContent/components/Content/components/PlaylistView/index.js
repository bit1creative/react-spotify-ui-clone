import "./playlistview.scss";
import PlaylistHeader from "./components/PlaylistHeader";
import SongsView from "./components/SongsView";

import { useSelector } from "react-redux";

const PlaylistView = ({ playlist }) => {
  const user = useSelector((state) => state.user);
  const isLikedSongs = playlist === "likedSongs";
  return (
    <div className="playlist">
      <PlaylistHeader user={user} playlist={playlist}></PlaylistHeader>
      <SongsView songs={isLikedSongs ? user.likedSongs : null}></SongsView>
    </div>
  );
};

export default PlaylistView;
