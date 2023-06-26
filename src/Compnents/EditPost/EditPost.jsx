import { useContext } from "react";

import "./EditPost.css";

import { BsImageFill } from "react-icons/bs";
import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function EditPost(props) {
  const { authState, authDispatch } = useContext(authContext);
  const { editPost } = useContext(featureContext);

  if (!props.show) {
    return null;
  }

  const editPostFunc = () => {
    editPost(props.postId, authState.editedContent);
    props.onClose();
  };

  ////console.log(props);

  return (
    <div className="parentModalEdit">
      <div onClick={() => props.onClose()} className="editPostComponent">
        <span className="cancel">X</span>
        <p className="editPostTitle">Edit Post</p>
        <textarea
          onChange={(e) =>
            authDispatch({ type: "editedContent", payload: e.target.value })
          }
          className="textArea"
        ></textarea>

        <div className="editPostComponentFooter">
          <span className="photo-icon">
            <BsImageFill />
          </span>
          <button onClick={() => editPostFunc()} className="editPost-btn">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
