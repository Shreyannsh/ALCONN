import "./ChooseAvatar.css";

import { useContext } from "react";

import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function ChooseAvatar(props) {
  const { setEditedImageUrl } = useContext(featureContext);
  const avatars = {
    avatar01:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812553/ALCONN%20IMAGES/alconn/images_1_r3hjhj.png",
    avatar02:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812547/ALCONN%20IMAGES/alconn/download_2_md5usm.png",
    avatar03:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812550/ALCONN%20IMAGES/alconn/download_zjcgwk.png",
    avatar04:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812513/ALCONN%20IMAGES/alconn/download_1_l68sgh.png",
    avatar05:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812552/ALCONN%20IMAGES/alconn/images_1_khxh7e.jpg",
    avatar06:
      "https://res.cloudinary.com/dtdvoqy09/image/upload/v1688812625/ALCONN%20IMAGES/alconn/images_qig01e.png",
  };

  return (
    <div className="avatarList">
      <img
        onClick={() => setEditedImageUrl(avatars.avatar01)}
        className="avatar"
        src={avatars.avatar01}
        alt="avatar"
      />
      <img
        onClick={() => setEditedImageUrl(avatars.avatar02)}
        className="avatar"
        src={avatars.avatar02}
        alt="avatar"
      />

      <img
        onClick={() => setEditedImageUrl(avatars.avatar03)}
        className="avatar"
        src={avatars.avatar03}
        alt="avatar"
      />

      <img
        onClick={() => setEditedImageUrl(avatars.avatar04)}
        className="avatar"
        src={avatars.avatar04}
        alt="avatar"
      />

      <img
        onClick={() => setEditedImageUrl(avatars.avatar05)}
        className="avatar"
        src={avatars.avatar05}
        alt="avatar"
      />

      <img
        onClick={() => setEditedImageUrl(avatars.avatar06)}
        className="avatar"
        src={avatars.avatar06}
        alt="avatar"
      />

      <div>
        <button className="setBtn" onClick={() => props.onClose()}>
          Set
        </button>
      </div>
    </div>
  );
}
