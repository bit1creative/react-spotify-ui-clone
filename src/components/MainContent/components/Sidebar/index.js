import "./sidebar.scss";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { AiFillPlusSquare, AiOutlineHeart } from "react-icons/ai";
import logo from "assets/spotify-logo-white.png";
import { useSelector } from "react-redux";

const PlaylistLink = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} className="secondary-btn">
      <button>
        <span className="playlist-link-span">{playlist.name}</span>
      </button>
    </Link>
  );
};

const Sidebar = () => {
  const playlistLinks = useSelector((state) => state.user.playlists)?.map(
    (playlist) => <PlaylistLink key={playlist.id} playlist={playlist} />
  );
  return (
    <div className="sidebar">
      <div className="menu">
        <Link to="/" className="secondary-btn">
          <img src={logo} alt="spotify-white-logo" className="white-logo" />
        </Link>
        <Link to="/">
          <button className="menu-btn">
            <FiHome className="icon" />
            <span>Home</span>
          </button>
        </Link>
        <Link to="/search">
          <button className="menu-btn">
            <BsSearch className="icon" />
            <span>Search</span>
          </button>
        </Link>
        <Link to="/library">
          <button className="menu-btn">
            <ImBooks className="icon" />
            <span>Your Library</span>
          </button>
        </Link>
        <div className="gap"></div>
        <Link to="/create-playlist" className="secondary-btn">
          <button className="secondary-btn">
            <AiFillPlusSquare className="icon" />
            <span>Create Playlist</span>
          </button>
        </Link>
        <Link to="/playlist/liked" className="secondary-btn">
          <button>
            <AiOutlineHeart className="icon" />
            <span>Liked Songs</span>
          </button>
        </Link>
        <div className="divider"></div>
        {playlistLinks}
      </div>
    </div>
  );
};

export default Sidebar;
