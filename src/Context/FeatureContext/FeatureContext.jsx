import { createContext, useContext,useState} from "react"
import { authContext } from "../authContext/authContext";

export const featureContext = createContext();

export default function FeatureProvider({children}){

    const {authDispatch,userPostList,authState} = useContext(authContext);


    const addPost = async(postContent) =>{
        try{
            console.log(postContent);
            const response = await fetch('/api/posts',{
                method:'POST',
                headers: {authorization: localStorage.getItem('encodedToken')},
                body:
                    JSON.stringify({postData: {content: postContent}})   
            })

            const {posts} = await response.json();
            authDispatch({type:'allPostList',payload:posts});
            authDispatch({type:'postList',payload:posts});
            authDispatch({type:'postContent', payload:''})

        }catch(error){
            console.log('error')
        }
    }

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
            console.log(postId)
            const response = await fetch(`/api/users/bookmark/${postId}`,{
                method:'POST',
                headers:{authorization: localStorage.getItem('encodedToken')},
                body:{}
            })
        const {bookmarks} = await response.json();
        console.log(bookmarks)
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

    const deletePost = async(postId) =>{
        try{
            console.log(postId)
            const response = await fetch(`/api/posts/${postId}`,{
                method:'DELETE',
                headers: {authorization: localStorage.getItem('encodedToken')},  
            })

            const {posts} = await response.json();
            console.log(posts)
            authDispatch({type:'allPostList', payload:posts})
            userPostList();
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <featureContext.Provider value={{likePost,dislikePost,addBookmark,removeBookmark,addPost,deletePost}}>
              {children}
            </featureContext.Provider>
           
        </div>
    )
}