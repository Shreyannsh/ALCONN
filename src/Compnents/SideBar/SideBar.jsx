import "./SideBar.css";

import {
  AiOutlinePlus,
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
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import AddPost from "../../Compnents/AddPost/AddPost";
import ProfileOption from "../ProfileOption/ProfileOption";
import { authContext } from "../../Context/authContext/authContext";

export default function SideBar() {
  const { isActive } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const postBtn = () => {
    setShow(!show);
    setMode("sideBar");
  };

  return (
    <div>
      <div className="left-side-bar">
        <Link to="/home" className="titleLink">
          <p className="platform-name">ALCONN</p>
        </Link>

        <div className="pages">
          <Link to="/home" className="home-btn">
            {isActive === "home" ? (
              <div className="page">
                <span>
                  <AiFillHome className="icons" />{" "}
                </span>{" "}
                <span className="sidePageName">
                  <b>Home</b>
                </span>
              </div>
            ) : (
              <div className="page">
                <span>
                  <AiOutlineHome className="icons" />{" "}
                </span>{" "}
                <span className="sidePageName">Home</span>
              </div>
            )}
          </Link>
          <Link to="/explore" className="explore-btn">
            {isActive === "explore" ? (
              <div className="page">
                <span>
                  <MdExplore className="icons" />
                </span>{" "}
                <span className="sidePageName">
                  <b>Explore</b>
                </span>
              </div>
            ) : (
              <div className="page">
                <span>
                  <MdOutlineExplore className="icons" />
                </span>{" "}
                <span className="sidePageName">Explore</span>
              </div>
            )}
          </Link>
          <Link to="/bookmarks" className="bookmarks-btn">
            {isActive === "bookmark" ? (
              <div className="page">
                <span>
                  <MdOutlineBookmark className="icons" />
                </span>{" "}
                <span className="sidePageName">
                  <b>Bookmarks</b>{" "}
                </span>
              </div>
            ) : (
              <div className="page">
                <span>
                  <MdOutlineBookmarkBorder className="icons" />
                </span>{" "}
                <span className="sidePageName">Bookmarks </span>
              </div>
            )}
          </Link>

          <Link to="/likedpost" className="likedPost-btn">
            {isActive === "liked" ? (
              <div className="page">
                <span>
                  <AiFillLike className="icons" />
                </span>
                <span className="sidePageName">
                  {" "}
                  <b>Liked Post</b>{" "}
                </span>
              </div>
            ) : (
              <div className="page">
                <span>
                  <AiOutlineLike className="icons" />
                </span>
                <span className="sidePageName"> Liked Post </span>
              </div>
            )}
          </Link>
        </div>

        <button onClick={() => postBtn()} className="post-btn">
          <span className="postName"> Post</span>

          <span className="postSign">
            {/* it will be render when screen size will decrease for tab  */}
            <AiOutlinePlus />
          </span>
        </button>
        <div className="profileOptionSide">
          <ProfileOption />
        </div>
      </div>
      <AddPost onClose={() => setShow(!show)} show={show} mode={mode} />
    </div>
  );
}
