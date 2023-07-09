import "./Explore.css";

import { useContext, useEffect } from "react";

import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Explore() {
  const { authState, setIsActive } = useContext(authContext);

  useEffect(() => {
    setIsActive("explore");
  }, []);

  return (
    <div className="explorePage">
      <p className="pageName">Explore</p>
      {authState?.allPostList?.map((post) => (
        <li style={{ listStyle: "none" }}>
          <PostComponent postDetails={post} />
        </li>
      ))}
    </div>
  );
}
