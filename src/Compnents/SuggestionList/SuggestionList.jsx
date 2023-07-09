import "./SuggestionList.css";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function SuggestionList(props) {
  const { authState, filteredUsers, setFilteredUsers } =
    useContext(authContext);
  const { follow } = useContext(featureContext);
  const followingList = authState.singleUserDetail.following;

  const displayFilterList = () => {
    const filteredSuggestionList = authState.usersList?.reduce((acc, crr) => {
      const match = followingList?.find((user) => user._id === crr._id);

      return match ? acc : [...acc, crr];
    }, []);

    setFilteredUsers(
      filteredSuggestionList.filter(
        ({ _id }) => _id !== authState.singleUserDetail._id
      )
    );
  };

  const searchUser = (e) => {
    const value = props.searchText !== "" ? props.searchText : e?.target?.value;

    if (value) {
      setFilteredUsers(
        authState.usersList.filter(
          (user) =>
            user.username.toLowerCase().includes(value.toLowerCase()) ||
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(
        authState.usersList.filter(
          ({ _id }) => _id !== authState.singleUserDetail._id
        )
      );
    }
  };

  const followUnfollow = (id) => {
    const person = authState.usersList.find((user) => user._id === id);

    follow(id);

    setFilteredUsers(filteredUsers.filter(({ _id }) => _id !== id));
    toast(`Following ${person.username}`);
  };

  useEffect(() => {
    displayFilterList();
  }, [authState]);

  useEffect(() => {
    searchUser();
  }, [props.searchText]);

  return (
    <div className="suggestionList">
      <input
        style={{ display: props.mobile ? "none" : "block" }}
        className="searchBox"
        placeholder="Search friend"
        onChange={(e) => searchUser(e)}
        type="text"
      />

      <h3
        style={{ display: props.mobile ? "none" : "block" }}
        className="suggestionTitle"
      >
        Suggestions for you
      </h3>

      {filteredUsers?.map(
        ({ firstName, lastName, username, _id, profilePic }) => (
          <li style={{ listStyle: "none" }} key={_id}>
            <div className="suggestedUser">
              <Link className="link" to={`/profile/${_id}`}>
                <img className="image-pic" src={profilePic} />
                <p className="fullName">
                  {firstName} {lastName}
                </p>
                <p className="userName">@{username}</p>
              </Link>
              {authState.singleUserDetail._id !== _id && (
                <span
                  className="follow-btn"
                  onClick={() => {
                    followUnfollow(_id);
                  }}
                >
                  Follow
                </span>
              )}
            </div>
          </li>
        )
      )}
    </div>
  );
}
