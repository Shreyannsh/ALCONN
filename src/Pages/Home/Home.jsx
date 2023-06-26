import "./Home.css";

import { GiSettingsKnobs } from "react-icons/gi";

//import { homeContext } from '../../Context/homeContext/homeContext';
import AddPost from "../../Compnents/AddPost/AddPost";
import PostComponent from "../../Compnents/PostComponent/PostComponent";
import { authContext } from "../../Context/authContext/authContext";
import SortingPost from "../../Compnents/SortingPost/SortingPost";
import { useContext, useState } from "react";

export default function Home() {
  // const {postList,userDetail,userPostList} = useContext(homeContext);
  const { authState } = useContext(authContext);
  const [showSortingOptions, setSortingOptions] = useState(false);

  const sortingOptionsBtn = () => {
    setSortingOptions(!showSortingOptions);
  };

  //console.log(authState);

  return (
    <div>
      <p className="pageTitle">Home</p>

      <AddPost show={true} />

      <p className="heading-latestPost">
        Latest Posts{" "}
        <span onClick={() => sortingOptionsBtn()}>
          <GiSettingsKnobs />
        </span>
      </p>
      <SortingPost show={showSortingOptions} />

      {authState?.postList?.map((post) => (
        <li key={post._id} className="postList">
          <PostComponent postDetails={post} />
        </li>
      ))}
    </div>
  );
}
