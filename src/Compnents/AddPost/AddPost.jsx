import "./AddPost.css";

import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BsImageFill } from "react-icons/bs";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function AddPost(props) {
  const { authState, authDispatch } = useContext(authContext);
  const { addPost, editPost } = useContext(featureContext);
  const [postData, setPostData] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const getImage = async () => {
    if (uploadedImage) {
      const imageData = new FormData();

      imageData.append("file", uploadedImage);
      imageData.append("upload_preset", "shreyansh");
      imageData.append("cloud_name", "dtdvoqy09");

      try {
        setImageLoading(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtdvoqy09/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const { url } = await response.json();
        setPostData({ ...postData, postImageUrl: url });
        setImageLoading(false);
      } catch (error) {
        toast.error("Server Error");
      }
    }
  };

  useEffect(() => {
    getImage();
  }, [uploadedImage]);

  if (!props.show) {
    return null;
  }

  const addPostBtn = () => {
    if (postData.postContent || postData.postImageUrl) {
      props.edit ? editPost(props.postId, postData) : addPost(postData);
      setPostData({ postContent: "", postImageUrl: "" });
      setUploadedImage("");
      if (props.mode === "sideBar") {
        props.onClose();
      }
    } else {
      toast.error("Empty post is useless!");
    }
  };

  const loggedInUser = authState.usersList.find(
    (user) => user._id === authState.singleUserDetail._id
  );

  return (
    <div className={props.mode === "sideBar" ? "parentModall" : ""}>
      <div
        className="addPostComponent"
        style={{ height: props.edit && "13rem" }}
      >
        <p className="editPostTitle">{props?.edit && "Edit Post"}</p>
        <img className="image-pic" src={loggedInUser?.profilePic} alt="Pic" />

        <textarea
          onChange={(e) => {
            setPostData({ ...postData, postContent: e.target.value });
          }}
          value={postData?.postContent}
          className="textArea"
          placeholder={props.edit ? "" : "What's happening?"}
        ></textarea>

        <div className="addPostComponentFooter">
          <span className="photo-icon">
            <label>
              <input
                className="hidden"
                type="file"
                onChange={(e) => setUploadedImage(e?.target?.files[0])}
                accept="image/*"
              />
              <BsImageFill />{" "}
              <span>
                {uploadedImage ? (
                  <div>
                    {imageLoading ? (
                      <img
                        style={{ display: imageLoading ? "block" : "none" }}
                        className="loading"
                        src="https://www.drybag.in/wp-content/uploads/2022/09/uploading.gif"
                        alt=""
                      />
                    ) : (
                      <div>
                        <img
                          style={{ display: uploadedImage ? "block" : "none" }}
                          className="thumbnail"
                          src={postData.postImageUrl}
                          alt=""
                        />
                        <span
                          className="cancelImage"
                          onClick={() => setUploadedImage("")}
                        >
                          x
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </span>
            </label>
          </span>

          {props.mode === "sideBar" && (
            <button onClick={() => props.onClose()} className="cancel">
              X
            </button>
          )}

          <button
            disabled={imageLoading ? true : false}
            onClick={() => addPostBtn()}
            className="addPost-btn"
          >
            {props.edit ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
