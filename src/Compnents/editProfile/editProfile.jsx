import "./editProfile.css";

import { toast } from "react-toastify";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useContext, useState, useEffect } from "react";

import ChooseAvatar from "../ChooseAvatar/ChooseAvatar";
import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export const EditProfile = (props) => {
  const { authDispatch, authState, editUser } = useContext(authContext);
  const { editedImageUrl, setEditedImageUrl } = useContext(featureContext);
  const [editImage, setEditImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImage, setUplaodedImage] = useState();
  const [showAvatarList, setShowAvatarList] = useState(false);

  const userData = {
    title: authState.descriptionUpdate.title,
    bio: authState.descriptionUpdate.bio,
    website: authState.descriptionUpdate.website,
    profilePic: editedImageUrl,
  };

  console.log(userData);

  const cancelBtn = () => {
    setUplaodedImage(null);
    setEditedImageUrl(null);
    props.onClose();
  };

  const updateDesc = () => {
    editUser(userData);
    toast("Profile updated!");
    props.onClose();
  };

  const loggedInUser = authState.usersList.find(
    (user) => user._id === authState.singleUserDetail._id
  );

  const getImage = async () => {
    if (uploadedImage) {
      const imageData = new FormData();

      imageData.append("file", uploadedImage);
      imageData.append("upload_preset", "shreyansh");
      imageData.append("cloud_name", "dtdvoqy09");

      try {
        setImageLoading(true);
        setEditImage(!editImage);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtdvoqy09/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const { url } = await response.json();
        setEditedImageUrl(url);
        setImageLoading(false);
      } catch (error) {
        toast.error("Server Error");
      }
    } else {
      setEditedImageUrl(authState.singleUserDetail.profilcPic);
    }
  };

  const close = () => {
    setEditImage(false);
    setShowAvatarList(!showAvatarList);
  };

  useEffect(() => {
    getImage();
  }, [uploadedImage]);

  if (!props.show) {
    return null;
  }

  return (
    <div className="parentModal">
      <div className="editProfileComponent">
        <div className="edit-pic-component">
          {imageLoading ? (
            <img
              className="edit-pic"
              src="https://gifdb.com/images/high/buffering-animated-text-icon-loading-u1h739who8u5mtw3.gif"
              alt=""
            />
          ) : (
            <div className="edit-pic-component">
              <img
                className="edit-pic"
                src={editedImageUrl ? editedImageUrl : loggedInUser.profilePic}
                alt=""
              />
              <MdOutlinePhotoCamera
                className="pic-edit-btn"
                onClick={() => setEditImage(!editImage)}
              />
            </div>
          )}
        </div>

        <div
          className="edit-Pic-Options"
          style={{ display: editImage ? "block" : "none" }}
        >
          <div>
            <label className="uploadBtn">
              Upload{" "}
              <input
                type="file"
                style={{ display: "contents" }}
                onChange={(e) => setUplaodedImage(e?.target?.files[0])}
                accept="image/jpeg, image/png, image/gif"
              />
            </label>
          </div>
          <p
            className="uploadBtn"
            onClick={() => setShowAvatarList(!showAvatarList)}
          >
            {" "}
            Choose Avatar
          </p>
          <div style={{ display: showAvatarList ? "block" : "none" }}>
            <ChooseAvatar onClose={() => close()} />
          </div>
        </div>
        <p>Title</p>
        <input
          className="input"
          type="text"
          name="title"
          value={authState.descriptionUpdate.title}
          onChange={(e) =>
            authDispatch({ type: "addTitle", payload: e.target.value })
          }
        />
        <p>Bio</p>
        <textarea
          className="editBio"
          name="bio"
          value={authState.descriptionUpdate.bio}
          onChange={(e) =>
            authDispatch({ type: "addBio", payload: e.target.value })
          }
        ></textarea>
        <p>Website/Link</p>
        <input
          className="input"
          type="url"
          name="website"
          value={authState.descriptionUpdate.website}
          onChange={(e) =>
            authDispatch({ type: "addWebsite", payload: e.target.value })
          }
        />

        <div className="editFooter">
          <button onClick={() => cancelBtn()}>Cancel</button>

          <button
            disabled={imageLoading ? true : false}
            onClick={() => updateDesc()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
