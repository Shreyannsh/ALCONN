import { createContext, useContext, useState } from "react";
import { authContext } from "../authContext/authContext";

export const featureContext = createContext();

export default function FeatureProvider({ children }) {
  const { authDispatch, userPostList, authState, userDetail, userList } =
    useContext(authContext);

  const [trending, setTrending] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const addPost = async (postContent) => {
    try {
      ////console.log(postContent);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({ postData: { content: postContent } }),
      });

      const { posts } = await response.json();
      authDispatch({ type: "allPostList", payload: posts });
      authDispatch({ type: "postList", payload: posts });
      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "postList", payload: sortByLikes });
      }
      authDispatch({ type: "postContent", payload: "" });
    } catch (error) {
      ////console.log("error");
    }
  };

  const editPost = async (postId, postContent) => {
    try {
      ////console.log(postId, postContent);

      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({ postData: { content: postContent } }),
      });

      const { posts } = await response.json();

      authDispatch({ type: "allPostList", payload: posts });
      authDispatch({ type: "postList", payload: posts });
      if (trending) {
        const sortByLikes = posts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        authDispatch({ type: "postList", payload: sortByLikes });
      }
      authDispatch({ type: "postContent", payload: "" });
    } catch (error) {
      ////console.log(error);
    }
  };

  const likePost = async (postId) => {
    try {
      ////console.log(postId);
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { posts } = await response.json();
      authDispatch({ type: "allPostList", payload: posts });
      userPostList();
    } catch (error) {
      ////console.log(error);
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
      authDispatch({ type: "allPostList", payload: posts });
      userPostList();
    } catch (error) {
      ////console.log(error);
    }
  };

  const addBookmark = async (postId) => {
    try {
      ////console.log(postId);
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { bookmarks } = await response.json();
      ////console.log(bookmarks);
      authDispatch({ type: "bookmarks", payload: bookmarks });
    } catch (error) {
      ////console.log(error);
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
    } catch (error) {
      ////console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      ////console.log(postId);
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { posts } = await response.json();
      ////console.log(posts);
      authDispatch({ type: "allPostList", payload: posts });
      userPostList();
    } catch (error) {
      ////console.log(error);
    }
  };

  const follow = async (followUserId) => {
    try {
      ////console.log(followUserId);
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      // ////console.log(await response.json());

      const { user, followUser } = await response.json();
      userList();
      userDetail();
    } catch (error) {
      ////console.log(error);
    }
  };

  const unfollow = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/unfollow/${followUserId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: {},
      });
      const { user, followUser } = await response.json();
      userList();
      userDetail();
    } catch (error) {
      ////console.log(error);
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
          editPost,
          follow,
          unfollow,
          showEdit,
          setShowEdit,
        }}
      >
        {children}
      </featureContext.Provider>
    </div>
  );
}
