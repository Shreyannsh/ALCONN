import { useContext, useState } from "react";
import "./AddPost.css";

import { BsImageFill } from "react-icons/bs";
import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";
import { toast } from "react-toastify";

export default function AddPost(props) {
  const { authState, authDispatch } = useContext(authContext);
  const { addPost } = useContext(featureContext);
  const [postData, setPostData] = useState(null);

  if (!props.show) {
    return null;
  }

  const addPostBtn = () => {
    if (authState.postContent || postData) {
      addPost(authState.postContent);
      toast("Post uploaded Successfully");
    } else {
      toast.error("Post is empty");
    }
  };

  return (
    <div className={props.mode === "sideBar" ? "parentModal" : ""}>
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
            <label>
              <input
                className="hidden"
                type="file"
                onChange={(e) =>
                  setPostData(URL?.createObjectURL(e?.target?.files[0]))
                }
              />
              <BsImageFill />{" "}
              <span>
                <img className="thumbnail" src={postData} alt="post-Img" />
              </span>
            </label>
          </span>

          {props.mode === "sideBar" && (
            <button onClick={() => props.onClose()} className="cancel">
              X
            </button>
          )}

          <button onClick={() => addPostBtn()} className="addPost-btn">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
