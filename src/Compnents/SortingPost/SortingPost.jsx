import "./SortingPost.css";

import { useContext } from "react";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function SortingPost(props) {
  const { authState, authDispatch } = useContext(authContext);
  const { trending, setTrending } = useContext(featureContext);

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
    setTrending(false);
    const sortByDate = authState.allPostList.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    authDispatch({ type: "allPostList", payload: sortByDate });
  };
  console.log(trending);
  return (
    <div className="sortingOptionsParent">
      <div className="sortingOptions">
        <button
          style={{
            backgroundColor: trending
              ? " rgb(250, 203, 49)"
              : "rgb(250, 227, 153)",
          }}
          className="sortingOption"
          onClick={() => sortByLikes()}
        >
          Trending
        </button>
        <button
          style={{
            backgroundColor: trending
              ? "rgb(250, 227, 153)"
              : " rgb(250, 203, 49)",
          }}
          className="sortingOption"
          onClick={() => sortByDate()}
        >
          Latest
        </button>
      </div>
    </div>
  );
}
