import "./Home.css";

import { GiSettingsKnobs } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";

import AddPost from "../../Compnents/AddPost/AddPost";
import SortingPost from "../../Compnents/SortingPost/SortingPost";
import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Home() {
  const { authState, setIsActive, userDetail } = useContext(authContext);
  const [showSortingOptions, setSortingOptions] = useState(false);

  const sortingOptionsBtn = () => {
    setSortingOptions(!showSortingOptions);
  };

  useEffect(() => {
    userDetail();
  }, []);

  useEffect(() => {
    setIsActive("home");
  }, []);

  return (
    <div className="homePage">
      <p className="pageTitle">Home</p>
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

      {authState?.allPostList?.map((post) => (
        <li key={post._id} className="postList">
          <PostComponent postDetails={post} />
        </li>
      ))}
    </div>
  );
}
