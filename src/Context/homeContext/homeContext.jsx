import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { authContext } from "../authContext/authContext";

export const homeContext = createContext();

export default function HomeProvider({ children }) {
  // const {authState, isLogin} = useContext(authContext);

  // const [userDetails,setUserDetails] = useState();

  // //console.log(authState);
  // const username =authState.userName;
  // // //console.log(username);

  // // if(isLogin){
  // //     userPostList(username);
  // // }
  // useEffect(()=>{
  //     userPostList(username);
  //     // userDetail(authState.userName);
  // },[])

  return (
    <div>
      <homeContext.Provider value={{}}>{children}</homeContext.Provider>
    </div>
  );
}
//value={{postList,userPostList}}
