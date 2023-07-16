import "./MobileNavBar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";

import {
  MdOutlineExplore,
  MdExplore,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
} from "react-icons/md";

import { authContext } from "../../Context/authContext/authContext";

export default function MobileNavBar() {
  const { isActive, authState } = useContext(authContext);

  const loggedInUser = authState.usersList.find(
    (user) => user._id === authState.singleUserDetail._id
  );

  return (
    <div className="mobileNavBar">
      <Link to="/home" className="home-btn">
        {isActive === "home" ? (
          <div className="page">
            <span>
              <AiFillHome className="mobilebaricon" />{" "}
            </span>{" "}
          </div>
        ) : (
          <div className="page">
            <span>
              <AiOutlineHome className="mobilebaricon" />{" "}
            </span>{" "}
          </div>
        )}
      </Link>
      <Link to="/explore" className="explore-btn">
        {isActive === "explore" ? (
          <div className="page">
            <span>
              <MdExplore className="mobilebaricon" />
            </span>{" "}
          </div>
        ) : (
          <div className="page">
            <span>
              <MdOutlineExplore className="mobilebaricon" />
            </span>{" "}
          </div>
        )}
      </Link>
      <Link to="/bookmarks" className="bookmarks-btn">
        {isActive === "bookmark" ? (
          <div className="page">
            <span>
              <MdOutlineBookmark className="mobilebaricon" />
            </span>{" "}
          </div>
        ) : (
          <div className="page">
            <span>
              <MdOutlineBookmarkBorder className="mobilebaricon" />
            </span>{" "}
          </div>
        )}
      </Link>

      <Link to="/likedpost" className="likedPost-btn">
        {isActive === "liked" ? (
          <div className="page">
            <span>
              <AiFillLike className="mobilebaricon" />
            </span>
            <span> </span>
          </div>
        ) : (
          <div className="page">
            <span>
              <AiOutlineLike className="mobilebaricon" />
            </span>
          </div>
        )}
      </Link>
      <Link to={`/profile/${authState.singleUserDetail.username}`}>
        <img src={loggedInUser?.profilePic} alt="" className="navBarPic" />
      </Link>
    </div>
  );
}
