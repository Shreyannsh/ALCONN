import './PostComponent.css'

import { useContext } from "react";
import { authContext } from "../../Context/authContext/authContext";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineBookmarkBorder, MdOutlineBookmark,MdOutlineShare } from "react-icons/md";
import { featureContext } from '../../Context/FeatureContext/FeatureContext';



export default function PostComponent({postDetails}){


    const {authState} = useContext(authContext);
    const {likePost} = useContext(featureContext);


    const user = authState.usersList.find(({username}) => username === postDetails.username);


    const createdDate = new Date(user.createdAt);

    return(
        <div>
            <div className='postComponent'>

                {/* <div className='postComponentHeader'> */}
                <img  className='image-pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU'  alt='Pic' />
                <span className='fullName'> {user.firstName} {user.lastName} </span>
                <span className='createdDate'> {createdDate.toDateString()} </span>
                <span className='options'> < HiDotsHorizontal/> </span> 
                <p className='userName'>@{user.username}</p>
                {/* </div> */}

                <p className='content'>{postDetails.content}</p>
               
               <div className='postComponentFooter'>
                    <span className='footer-icon' onClick={()=>likePost(postDetails._id)}>< BsSuitHeart/> {postDetails.likes.likeCount}</span>
                    <span className='footer-icon'>< GoComment /></span>
                    <span className='footer-icon'>< MdOutlineBookmarkBorder /></span>
                    <span className='footer-icon'>< MdOutlineShare  /></span>
               </div>
       
            </div>
        </div>
    )
} 