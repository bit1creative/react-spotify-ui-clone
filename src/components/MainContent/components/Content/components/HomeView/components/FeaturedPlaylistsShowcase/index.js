import "./featuredplaylists.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HeaderPlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <button className="header-playlist-card">
        <img
          src={playlist.images[0].url}
          alt="playlist-logo"
          className="header-playlist-logo"
        />
        <div className="header-playlist-card-name">
          <span>{playlist.name}</span>
        </div>
      </button>
    </Link>
  );
};

const FeaturedPlaylists = () => {
  const featuredPlaylists = useSelector(
    (state) => state.playlists.featuredPlaylists?.playlists.items
  );
  return (
    <SkeletonTheme
      color="rgba(255, 255, 255, 0.1)"
      highlightColor="rgba(255, 255, 255, 0.5)"
    >
      <span className="title">Our Featured Playlists</span>
      {featuredPlaylists ? (
        <div className="featured-playlists">
          {featuredPlaylists.map((playlist) => (
            <HeaderPlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="featured-playlist-skeleton-wrapper">
          <Skeleton className="featured-playlist-skeleton" />
          <Skeleton className="featured-playlist-skeleton" />
          <Skeleton className="featured-playlist-skeleton" />
          <Skeleton className="featured-playlist-skeleton" />
          <Skeleton className="featured-playlist-skeleton" />
          <Skeleton className="featured-playlist-skeleton" />
        </div>
      )}
    </SkeletonTheme>
  );
};

export default FeaturedPlaylists;
