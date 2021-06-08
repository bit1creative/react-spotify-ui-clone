import "./playlistheader.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FaHeart } from "react-icons/fa";

const PlaylistHeader = ({ user, playlist, isLikedSongs }) => {
  return (
    <div className="playlist-header">
      <SkeletonTheme
        color="rgba(57, 41, 98, 1)"
        highlightColor="rgba(70, 70, 142, 1)"
      >
        <div className="playlist-logo-wrapper">
          {playlist || isLikedSongs ? (
            <div className="playlist-logo">
              {isLikedSongs ? (
                <span className="heart">
                  <FaHeart />
                </span>
              ) : (
                <img
                  src={playlist.images[0].url}
                  alt="playlist cover"
                  className="playlist-logo"
                />
              )}
            </div>
          ) : (
            <Skeleton height={220} width={220} className="sm" />
          )}
          <div className="playlist">
            <span className="playlist-span">PLAYLIST</span>
            <span className="playlist-name">
              {isLikedSongs ? (
                "Liked Songs"
              ) : playlist ? (
                playlist.name
              ) : (
                <Skeleton className="skeleton-playlist-name" />
              )}
            </span>
            <div className="playlist-user-info">
              <img
                src={user.imageLink}
                alt="user"
                className="playlist-user-info-sm"
              />
              <span className="playlist-user-info-sm">{user.username}</span>
              <span>
                {playlist || isLikedSongs ? (
                  <>
                    •{" "}
                    {isLikedSongs
                      ? user.likedSongs.length
                      : playlist.tracks.total}{" "}
                    songs
                  </>
                ) : (
                  <Skeleton width={100} />
                )}
              </span>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default PlaylistHeader;
