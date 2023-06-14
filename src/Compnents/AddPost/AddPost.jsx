import './AddPost.css';

import {BsImageFill} from "react-icons/bs";

export default function AddPost(){
    return(
        <div>
            <div className='addPostComponent'>
        
                <img  className='image-pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU'  alt='Pic' />
                <textarea  className='textArea' placeholder="What's happening?"></textarea>
                
                <div className='addPostComponentFooter'>
                <span className='photo-icon'><BsImageFill /></span>
                <button className='addPost-btn'>Post</button>
                </div>
       
            </div>
        </div>
    )
}