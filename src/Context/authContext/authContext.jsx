import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useReducer, useEffect } from "react";

import { authReducer } from "../../Reducer/authReducer";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    userName: "",
    loginPassword: "",
    postList: [],
    allPostList: [],
    usersList: [],
    singleUserDetail: {},
    bookmarks: [],
    postContent: "",
    editedContent: "",
    descriptionUpdate: {
      title: "",
      bio: "",
      website: "",
    },
    signUpDetails: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      username: "",
      password: "",
      rePassword: "",
    },
  });

  const [filteredUsers, setFilteredUsers] = useState();
  const [isActive, setIsActive] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  const userList = async () => {
    try {
      const response = await axios.get("/api/users");
      authDispatch({ type: "usersList", payload: response.data.users });
    } catch (error) {
      toast(error?.response?.data?.errors[0]);
    }
  };

  const editUser = async (userData) => {
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({
          userData: {
            profilePic: userData?.profilePic,
            title: userData?.title,
            bio: userData?.bio,
            website: userData?.website,
          },
        }),
      });
      userList();
    } catch (error) {
      toast(error?.response?.data?.errors[0]);
    }
  };

  const allPosts = async () => {
    try {
      const response = await axios.get("/api/posts");

      const posts = response.data.posts;

      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "allPostList", payload: sortByDate });
    } catch (error) {
      toast(error?.response?.data?.errors[0]);
    }
  };

  const userPostList = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${authState.userName}`);
      const posts = response.data.posts;
      const sortByDate = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      authDispatch({ type: "postList", payload: sortByDate });
    } catch (error) {
      toast(error.response.data.errors[0]);
    }
  };

  const userDetail = async () => {
    const userNameLocal = localStorage.getItem("loginUserName");
    try {
      const user = authState.usersList.find(
        (user) => user.username === userNameLocal
      );
      const response = await axios.get(`/api/users/${user._id}`);
      authDispatch({ type: "singleUserDetail", payload: response.data.user });
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const login = async () => {
    try {
      const credentials = {
        username: authState.userName,
        password: authState.loginPassword,
      };
      const response = await axios.post("/api/auth/login", credentials);
      const encodedToken = response.data.encodedToken;

      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("loginUserName", authState.userName);

      //setIsLogin(true);
      userPostList();
      allPosts();
      userDetail();
      toast("Successfully Logged In");
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  const signUp = async () => {
    const cred = {
      username: authState.signUpDetails.username,
      password: authState.signUpDetails.password,
      firstName: authState.signUpDetails.firstName,
      lastName: authState.signUpDetails.lastName,
    };

    try {
      const response = await axios.post("/api/auth/signup", cred);
      const encodedToken = response.data.encodedToken;
      //  localStorage.setItem("encodedToken", encodedToken);
      userList();
      authDispatch({ type: "userName", payload: cred.username });
      authDispatch({ type: "loginPassword", payload: cred.password });
      toast("Signed Up Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };

  useEffect(() => {
    userList();
    allPosts();
  }, []);

  useEffect(() => {
    userDetail();
  }, [authState.usersList]);

  return (
    <div>
      <authContext.Provider
        value={{
          authState,
          authDispatch,
          login,
          isLogin,
          setIsLogin,
          userPostList,
          userDetail,
          userList,
          filteredUsers,
          setFilteredUsers,
          signUp,
          isActive,
          setIsActive,
          allPosts,
          editUser,
          isMobile,
          setIsMobile,
        }}
      >
        {children}
      </authContext.Provider>
    </div>
  );
}
