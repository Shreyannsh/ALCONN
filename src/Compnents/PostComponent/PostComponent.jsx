import "./PostComponent.css";

import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdOutlineShare,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import EditPost from "../EditPost/EditPost";
import { useContext, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import PostOptions from "../PostOptions/PostOptions";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function PostComponent({ postDetails }) {
  const { likePost, dislikePost, addBookmark, removeBookmark } =
    useContext(featureContext);
  const [editModalShow, setEditModalShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { authState } = useContext(authContext);

  const user = authState?.usersList?.find(
    ({ username }) => username === postDetails.username
  );

  const accountHolder = authState?.singleUserDetail?.username?.includes(
    postDetails.username
  );

  const likedBy = postDetails?.likes?.likedBy?.find(
    ({ _id }) => _id === authState.singleUserDetail._id
  );

  const bookMarked = authState?.bookmarks?.find(
    (_id) => _id === postDetails._id
  );

  const likeDislike = () => {
    if (likedBy) {
      dislikePost(postDetails._id);
    } else {
      likePost(postDetails._id);
    }
  };

  const bookmarkThePost = () => {
    if (bookMarked) {
      removeBookmark(postDetails._id);
    } else {
      addBookmark(postDetails._id);
    }
  };

  const postOptionBtn = () => {
    setShowOptions(!showOptions);
  };

  const createdDate = new Date(postDetails.createdAt);

  const formattedDate = createdDate.toDateString();

  // console.log(postDetails);
  return (
    <div>
      <div className="postComponent">
        <div className="header">
          <img className="postImagePic" src={user?.profilePic} alt="Pic" />
          <Link to={`/profile/${user?.username}`} className="fullName">
            {" "}
            {user?.firstName} {user?.lastName}{" "}
          </Link>
          <span className="createdDate"> {formattedDate} </span>
        </div>

        {accountHolder ? (
          <span className="options" onClick={() => postOptionBtn()}>
            {" "}
            <HiDotsHorizontal />{" "}
          </span>
        ) : (
          ""
        )}
        <span className="userName">@{user?.username}</span>
        <div>
          <PostOptions
            onClose={() => setShowOptions(false)}
            show={showOptions}
            setEditModalShow={setEditModalShow}
            postId={postDetails._id}
          />
          <EditPost
            onClose={() => setEditModalShow(false)}
            show={editModalShow}
            postId={postDetails._id}
            postContent={postDetails.content}
            postImage={postDetails.image}
          />
        </div>

        <p className="content">{postDetails?.content}</p>

        {postDetails?.image ? (
          <img src={postDetails?.image} alt="pic" className="postImage" />
        ) : (
          ""
        )}

        <div className="postComponentFooter">
          <span className="footer-icon" onClick={() => likeDislike()}>
            {likedBy ? (
              <BsSuitHeartFill style={{ color: "red" }} />
            ) : (
              <BsSuitHeart />
            )}
            <span className="likeCount">{postDetails?.likes?.likeCount}</span>
          </span>
          <span className="footer-icon">
            <GoComment />
          </span>
          <span className="footer-icon" onClick={() => bookmarkThePost()}>
            {" "}
            {bookMarked ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />}
          </span>
          <span className="footer-icon">
            <MdOutlineShare />
          </span>
        </div>
      </div>
    </div>
  );
}
