import "./PostOptions.css";

import { useContext, useState } from "react";

import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function PostOptions(props) {
  const { deletePost, showEdit, setShowEdit } = useContext(featureContext);

  // ////console.log(props)
  if (!props.show) {
    return null;
  }

  const editPost = () => {
    setShowEdit(true);
    props.onClose();
  };

  return (
    <div className="postOptionsParent">
      <div className="postOptions">
        <p className="option" onClick={() => editPost()}>
          {" "}
          Edit Post
        </p>
        <p className="option" onClick={() => deletePost(props.postId)}>
          {" "}
          Delete Post
        </p>
      </div>
    </div>
  );
}
