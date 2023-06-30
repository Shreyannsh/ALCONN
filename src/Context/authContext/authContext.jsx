import { createContext, useState, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { authReducer } from "../../Reducer/authReducer";
import { useNavigate } from "react-router-dom";

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
      toast(error.response.data.errors[0]);
    }
  };

  const allPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      authDispatch({ type: "allPostList", payload: response.data.posts });
    } catch (error) {
      toast(error.response.data.errors[0]);
    }
  };

  const userPostList = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${authState.userName}`);
      authDispatch({ type: "postList", payload: response.data.posts });
    } catch (error) {
      toast(error.response.data.errors[0]);
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
      toast.error(error.response.data.errors[0]);
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
      console.log("reachLogin");
      const response = await axios.post("/api/auth/login", credentials);
      console.log(response.data);
      const encodedToken = response.data.encodedToken;

      localStorage.setItem("encodedToken", encodedToken);
      setIsLogin(true);
      // userList();
      userPostList();
      userDetail();
      allPosts();
      console.log(isLogin);
      toast("Successfully Logged In");
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.errors[0]);
      console.log(error);
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

      console.log(response.data);
      const encodedToken = response.data.encodedToken;
      localStorage.setItem("encodedToken", encodedToken);
      userList();
      authDispatch({ type: "userName", payload: cred.username });
      authDispatch({ type: "loginPassword", payload: cred.password });
      toast("Signed Up Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  console.log(authState);

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
