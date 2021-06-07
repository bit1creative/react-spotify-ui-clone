import "./playlistheader.scss";
import { FaHeart } from "react-icons/fa";

const PlaylistHeader = ({ user, playlist }) => {
  const isLikedSongs = playlist === "likedSongs";
  return (
    <div className="playlist-header">
      <div className="playlist-logo-wrapper">
        <div className="playlist-logo">
          {isLikedSongs ? (
            <span className="heart">
              <FaHeart />
            </span>
          ) : null}
        </div>
        <div className="playlist">
          <span className="playlist-span">PLAYLIST</span>
          <span className="playlist-name">
            {isLikedSongs ? "Liked Songs" : null}
          </span>
          <div className="playlist-user-info">
            <img src={user.imageLink} alt="user" />
            <span>{user.username}</span>
            <span>• {user.likedSongs.length} songs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
