import "./App.css";

import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

import SideBar from "./Compnents/SideBar/SideBar";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import LikedPost from "./Pages/LikedPost/LikedPost";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { useContext, useState } from "react";
import { authContext } from "./Context/authContext/authContext";
import SuggestionList from "./Compnents/SuggestionList/SuggestionList";
import ProfileOption from "./Compnents/ProfileOption/ProfileOption";

function App() {
  const { isLogin } = useContext(authContext);

  return (
    <div className="App">
      {isLogin ? (
        <div className="mainPage">
          {" "}
          <div>
            {" "}
            <SideBar />
          </div>{" "}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/likedpost" element={<LikedPost />} />{" "}
          </Routes>{" "}
          <div>
            {" "}
            <SuggestionList />{" "}
          </div>
          <div>
            <ProfileOption />
          </div>
        </div>
      ) : (
        <LandingPage />
      )}

      {/* <Mockman /> */}
    </div>
  );
}

export default App;
