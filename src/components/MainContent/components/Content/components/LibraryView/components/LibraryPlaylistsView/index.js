import "./libraryplaylistsview.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LikedSongsCard = ({ songs }) => {
  return (
    <Link to="/playlist/liked">
      <button className="liked-songs-card">
        <div className="liked-songs-card-songs">
          {songs.slice(0, 10).map((song) => (
            <span key={song.name} className="artist">
              {" "}
              {song.artists[0].name} <span className="song">{song.name} •</span>
            </span>
          ))}
        </div>
        <div className="liked-songs-card-info">
          <span>Liked Songs</span>
          <span>{songs.length} songs</span>
        </div>
      </button>
    </Link>
  );
};

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <button className="playlist-card">
        <img
          src={playlist.images[0].url}
          alt="playlist-cover"
          className="playlist-card-image"
        />
        <div className="playlist-info">
          <span>{playlist.name}</span>
          <span className="description">
            {playlist.description === ""
              ? `By ${playlist.owner.display_name}`
              : playlist.description}
          </span>
        </div>
      </button>
    </Link>
  );
};

const LibraryPlaylistsView = () => {
  const likedSongs = useSelector((state) => state?.user?.likedSongs);
  const playlists = useSelector((state) => state?.user?.playlists);
  return (
    <div className="library-playlists">
      <span className="library-playlists-span">Your Playlists</span>
      <SkeletonTheme
        color="rgba(255, 255, 255, 0.1)"
        highlightColor="rgba(255, 255, 255, 0.5)"
      >
        {likedSongs && playlists ? (
          <div className="horizontal-scroll">
            <div className="library-playlists-section">
              <LikedSongsCard songs={likedSongs.map((song) => song.track)} />
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        ) : (
          <Skeleton width={"100%"} height={"13em"} />
        )}
      </SkeletonTheme>
    </div>
  );
};

export default LibraryPlaylistsView;
