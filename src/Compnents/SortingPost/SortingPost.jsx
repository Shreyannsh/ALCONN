import { useContext } from 'react';
import './SortingPost.css';

import { authContext } from '../../Context/authContext/authContext';
import { featureContext } from '../../Context/FeatureContext/FeatureContext';

export default function SortingPost(props){

    const {authState, authDispatch} = useContext(authContext);
    const {setTrending} = useContext(featureContext);

    if(!props.show){
        return null;
    }

    const sortByLikes =() =>{
        setTrending(true)
        const sortByLikes = authState.postList.sort((a,b) => b.likes.likeCount - a.likes.likeCount );
        authDispatch({type:'postList', payload:sortByLikes});
    }

    const sortByDate =() =>{
        const sortByDate = authState.postList.sort((a,b) => b.createdAt - a.createdAt );
        authDispatch({type:'postList', payload:sortByDate});
    }

    return(
        <div className="sortingOptionsParent">
            <div className="sortingOptions">
                <button className="sortingOption" onClick={() =>sortByLikes()}>Trending</button>
                <button className="sortingOption" onClick={() =>sortByDate()}>Latest</button>
            </div>
        </div>
    )
}