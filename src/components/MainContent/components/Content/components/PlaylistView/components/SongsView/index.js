import "./songsview.scss";
import { fetchUsersSavedTracks } from "store/slices/userInfoSlice";
import { removeSongFromSaved, addSongToSaved } from "services/spotifyApi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { BsClock } from "react-icons/bs";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";
import { MdExplicit } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const Song = ({ song, index, isSaved, isSearch = false }) => {
  const [songIsSaved, setSongIsSaved] = useState(isSaved);
  const dispatch = useDispatch();
  function calcDate(date) {
    return moment(moment()).isSame(date, "day")
      ? moment().diff(date, "hours") === 0
        ? "Recently"
        : moment().diff(date, "hours") === 1
        ? moment().hours() - date.hours() + " hour ago"
        : moment().hours() - date.hours() + " hours ago"
      : moment().diff(date, "days") < 2
      ? "Yesterday"
      : moment().diff(date, "days") < 7
      ? moment().diff(date, "days") + " days ago"
      : moment(date).format("MMM D, YYYY");
  }

  async function handleHeartClick(e) {
    const id = e.currentTarget.getAttribute("song-id");
    if (songIsSaved) {
      e.currentTarget.parentNode.classList.add("shake");
      setTimeout(() => setSongIsSaved(!songIsSaved), 820);
      await removeSongFromSaved(id);
    } else {
      e.currentTarget.parentNode.classList.add("toggle");
      setTimeout(() => setSongIsSaved(!songIsSaved), 200);
      await addSongToSaved(id);
    }
    return setTimeout(() => dispatch(fetchUsersSavedTracks()), 200);
  }

  return (
    <button>
      <div className="song">
        <div className="sm-flex number">
          <span>{index + 1}</span>
        </div>
        <BiPlay className="play-icon sm-flex" />
        <div className="song-name-wrapper">
          {isSaved || isSearch ? (
            <img
              src={
                song?.track?.album?.images[0]?.url || song.album.images[0].url
              }
              alt=""
            />
          ) : null}

          <div className="song-name">
            <span>{song?.track?.name || song?.name}</span>
            <span>
              {song?.track?.explicit || song.explicit ? (
                <MdExplicit className="explicit-icon" />
              ) : null}
              {song?.track
                ? song.track.artists
                    .reduce(
                      (artists, artist) => artists + artist.name + ", ",
                      ""
                    )
                    .slice(0, -2)
                : song.artists
                    .reduce(
                      (artists, artist) => artists + artist.name + ", ",
                      ""
                    )
                    .slice(0, -2)}
            </span>
          </div>
        </div>
        <span className="flex-align-center album sm-flex">
          {song?.track?.album?.name || null}
        </span>
        {isSearch ? null : (
          <span className="flex-align-center time-added sm-flex">
            {calcDate(moment(song.added_at))}
          </span>
        )}
        <div
          className={`${
            isSearch ? "flex-align-end" : "flex-align-center"
          } duration`}
        >
          {songIsSaved ? (
            <span className="heart-icon add-to-liked-icon">
              <FaHeart
                song-id={song?.track?.id || song.id}
                onClick={(e) => handleHeartClick(e)}
              />
            </span>
          ) : (
            <span className="heart-icon remove-from-liked-icon">
              <FaRegHeart
                song-id={song?.track?.id || song.id}
                onClick={(e) => handleHeartClick(e)}
              />
            </span>
          )}
          <span>
            {moment(song?.track?.duration_ms || song.duration_ms).format(
              "m:ss"
            )}
          </span>
        </div>
      </div>
    </button>
  );
};

const SongsView = ({ songs, isLikedSongs }) => {
  const songsAreSaved = useSelector((state) => state.playlist.songsAreSaved);
  const songsList = songs
    ?.filter((song) => song.track?.id || song?.id)
    ?.map((song, index) => (
      <Song
        key={song?.track?.id || song.id}
        song={song}
        index={index}
        isSaved={isLikedSongs || songsAreSaved[index]}
      />
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
