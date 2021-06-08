import "./songsview.scss";
import moment from "moment";
import { checkIfSongSaved } from "services/spotifyApi";
import { BsClock } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";
import { MdExplicit } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Song = ({ song, index }) => {
  function calcDate(date) {
    return moment(moment()).isSame(date, "day")
      ? moment().hours() - date.hours() === 0
        ? "Recently"
        : moment().hours() - date.hours() === 1
        ? moment().hours() - date.hours() + " hour ago"
        : moment().hours() - date.hours() + " hours ago"
      : moment().diff(date, "days") < 2
      ? "Yesterday"
      : moment().diff(date, "days") < 7
      ? moment().diff(date, "days") + " days ago"
      : moment(date).format("MMM D, YYYY");
  }

  return (
    <button>
      <div className="song">
        <div className="sm-flex number">
          <span>{index + 1}</span>
        </div>
        <div className="play-icon sm-flex">
          <BiPlay />
        </div>
        <div className="song-name-wrapper">
          <img src={song.track.album.images[2].url} alt="" />
          <div className="song-name">
            <span>{song.track.name}</span>
            <span>
              {song.track.explicit ? (
                <MdExplicit className="explicit-icon" />
              ) : null}
              {song.track.artists
                .reduce((artists, artist) => artists + artist.name + ", ", "")
                .slice(0, -2)}
            </span>
          </div>
        </div>
        <span className="flex-align-center sm-flex">
          {song.track.album.name}
        </span>
        <span className="flex-align-center time-added sm-flex">
          {calcDate(moment(song.added_at))}
        </span>
        <div className="flex-align-center duration">
          {/* {checkIfSongSaved([song.track.id]) ? ( */}
          {0 ? (
            <span className="add-to-liked-icon">
              <FaHeart />
            </span>
          ) : (
            <span className="remove-from-liked-icon">
              <FaRegHeart />
            </span>
          )}
          <span>{moment(song.track.duration_ms).format("m:ss")}</span>
        </div>
      </div>
    </button>
  );
};

const SongsView = ({ songs }) => {
  const songsList = songs?.map((song, index) => (
    <Song key={song.track.id} song={song} index={index} />
  ));
  return (
    <div className="songs">
      <div className="grid-header">
        <span className="title sm-block">#</span>
        <span className="title">TITLE</span>
        <span className="title sm-block">ALBUM</span>
        <span className="title sm-block">DATE ADDED</span>
        <span className="title">
          <BsClock />
        </span>
      </div>
      {songs ? (
        songsList
      ) : (
        <SkeletonTheme
          color="rgba(255, 255, 255, 0.1)"
          highlightColor="rgba(255, 255, 255, 0.5)"
        >
          <Skeleton count={8} className="skeleton-song" />
        </SkeletonTheme>
      )}
    </div>
  );
};

export default SongsView;
