import "./followList.css";

import { Link } from "react-router-dom";

export default function FollowList(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="parentModal">
      <div className="followList">
        <h2 className="fTitle">{props.mode ? "Following" : "Followers"}</h2>{" "}
        <span onClick={() => props.onClose()} className="cancel">
          X
        </span>
        {props?.list?.length > 0 || props?.list?.length === undefined ? (
          props?.list?.map((user) => (
            <li style={{ listStyle: "none" }} key={user._id}>
              <Link
                onClick={() => props.onClose()}
                to={`/profile/${user.username}`}
                className="suggestedUser"
              >
                <img className="image-pic" src={user.profilePic} alt="" />
                <p className="fullName">
                  {user.firstName} {user.lastName}
                </p>
                <p className="userName">@{user.username}</p>
              </Link>
            </li>
          ))
        ) : props.mode ? (
          <h2>Following no one !</h2>
        ) : (
          <h2> No Followers yet !</h2>
        )}
      </div>
    </div>
  );
}
