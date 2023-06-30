import "./PostComponent.css";

import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext/authContext";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdOutlineShare,
} from "react-icons/md";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";
import PostOptions from "../PostOptions/PostOptions";
import EditPost from "../EditPost/EditPost";

export default function PostComponent({ postDetails }) {
  const { authState } = useContext(authContext);
  const {
    likePost,
    dislikePost,
    addBookmark,
    removeBookmark,
    showEdit,
    setShowEdit,
  } = useContext(featureContext);

  const [showOptions, setShowOptions] = useState(false);

  const user = authState?.usersList?.find(
    ({ username }) => username === postDetails.username
  );

  const accountHolder = authState.singleUserDetail.username.includes(
    postDetails.username
  );
  //console.log(accountHolder);
  const likedBy = postDetails.likes.likedBy.find(
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
      ////console.log("addBookMark");
      addBookmark(postDetails._id);
    }
  };

  const postOptionBtn = () => {
    setShowOptions(!showOptions);
  };

  const createdDate = new Date(postDetails.createdAt);
  const formattedDate = createdDate.toDateString();
  console.log(typeof createdDate);
  return (
    <div>
      <div className="postComponent">
        {/* <div className='postComponentHeader'> */}

        <div className="header">
          <img
            className="postImagePic"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
            alt="Pic"
          />
          <p className="fullName">
            {" "}
            {user.firstName} {user.lastName}{" "}
          </p>
          <p className="createdDate"> {formattedDate} </p>
        </div>

        {accountHolder ? (
          <span className="options" onClick={() => postOptionBtn()}>
            {" "}
            <HiDotsHorizontal />{" "}
          </span>
        ) : (
          ""
        )}
        <p className="userName">@{user.username}</p>
        <div>
          <PostOptions
            onClose={() => setShowOptions(false)}
            show={showOptions}
            postId={postDetails._id}
          />
        </div>

        <p className="content">{postDetails.content}</p>

        <div className="postComponentFooter">
          <span className="footer-icon" onClick={() => likeDislike()}>
            {likedBy ? (
              <BsSuitHeartFill style={{ color: "red" }} />
            ) : (
              <BsSuitHeart />
            )}
            <span className="likeCount">{postDetails.likes.likeCount}</span>
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
        <EditPost
          onClose={() => setShowEdit(false)}
          show={showEdit}
          postId={postDetails._id}
          postContent={postDetails.content}
        />
      </div>
    </div>
  );
}
