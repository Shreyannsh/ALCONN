import { useContext } from 'react';
import './Home.css';

import { GiSettingsKnobs } from "react-icons/gi";

//import { homeContext } from '../../Context/homeContext/homeContext';
import AddPost from '../../Compnents/AddPost/AddPost';
import PostComponent from '../../Compnents/PostComponent/PostComponent';
import { authContext } from '../../Context/authContext/authContext';

export default function Home(){

    // const {postList,userDetail,userPostList} = useContext(homeContext);
    const {authState} = useContext(authContext);
    
    return(
        <div >
            <p className='pageTitle'>Home</p>

            <AddPost />
            
            <p className='heading-latestPost'>Latest Posts <span>< GiSettingsKnobs /></span></p> 
            
            {authState?.postList?.map((post)=><li className='postList'>
                <PostComponent postDetails={post} />
            </li>)}

        </div>
    )
}