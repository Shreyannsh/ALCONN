import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { authContext } from "../authContext/authContext";

export const featureContext = createContext();

export default function FeatureProvider({ children }) {
  const { authDispatch, userDetail, userList } = useContext(authContext);

  const [trending, setTrending] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [editedImageUrl, setEditedImageUrl] = useState(null); // for editprofle file

  const addPost = async (postData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({
          postData: {
            content: postData.postContent,
            image: postData.postImageUrl,
          },
        }),
      });

      const { posts } = await response.json();

      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });
      authDispatch({ type: "postList", payload: sortByDate });

      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "postList", payload: sortByLikes });
      }
      authDispatch({ type: "postContent", payload: "" });
      toast("Post uploaded Successfully");
    } catch (error) {
      toast(error?.response?.data?.errors[0]);
    }
  };

  const editPost = async (postId, postData) => {
    try {
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({
          postData: {
            content: postData.postContent,
            image: postData.postImageUrl,
          },
        }),
      });

      const { posts } = await response.json();
      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });
      authDispatch({ type: "postList", payload: sortByDate });
      toast("Post Edited Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { posts } = await response.json();
      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });

      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "allPostList", payload: sortByLikes });
      }
      toast("Post Liked !");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { posts } = await response.json();
      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });

      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "allPostList", payload: sortByLikes });
      }
      toast("Post Disliked !");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const addBookmark = async (postId) => {
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { bookmarks } = await response.json();
      authDispatch({ type: "bookmarks", payload: bookmarks });
      toast("Post Bookmarked !");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const removeBookmark = async (postId) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { bookmarks } = await response.json();
      authDispatch({ type: "bookmarks", payload: bookmarks });
      toast("Post removed from Bookmark !");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { posts } = await response.json();
      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });

      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "allPostList", payload: sortByLikes });
      }
      toast("Post Deleted!");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const follow = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      userList(); // updating userlist by default in backend
      userDetail();
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const unfollow = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/unfollow/${followUserId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      userList(); // updating userlist by default in backend
      userDetail();
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  return (
    <div>
      <featureContext.Provider
        value={{
          likePost,
          dislikePost,
          addBookmark,
          removeBookmark,
          addPost,
          deletePost,
          setTrending,
          trending,
          editPost,
          follow,
          unfollow,
          showEdit,
          setShowEdit,
          editedImageUrl,
          setEditedImageUrl,
        }}
      >
        {children}
      </featureContext.Provider>
    </div>
  );
}
