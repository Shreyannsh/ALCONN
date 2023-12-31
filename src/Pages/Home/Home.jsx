import "./Home.css";

import { GiSettingsKnobs } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";

import AddPost from "../../Compnents/AddPost/AddPost";
import SortingPost from "../../Compnents/SortingPost/SortingPost";
import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Home() {
  const { authState, isLogin, isActive, setIsActive, userDetail } =
    useContext(authContext);
  const [showSortingOptions, setSortingOptions] = useState(false);

  const sortingOptionsBtn = () => {
    setSortingOptions(!showSortingOptions);
  };

  const token = localStorage.getItem("encodedToken");

  useEffect(() => {
    setIsActive("home");
  }, [isActive]);

  return (
    <div className="homePage">
      <p className="pageTitle">Home</p>
      {authState?.allPostList.length > 0 ? (
        <div>
          <div className="addPostHome">
            <AddPost show={true} />
          </div>
          <p className="heading-latestPost">
            Latest Posts{" "}
            <span onClick={() => sortingOptionsBtn()}>
              <GiSettingsKnobs className="systemBtn" />
            </span>
          </p>
          <SortingPost show={showSortingOptions} />
          <div className="postFullList">
            {authState?.allPostList?.map((post) => (
              <li key={post._id} className="postList">
                <PostComponent postDetails={post} />
              </li>
            ))}
          </div>
        </div>
      ) : (
        <div className="loader">
          <img src="../../assets/loader.gif" alt="" />
        </div>
      )}
    </div>
  );
}
