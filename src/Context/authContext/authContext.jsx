import { createContext, useState, useReducer, useEffect } from "react";
import axios from "axios";

import { authReducer } from "../../Reducer/authReducer";
import { useNavigate } from "react-router-dom";
import { homeContext } from "../homeContext/homeContext";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  //const {userDetail,userPostList} = useContext(homeContext);

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

  //////console.log(authState);

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  // const findUser =(userName) =>{
  //     ////console.log(userName);
  //     ////console.log(usersList)
  //     const user = usersList.find((user) => user.username === userName);
  //     ////console.log(user);
  //     userDetail(user._id);
  //  }

  const userList = async () => {
    try {
      const response = await axios.get("/api/users");
      authDispatch({ type: "usersList", payload: response.data.users });
      // findUser(authState.userName);
    } catch (error) {
      ////console.log(error);
    }
  };

  const allPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      authDispatch({ type: "allPostList", payload: response.data.posts });
    } catch (error) {
      ////console.log(error);
    }
  };

  const userPostList = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${authState.userName}`);
      authDispatch({ type: "postList", payload: response.data.posts });
    } catch (error) {
      ////console.log(error);
    }
  };

  const userDetail = async () => {
    try {
      // ////console.log("userDetailsfunctionrun");
      const user = authState.usersList.find(
        (user) => user.username === authState.userName
      );
      const response = await axios.get(`/api/users/${user._id}`);

      //console.log(response);
      authDispatch({ type: "singleUserDetail", payload: response.data.user });
    } catch (error) {
      ////console.log(error);
    }
  };

  const login = async () => {
    try {
      // const email  = authState.loginEmail;
      // const password =  authState.loginPassword;
      const credentials = {
        username: authState.userName,
        password: authState.loginPassword,
      };

      const response = await axios.post("/api/auth/login", credentials);

      const encodedToken = response.data.encodedToken;

      localStorage.setItem("encodedToken", encodedToken);
      setIsLogin(true);
      // userList();
      userPostList();
      userDetail();
      allPosts();
      // let from = location.state?.from?.pathname || '/';
      navigate("/home");
    } catch (error) {
      ////console.error(error);
    }
  };

  const signUp = async () => {
    const cred = {
      username: authState.signUpDetails.username,
      password: authState.signUpDetails.password,
      firstName: authState.signUpDetails.username.firstName,
      lastName: authState.signUpDetails.username.lastName,
    };

    try {
      const response = await axios.post("/api/auth/signup", cred);
      const encodedToken = response.data.encodedToken;
      localStorage.setItem("encodedToken", encodedToken);
      authDispatch({ type: "userName", payload: cred.username });
      authDispatch({ type: "loginPassword", payload: cred.password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  //console.log(authState);

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
        }}
      >
        {children}
      </authContext.Provider>
    </div>
  );
}
