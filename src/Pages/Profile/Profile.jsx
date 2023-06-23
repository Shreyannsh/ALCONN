import "./Profile.css";

import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext/authContext";
import { EditProfile } from "../../Compnents/editProfile/editProfile";
import PostComponent from "../../Compnents/PostComponent/PostComponent";
import { useParams } from "react-router";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function Profile() {
  const { authState, authDispatch } = useContext(authContext);
  const { unfollow } = useContext(featureContext);
  const [show, setShow] = useState("");

  const [showPosts, setShowPosts] = useState(true);
  const [showLikedPosts, setShowLikedPosts] = useState(false);
  const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false);

  const { userId } = useParams();

  console.log(userId);

  const userDetail = authState?.usersList?.find((user) => user._id === userId);
  console.log(userDetail);

  const match = authState?.singleUserDetail.username.includes(
    userDetail.username
  );

  console.log(match);

  const filteredPost = authState?.allPostList?.filter(
    (post) => post.username === userDetail.username
  );

  const [values, setValues] = useState({
    bio: "",
    title: "",
    website: "",
  });

  const showPost = () => {
    setShowPosts(true);
    setShowLikedPosts(false);
    setShowBookmarkedPosts(false);
  };
  const showLikedPost = () => {
    setShowPosts(false);
    setShowLikedPosts(true);
    setShowBookmarkedPosts(false);
  };
  const showBookmarkedPost = () => {
    setShowPosts(false);
    setShowLikedPosts(false);
    setShowBookmarkedPosts(true);
  };

  const bookMarkedPosts = authState.bookmarks.map((id) =>
    authState.allPostList.find((post) => post._id === id)
  );

  const likedPostByUser = authState?.allPostList?.filter((post) =>
    post.likes.likedBy.find(({ _id }) => _id === authState.singleUserDetail._id)
  );
  const editProfile = () => {
    // setValues({
    //   bio: singleUserDetail.bio,
    //   title: singleUserDetail.title,
    //   website: singleUserDetail.website,
    // });
    authDispatch({ type: "prevDesc" });

    setShow(!show);
  };
  //console.log(authState);
  return (
    <div className="profilePage">
      <EditProfile values={values} onClose={() => setShow(!show)} show={show} />
      <div className="background-Image"></div>
      <img
        className="image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
        alt="Pic"
      />
      <div className="profileInfo">
        <p className="name">
          {userDetail?.firstName} {userDetail?.lastName}
        </p>

        <p className="username">@{userDetail?.username}</p>

        {match ? (
          <p onClick={() => editProfile()} className="edit-btn">
            Edit Profile
          </p>
        ) : (
          <p className="follow-btn">Follow</p>
        )}

        <div className="description">
          <div>
            <p className="title">{userDetail?.title}</p>
            <p className="bio">{userDetail?.bio}</p>
            <p className="website">{userDetail?.website}</p>
          </div>
        </div>

        <p className="profile-footer">
          {authState.postList.length} Posts | {userDetail?.following?.length}{" "}
          Following | {userDetail?.followers?.length} Follower
        </p>
      </div>
      <div className="listHeadings">
        <p
          style={{
            backgroundColor: showPosts ? "rgb(243, 205, 78)" : "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => showPost()}
        >
          Posts
        </p>
        <p
          style={{
            backgroundColor: showLikedPosts ? "rgb(243, 205, 78)" : "white",
            padding: "10px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => showLikedPost()}
        >
          Liked Posts
        </p>
        <p
          style={{
            backgroundColor: showBookmarkedPosts
              ? "rgb(243, 205, 78)"
              : "white",
            padding: "10px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => showBookmarkedPost()}
        >
          Bookmarked Post{" "}
        </p>
      </div>

      <div style={{ display: showPosts ? "block" : "none" }}>
        {filteredPost.map((post) => (
          <li key={post._id} className="postList">
            <PostComponent postDetails={post} />
          </li>
        ))}
      </div>
      <div style={{ display: showLikedPosts ? "block" : "none" }}>
        {likedPostByUser?.map((likedPost) => (
          <li className="list">
            <PostComponent postDetails={likedPost} />
          </li>
        ))}
      </div>

      <div style={{ display: showBookmarkedPosts ? "block" : "none" }}>
        {bookMarkedPosts.map((post) => (
          <li className="list">
            <PostComponent postDetails={post} />
          </li>
        ))}
      </div>
    </div>
  );
}
