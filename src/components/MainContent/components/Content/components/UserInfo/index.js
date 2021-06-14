import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { setToken } from "store/slices/tokenSlice";
import userImage from "assets/no-user.jpg";

import "./userinfo.scss";

const UserInfo = () => {
  const user = useSelector((state) => state.user);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  function btnClicked(notFocused = false, e) {
    if (e && e?.relatedTarget?.tagName === "A")
      return setTimeout(() => setClicked(false), 100);
    if (notFocused) {
      setClicked(false);
      return;
    }
    setClicked(!clicked);
  }

  return user ? (
    <div className={`user-info`}>
      <button onBlur={(e) => btnClicked(true, e)} onClick={() => btnClicked()}>
        <img src={user.imageLink || userImage} alt="user profile" />
        <span>{user.username || "unauthorized"}</span>
        <IoMdArrowDropdown className={`icon ${clicked ? "hidden" : null}`} />
        <IoMdArrowDropup className={`icon ${clicked ? null : "hidden"}`} />
      </button>
      <div className={`user-menu ${clicked ? null : "hidden"}`}>
        <a
          href={user.link}
          target="_blank"
          rel="noreferrer"
          className="profile-link"
        >
          <span>Profile</span>
          <FiExternalLink />
        </a>
        <div className="divider"></div>
        <a
          href="/"
          onClick={() => {
            dispatch(setToken(null));
          }}
        >
          Log out
        </a>
      </div>
    </div>
  ) : null;
};

export default UserInfo;
