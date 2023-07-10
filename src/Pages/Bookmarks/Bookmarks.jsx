import "./Bookmarks.css";

import { useContext, useEffect } from "react";

import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Bookmarks() {
  const { authState, isActive, setIsActive } = useContext(authContext);

  const bookMarkedPosts = authState.bookmarks.map((id) =>
    authState.allPostList.find((post) => post._id === id)
  );

  useEffect(() => {
    setIsActive("bookmark");
  }, [isActive]);

  return (
    <div className="bookMarkPage">
      <h1 className="pageTitle">Your Bookmarks</h1>
      {bookMarkedPosts?.length > 0 ? (
        bookMarkedPosts?.map((post) => (
          <li style={{ listStyle: "none" }}>
            <PostComponent postDetails={post} />
          </li>
        ))
      ) : (
        <h2 className="emptyMsg">No Bookmark Posts!</h2>
      )}
    </div>
  );
}
