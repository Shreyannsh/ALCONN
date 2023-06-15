import { createContext, useContext,useState} from "react"
import { authContext } from "../authContext/authContext";

export const featureContext = createContext();

export default function FeatureProvider({children}){

    const {authDispatch,userPostList} = useContext(authContext);

    const likePost = async(postId) =>{
        try{
            console.log(postId)
            const response = await fetch(`/api/posts/like/${postId}`,{
                method: 'POST',
                headers: {authorization: localStorage.getItem('encodedToken')},
                body:{},
            });
            const {posts} = await response.json();
            authDispatch({type:'allPostList',payload:posts});
            userPostList();

        }catch(error){
            console.log(error)
        }
    }
    return(
        <div>
            <featureContext.Provider value={{likePost}}>
              {children}
            </featureContext.Provider>
           
        </div>
    )
}