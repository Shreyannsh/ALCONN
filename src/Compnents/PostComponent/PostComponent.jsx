import { useContext } from "react"
import { authContext } from "../../Context/authContext/authContext"

export default function PostComponent({postDetails}){


    const {authState} = useContext(authContext);
    console.log(authState);
    const user = authState.usersList.find(({username}) => username === postDetails.username);
    console.log(user);

    const createdDate = new Date(user.createdAt);




    return(
        <div>
            <div className='postComponent'>

                <img  className='image-pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU'  alt='Pic' />
                <p>{user.firstName} {user.lastName} {createdDate.toDateString()}</p>
                <p>@{user.username}</p>
               <p>{postDetails.content}</p>
               
               <div className='postComponentFooter'>
                    <span className='photo-icon'></span>
                    <button className='HomePost-btn'>Post</button>
               </div>
       
            </div>
        </div>
    )
}