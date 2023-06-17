import './PostOptions.css';

import { useContext } from 'react';

import { featureContext } from '../../Context/FeatureContext/FeatureContext';

export default function PostOptions(props){

    const {deletePost} = useContext(featureContext);

    // console.log(props)
    if(!props.show){
        return null;
    }

    return(
        <div className="postOptionsParent">
            <div className="postOptions">
                <p className='option'> Edit Post</p>
                <p className='option' onClick={()=>deletePost(props.postId)}> Delete Post</p>
            </div>
        </div>
    )
}