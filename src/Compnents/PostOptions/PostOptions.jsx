import './PostOptions.css';

import { useContext,useState } from 'react';

import { featureContext } from '../../Context/FeatureContext/FeatureContext';
import EditPost from '../EditPost/EditPost';

export default function PostOptions(props){

    const {deletePost} = useContext(featureContext);
    const [showEdit, setShowEdit] = useState(false);


    const editPost =() =>{
        setShowEdit(true)
    }

    // console.log(props)
    if(!props.show){
        return null;
    }

    return(
        <div className="postOptionsParent">
            <div className="postOptions">
                <p className='option' onClick={()=> editPost()}> Edit Post</p>
                <p className='option' onClick={()=>deletePost(props.postId)}> Delete Post</p>
            </div>
            <EditPost onClose={()=>setShowEdit(false)} show={showEdit} postId={props.postId}  postContent={props.postContent}/>
        </div>
    )
}