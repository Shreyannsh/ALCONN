import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Mockman from "mockman-js";

import { MdCancel } from "react-icons/md";
import { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Explore from "./Pages/Explore/Explore";
import SideBar from "./Compnents/SideBar/SideBar";
import AddPost from "./Compnents/AddPost/AddPost";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import LikedPost from "./Pages/LikedPost/LikedPost";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { authContext } from "./Context/authContext/authContext";
import MobileNavBar from "./Compnents/MobileNavBar/MobileNavBar";
import SignUpPage from "./Pages/LandingPage/SignUpPage/SignUpPage";
import ProfileOption from "./Compnents/ProfileOption/ProfileOption";
import SuggestionList from "./Compnents/SuggestionList/SuggestionList";

function App() {
  const { isLogin, isMobile, setIsMobile } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const token = localStorage.getItem("encodedToken");

  const cancel = () => {
    setIsMobile(false);
    setSearchUser("");
  };

  const mobileAddPostBtn = () => {
    setShow(true);
    setMode("sideBar");
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Mockman /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      {token && (
        <div style={{ position: "relative" }}>
          <div className="mainPage">
            <div className="brandBar">
              <div className="brandTitle">
                <img className="logo" src="../../assets/blue.png" alt="" />
                <p className="brand-name">ALCONN</p>
              </div>
              <div className="searchBoxDiv">
                <input
                  className="searchBox"
                  value={searchUser}
                  placeholder="Search"
                  onClick={() => setIsMobile(true)}
                  onChange={(e) => setSearchUser(e.target.value)}
                  type="text"
                />
                <span>
                  <MdCancel className="cancelButton" onClick={() => cancel()} />
                </span>
                <div
                  className="mobileSuggestion"
                  style={{ display: isMobile ? "block" : "none" }}
                >
                  <SuggestionList mobile={isMobile} searchText={searchUser} />
                </div>
              </div>
            </div>
            <div className="rightBar">
              <SideBar />
            </div>
            <div className="centerPage">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/likedpost" element={<LikedPost />} />
                <Route path="/profile/:userName" element={<Profile />} />
              </Routes>
            </div>
            <div className="suggestionPage">
              <SuggestionList />
            </div>
            <div className="profileOptionPage">
              <ProfileOption />
            </div>
            <div>
              <AiOutlinePlus
                className="mobileAddPostBtn"
                onClick={() => mobileAddPostBtn()}
              />
            </div>{" "}
            <AddPost onClose={() => setShow(!show)} show={show} mode={mode} />
            <div className="mobibar">
              <MobileNavBar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
