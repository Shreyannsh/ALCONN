import "./SideBar.css";
import { Link } from "react-router-dom";

import { FaHome, FaInternetExplorer } from "react-icons/fa";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineLike,
} from "react-icons/ai";
import {
  MdOutlineExplore,
  MdExplore,
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
} from "react-icons/md";

import AddPost from "../../Compnents/AddPost/AddPost";
import { useState } from "react";

export default function SideBar() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");

  const postBtn = () => {
    setShow(!show);
    setMode("sideBar");
  };

  return (
    <div className="left-side-bar">
      <p className="platform-name">ALCONN</p>

      <div className="pages">
        <Link to="/home" className="home-btn">
          <span>
            <AiOutlineHome className="icons" />{" "}
          </span>{" "}
          <span>Home</span>
        </Link>
        <Link to="/explore" className="explore-btn">
          <span>
            <AiOutlineCompass className="icons" />
          </span>{" "}
          <span>Explore</span>
        </Link>
        <Link to="/bookmarks" className="bookmarks-btn">
          <span>
            <MdOutlineBookmarkBorder className="icons" />
          </span>{" "}
          <span>Bookmarks </span>
        </Link>
        <Link to="/likedpost" className="likedPost-btn">
          <span>
            <AiOutlineLike className="icons" />
          </span>
          <span> Liked Post </span>
        </Link>
      </div>

      <button onClick={() => postBtn()} className="post-btn">
        Post
      </button>
      <AddPost onClose={() => setShow(!show)} show={show} mode={mode} />
    </div>
  );
}
