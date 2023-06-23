import { useContext } from "react";
import "./AddPost.css";

import { BsImageFill } from "react-icons/bs";
import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function AddPost() {
  const { authState, authDispatch } = useContext(authContext);
  const { addPost } = useContext(featureContext);
  ////console.log(authState.postContent)
  return (
    <div>
      <div className="addPostComponent">
        <img
          className="image-pic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
          alt="Pic"
        />

        <textarea
          onChange={(e) =>
            authDispatch({ type: "postContent", payload: e.target.value })
          }
          value={authState.postContent}
          className="textArea"
          placeholder="What's happening?"
        ></textarea>

        <div className="addPostComponentFooter">
          <span className="photo-icon">
            <BsImageFill />
          </span>
          <button
            onClick={() => addPost(authState.postContent)}
            className="addPost-btn"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
