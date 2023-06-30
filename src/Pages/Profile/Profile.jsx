import "./Profile.css";

import { useParams } from "react-router";
import { useContext, useState } from "react";

import FollowList from "../../Compnents/FollowList/followList";
import { authContext } from "../../Context/authContext/authContext";
import { EditProfile } from "../../Compnents/editProfile/editProfile";
import PostComponent from "../../Compnents/PostComponent/PostComponent";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { authState, authDispatch, filteredUsers, setFilteredUsers } =
    useContext(authContext);
  const { follow, unfollow } = useContext(featureContext);
  //const [following, setFollowing] = useState(false);
  const [show, setShow] = useState("");
  const [showPosts, setShowPosts] = useState(true);
  const [showLikedPosts, setShowLikedPosts] = useState(false);
  const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [followListShow, setFollowListShow] = useState(false);
  const [mode, setMode] = useState();

  const { userId } = useParams();

  const followingFollowerList = (value) => {
    if (value === "following") {
      setFollowListShow(true);
      setMode(true);
      setFollowList(userDetail?.following);
    } else {
      setFollowListShow(true);
      setMode(false);
      setFollowList(userDetail?.followers);
    }
  };

  const userDetail = authState?.usersList?.find((user) => user._id === userId);
  //console.log(userDetail);

  const match = authState?.singleUserDetail?.username?.includes(
    userDetail.username
  );

  const following = authState?.singleUserDetail?.following?.find(
    ({ _id }) => _id === userDetail._id
  );
  //console.log(following);

  const followingMatched = following?._id?.includes(userDetail?._id);

  //console.log(followingMatched, "FollowingMatched");

  const filteredPost = authState?.allPostList?.filter(
    (post) => post?.username === userDetail?.username
  );

  const [values, setValues] = useState({
    bio: "",
    title: "",
    website: "",
  });

  const followBtn = () => {
    if (following) {
      // setFollowing(!following);
      unfollow(userId);
      toast(`Unfollowed ${userDetail.username}`);
      setFilteredUsers([...filteredUsers, userDetail]);
    } else {
      // setFollowing(!following);
      follow(userId);
      toast(`Following ${userDetail.username}`);
      setFilteredUsers(
        authState?.usersList?.filter(({ _id }) => _id !== userDetail._id)
      );
    }
  };

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

  const bookMarkedPosts = userDetail?.bookmarks?.map((id) =>
    authState.allPostList.find((post) => post._id === id)
  );

  const likedPostByUser = authState?.allPostList?.filter((post) =>
    post.likes.likedBy.find(({ _id }) => _id === userDetail?._id)
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
  ////console.log(authState);
  return (
    <div className="profilePage">
      <FollowList
        onClose={() => setFollowListShow(false)}
        show={followListShow}
        list={followList}
        mode={mode}
      />
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
          <p className="follow-btn" onClick={() => followBtn()}>
            {followingMatched ? "Following" : "Follow"}
          </p>
        )}

        <div className="description">
          <div>
            <p className="title">{userDetail?.title}</p>
            <p className="bio">{userDetail?.bio}</p>
            <a href={userDetail?.website} target="_blank" className="website">
              {userDetail?.website}
            </a>
          </div>
        </div>

        <p className="profile-footer">
          <span> {authState.postList.length} Posts </span>{" "}
          <span onClick={() => followingFollowerList("following")}>
            {userDetail?.following?.length} Following{" "}
          </span>
          <span onClick={() => followingFollowerList("follower")}>
            {" "}
            {userDetail?.followers?.length} Follower{" "}
          </span>
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
        {filteredPost.length > 0 ? (
          filteredPost.map((post) => (
            <li key={post._id} className="postList">
              <PostComponent postDetails={post} />
            </li>
          ))
        ) : (
          <h2 className="emptyMsg">Add a Post!</h2>
        )}
      </div>
      <div style={{ display: showLikedPosts ? "block" : "none" }}>
        {likedPostByUser.length > 0 ? (
          likedPostByUser?.map((likedPost) => (
            <li className="list">
              <PostComponent postDetails={likedPost} />
            </li>
          ))
        ) : (
          <h2 className="emptyMsg">No Liked Posts!</h2>
        )}
      </div>

      <div style={{ display: showBookmarkedPosts ? "block" : "none" }}>
        {bookMarkedPosts?.length > 0 ? (
          bookMarkedPosts?.map((post) => (
            <li>
              <PostComponent postDetails={post} />
            </li>
          ))
        ) : (
          <h2 className="emptyMsg">No Bookmark Posts!</h2>
        )}
      </div>
    </div>
  );
}
