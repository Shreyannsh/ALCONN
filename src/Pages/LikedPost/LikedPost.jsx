import "./LikedPost.css";

import { useContext, useEffect } from "react";

import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function LikedPost() {
  const { authState, isActive, setIsActive } = useContext(authContext);

  const likedPostByUser = authState?.allPostList?.filter((post) =>
    post.likes.likedBy.find(({ _id }) => _id === authState.singleUserDetail._id)
  );

  useEffect(() => {
    setIsActive("liked");
  }, [isActive]);

  return (
    <div className="likedPostPage">
      <h1 className="pageTitle">Liked Post</h1>
      {likedPostByUser.length > 0 ? (
        likedPostByUser?.map((likedPost) => (
          <li className="list">
            <PostComponent postDetails={likedPost} />
          </li>
        ))
      ) : (
        <h2 className="emptyMsg">No Liked Posts!</h2>
      )}
    </div>
  );
}
