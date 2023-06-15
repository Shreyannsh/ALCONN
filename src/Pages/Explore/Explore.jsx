import './Explore.css'

import { useContext } from "react";

import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";


export default function Explore(){

    const {authState} = useContext(authContext);

    return(
        <div className="explorePage">
            <p className='pageName'>Explore</p>
           {authState?.allPostList?.map((post) => <li style={{listStyle:"none"}}>
            <PostComponent postDetails={post} />
           </li>)}


        </div>
    )
} 