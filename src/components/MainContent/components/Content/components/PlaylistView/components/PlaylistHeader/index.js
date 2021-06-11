import "./playlistheader.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FaHeart } from "react-icons/fa";

const PlaylistHeader = ({ user, playlist, isLikedSongs, picURL }) => {
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
              {playlist || (isLikedSongs && user?.likedSongs) ? (
                <>
                  {picURL ? (
                    <img
                      src={isLikedSongs ? user.imageLink : picURL}
                      alt="user"
                      className="playlist-owner-info-sm"
                    />
                  ) : null}

                  <span className="playlist-user-info-sm">
                    {isLikedSongs
                      ? user.username
                      : playlist?.owner?.display_name}
                  </span>
                </>
              ) : (
                <div className="playlist-user-info-sm">
                  <Skeleton circle={true} width={"2em"} height={"2em"} />
                  <Skeleton width={"10em"} height={"1.5em"} />
                </div>
              )}

              {playlist || (isLikedSongs && user?.likedSongs) ? (
                <span>
                  •{" "}
                  {isLikedSongs
                    ? user.likedSongs.length
                    : playlist.tracks.total}{" "}
                  songs
                </span>
              ) : (
                <Skeleton
                  width={100}
                  className="playlist-user-info-sm skeleton-songs-count"
                />
              )}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default PlaylistHeader;
