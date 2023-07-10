import "./PostOptions.css";

import { useContext } from "react";

import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function PostOptions(props) {
  const { deletePost } = useContext(featureContext);

  if (!props.show) {
    return null;
  }

  const editPost = () => {
    props.setEditModalShow(true);
    props.onClose();
  };

  const deletepost = () => {
    deletePost(props.postId);
    props.onClose();
  };

  return (
    <div className="postOptionsParent">
      <div className="postOptions">
        <p className="option" onClick={() => editPost()}>
          {" "}
          Edit Post
        </p>
        <p className="option" onClick={() => deletepost()}>
          {" "}
          Delete Post
        </p>
      </div>
    </div>
  );
}
