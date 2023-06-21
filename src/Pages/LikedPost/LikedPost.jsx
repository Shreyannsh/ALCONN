import "./LikedPost.css";

import { useContext } from "react";
import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function LikedPost() {
  const { authState } = useContext(authContext);
  // const likedBy = postDetails.likes.likedBy.find(({_id}) => _id === authState.singleUserDetail._id);
  const likedPostByUser = authState?.allPostList?.filter((post) =>
    post.likes.likedBy.find(({ _id }) => _id === authState.singleUserDetail._id)
  );
  return (
    <div className="likedPostPage">
      <h1 className="pageTitle">Liked Post</h1>
      {likedPostByUser?.map((likedPost) => (
        <li className="list">
          <PostComponent postDetails={likedPost} />
        </li>
      ))}
    </div>
  );
}
