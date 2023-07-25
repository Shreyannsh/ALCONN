import "./Profile.css";

import { toast } from "react-toastify";
import { GoSignOut } from "react-icons/go";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FollowList from "../../Compnents/FollowList/followList";
import { authContext } from "../../Context/authContext/authContext";
import { EditProfile } from "../../Compnents/editProfile/editProfile";
import PostComponent from "../../Compnents/PostComponent/PostComponent";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function Profile() {
  const {
    authState,
    authDispatch,
    filteredUsers,
    setFilteredUsers,
    setIsActive,
    setIsLogin,
  } = useContext(authContext);

  const { follow, unfollow } = useContext(featureContext);
  const [show, setShow] = useState("");
  const [showPosts, setShowPosts] = useState(true);
  const [showLikedPosts, setShowLikedPosts] = useState(false);
  const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [followListShow, setFollowListShow] = useState(false);
  const [mode, setMode] = useState();

  const navigate = useNavigate();

  const { userName } = useParams();

  useEffect(() => {
    setIsActive("");
  }, []);

  const userDetail = authState?.usersList?.find(
    (user) => user.username === userName
  );

  const match = authState?.singleUserDetail?.username?.includes(
    userDetail.username
  );

  const following = authState?.singleUserDetail?.following?.find(
    ({ _id }) => _id === userDetail._id
  );

  const followingMatched = following?._id?.includes(userDetail?._id);

  const filteredPost = authState?.allPostList?.filter(
    (post) => post?.username === userDetail?.username
  );

  const bookMarkedPosts = userDetail?.bookmarks?.map((id) =>
    authState.allPostList.find((post) => post._id === id)
  );

  const likedPostByUser = authState?.allPostList?.filter((post) =>
    post.likes.likedBy.find(({ _id }) => _id === userDetail?._id)
  );

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

  const followBtn = () => {
    if (following) {
      unfollow(userDetail._id);
      toast(`Unfollowed ${userDetail.username}`);
      setFilteredUsers([...filteredUsers, userDetail]);
    } else {
      follow(userDetail._id);
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

  const editProfile = () => {
    authDispatch({ type: "prevDesc" });
    setShow(!show);
  };

  const signOut = () => {
    navigate("/");
    setIsLogin(false);
    localStorage.clear();
    toast("Successfully Logged Out");
  };

  return (
    <div className="profilePage">
      {userDetail ? (
        <div>
          <FollowList
            onClose={() => setFollowListShow(false)}
            show={followListShow}
            list={followList}
            mode={mode}
          />
          <EditProfile onClose={() => setShow(!show)} show={show} />
          <div className="background-Image"></div>

          {match ? (
            <div className="signout">
              <span onClick={() => signOut()} className="icon">
                <GoSignOut />
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="imageSection">
            <img className="image" src={userDetail.profilePic} alt="Pic" />
          </div>

          <div className="profileInfo">
            <p className="name">
              {userDetail?.firstName} {userDetail?.lastName}
            </p>

            <p className="username">@{userDetail?.username}</p>

            {match ? (
              <span onClick={() => editProfile()} className="edit-btn">
                Edit Profile
              </span>
            ) : (
              <p className="follow-btn" onClick={() => followBtn()}>
                {followingMatched ? "Following" : "Follow"}
              </p>
            )}

            <div className="description">
              <p className="title">
                <b>{userDetail?.title}</b>
              </p>
              <p className="bio">{userDetail?.bio}</p>
              <a href={userDetail?.website} target="_blank" className="website">
                {userDetail?.website}
              </a>
            </div>

            <p className="profile-footer">
              <span>
                <b> {filteredPost.length} Posts </b>
              </span>{" "}
              <span
                onClick={() => followingFollowerList("following")}
                className="follow-Btn"
              >
                <b> {userDetail?.following?.length} Following </b>
              </span>
              <span
                onClick={() => followingFollowerList("follower")}
                className="follow-Btn"
              >
                {" "}
                <b> {userDetail?.followers?.length} Follower </b>
              </span>
            </p>
          </div>
          <div className="listHeadings">
            <p
              className="postOptionProfile"
              style={{
                backgroundColor: showPosts ? "rgb(243, 205, 78)" : "white",
                padding: "10px 35px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => showPost()}
            >
              Posts
            </p>
            <p
              className="postOptionProfile"
              style={{
                backgroundColor: showLikedPosts ? "rgb(243, 205, 78)" : "white",
                padding: "10px 30px",
                marginLeft: "-6px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => showLikedPost()}
            >
              Liked Posts
            </p>
            <p
              className="postOptionProfile"
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
              Bookmark Post{" "}
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
                <li className="list">
                  <PostComponent postDetails={post} />
                </li>
              ))
            ) : (
              <h2 className="emptyMsg">No Bookmark Posts!</h2>
            )}
          </div>
        </div>
      ) : (
        <div>
          <img src="../../assets/loader.gif" alt="" />
        </div>
      )}
    </div>
  );
}
