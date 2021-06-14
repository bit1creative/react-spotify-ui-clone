import "./searchview.scss";
import "../PlaylistView/components/SongsView/songsview.scss";
import "../HomeView/components/SectionView/sectionview.scss";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSearchResults,
  resetSearchResultState,
} from "store/slices/searchResultSlice";
import { Song } from "../PlaylistView/components/SongsView";
import { SectionView } from "../HomeView/components/SectionView";
import unknownUser from "assets/no-user.jpg";

const Redirect = ({ style, link, setStyle, setLink }) => {
  return (
    <div
      className={`redirect${style}`}
      onClick={(e) => {
        if (e.target?.id === "link") return;
        setStyle("");
        setLink("");
      }}
    >
      <div className="info">
        <span>This feature is not yet implemented</span>
        <span>
          But you can be redirected to artist's{" "}
          <a href={link} target="_blank" rel="noopener noreferrer" id="link">
            Spotify page
          </a>{" "}
          . <br />
          <div>click anywhere to close this message</div>
        </span>
      </div>
    </div>
  );
};

const Artist = ({ artist, setStyle, setLink }) => {
  return (
    <button
      className="artist"
      onClick={() => {
        setStyle("-active");
        setLink(artist.external_urls.spotify);
      }}
    >
      <img src={artist?.images[0]?.url || unknownUser} alt="artist" />
      <div className="artist-info">
        <span className="name">{artist.name}</span>
        <span>Artist</span>
      </div>
    </button>
  );
};

const SearchView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetSearchResultState());
    };
  }, []);
  const searchResult = useSelector((state) => state.search.result);
  const songsAreSaved = useSelector((state) => state.search.songsAreSaved);
  const [redirectStyle, setRedirectStyle] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  return (
    <div className="search-view">
      <div className="search-tab">
        <BsSearch className="search-icon" />
        <input
          type="text"
          className="input"
          placeholder="Artists, albums, playlists or tracks"
          onChange={(e) =>
            e.target.value.length > 0
              ? dispatch(fetchSearchResults(e.target.value))
              : null
          }
        />
      </div>
      {searchResult ? (
        <>
          {songsAreSaved ? (
            <div className="songs">
              <div className="songs-span">
                <span>Songs</span>
              </div>
              {searchResult.tracks.items.map((song, index) => (
                <Song
                  key={song.id}
                  song={song}
                  index={index}
                  isSaved={songsAreSaved[index]}
                  isSearch={true}
                />
              ))}
            </div>
          ) : null}
          <div className="playlists">
            <SectionView
              name={"Playlists"}
              selector={"playlists"}
              isSearch={true}
            />
          </div>
          <div className="albums">
            <SectionView name={"Albums"} selector={"albums"} isSearch={true} />
          </div>
          <div className="artists">
            <div className="songs-span">
              <span>Artists</span>
            </div>
            <div className="horizontal-scroll">
              {searchResult.artists.items.map((artist) => (
                <Artist
                  key={artist.id}
                  artist={artist}
                  setLink={(link) => setRedirectLink(link)}
                  setStyle={(style) => setRedirectStyle(style)}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
      <Redirect
        link={redirectLink}
        style={redirectStyle}
        setLink={(link) => setRedirectLink(link)}
        setStyle={(style) => setRedirectStyle(style)}
      />
    </div>
  );
};

export default SearchView;
