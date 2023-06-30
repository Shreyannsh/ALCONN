import { useContext } from "react";
import "./SortingPost.css";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function SortingPost(props) {
  const { authState, authDispatch } = useContext(authContext);
  const { setTrending } = useContext(featureContext);

  if (!props.show) {
    return null;
  }

  const sortByLikes = () => {
    setTrending(true);
    const sortByLikes = authState.allPostList.sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    authDispatch({ type: "allPostList", payload: sortByLikes });
  };

  const sortByDate = () => {
    const sortByDate = authState.allPostList.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    console.log(sortByDate);
    authDispatch({ type: "allPostList", payload: sortByDate });
  };

  return (
    <div className="sortingOptionsParent">
      <div className="sortingOptions">
        <button className="sortingOption" onClick={() => sortByLikes()}>
          Trending
        </button>
        <button className="sortingOption" onClick={() => sortByDate()}>
          Latest
        </button>
      </div>
    </div>
  );
}
