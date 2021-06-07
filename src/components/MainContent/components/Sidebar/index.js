import "./sidebar.scss";
import { Link } from "react-router-dom";
import { BsThreeDots, BsSearch } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { AiFillPlusSquare, AiOutlineHeart } from "react-icons/ai";
import logo from "assets/spotify-logo-white.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        {/* <BsThreeDots className="three-dots" />
         */}
        <img src={logo} alt="spotify-white-logo" className="white-logo" />
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
        <Link to="/liked">
          <button className="menu-btn">
            <ImBooks className="icon" />
            <span>Your Library</span>
          </button>
        </Link>
        <div className="gap"></div>
        <button className="secondary-btn">
          <AiFillPlusSquare className="icon" />
          <span>Create Playlist</span>
        </button>
        <Link to="/liked" className="secondary-btn">
          <button>
            <AiOutlineHeart className="icon" />
            <span>Liked Songs</span>
          </button>
        </Link>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default Sidebar;
