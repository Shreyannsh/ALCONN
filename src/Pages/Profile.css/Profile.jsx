import { useContext } from "react";
import { authContext } from "../../Context/authContext/authContext";

export default function Profile() {
  const { authState } = useContext(authContext);

  const { singleUserDetail } = authState;

  return (
    <div className="ProfilePage">
      <div className="background-Image"></div>

      <img
        className="image-pic"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
        alt="Pic"
      />

      <div className="profileInfo">
        <p>{singleUserDetail.firstName}</p>
        <p>{singleUserDetail.lastName}</p>
        <p>{singleUserDetail.username}</p>
        <p>{singleUserDetail?.title}</p>
        <p>{singleUserDetail?.bio}</p>
        <p>{singleUserDetail?.website}</p>
        <p>{authState.postList.length} Posts | </p>
      </div>
    </div>
  );
}
