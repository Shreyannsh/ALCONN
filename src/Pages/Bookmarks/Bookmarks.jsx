import "./Bookmarks.css";

import { useContext } from "react";
import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Bookmarks() {
  const { authState } = useContext(authContext);

  const bookMarkedPosts = authState.bookmarks.map((id) =>
    authState.allPostList.find((post) => post._id === id)
  );

  console.log(bookMarkedPosts);

  return (
    <div className="bookMarkPage">
      <h1 className="pageTitle">Your Bookmarks</h1>
      {bookMarkedPosts.map((post) => (
        <li>
          <PostComponent postDetails={post} />
        </li>
      ))}
    </div>
  );
}
