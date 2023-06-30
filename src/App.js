import "./App.css";

import { Routes, Route } from "react-router-dom";

import SideBar from "./Compnents/SideBar/SideBar";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import LikedPost from "./Pages/LikedPost/LikedPost";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { useContext } from "react";
import { authContext } from "./Context/authContext/authContext";
import SuggestionList from "./Compnents/SuggestionList/SuggestionList";
import ProfileOption from "./Compnents/ProfileOption/ProfileOption";
import Profile from "./Pages/Profile/Profile";
import SignUpPage from "./Pages/LandingPage/SignUpPage/SignUpPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLogin } = useContext(authContext);

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

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
            <Route path="/likedpost" element={<LikedPost />} />
            <Route path="/profile/:userId" element={<Profile />} />
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
