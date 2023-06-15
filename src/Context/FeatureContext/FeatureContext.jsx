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

    const dislikePost = async(postId) =>{
            try{
                const response = await fetch(`/api/posts/dislike/${postId}`,{
                    method:'POST',
                    headers: {authorization: localStorage.getItem('encodedToken')},
                    body:{},
                })
                const {posts} = await response.json();
                authDispatch({type:'allPostList',payload:posts});
                userPostList();
            }catch(error){
                console.log(error)
            }
    }


    const addBookmark = async(postId) =>{
        try{
            const response = await fetch(`/api/users/bookmark/${postId}`,{
                method:'POST',
                headers:{authorization: localStorage.getItem('encodedToken')},
                body:{}
            })
        const {bookmarks} = await response.json();
        authDispatch({type:'bookmarks', payload: bookmarks })

        }catch(error){
            console.log(error)
        }
    }

    const removeBookmark = async(postId) =>{
        try{
            const response = await fetch(`/api/users/remove-bookmark/${postId}`,{
                method: 'POST',
                headers:{authorization: localStorage.getItem('encodedToken')},
                body:{}
            })
            const {bookmarks}  = await response.json();
            authDispatch({type:'bookmarks', payload: bookmarks })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <featureContext.Provider value={{likePost,dislikePost,addBookmark,removeBookmark}}>
              {children}
            </featureContext.Provider>
           
        </div>
    )
}