import "./SuggestionList.css";

import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

import { authContext } from "../../Context/authContext/authContext";

import { featureContext } from "../../Context/FeatureContext/FeatureContext";
import { toast } from "react-toastify";

export default function SuggestionList() {
  const { authState, filteredUsers, setFilteredUsers } =
    useContext(authContext);
  const { follow } = useContext(featureContext);
  const [following, setFollowing] = useState(false);
  const followingList = authState.singleUserDetail.following;

  const displayFilterList = () => {
    // const followList = authState?.usersList?.filter(
    //   ({ _id }) => _id !== authState.singleUserDetail._id
    // );
    // //console.log(followList);
    // //console.log(authState.singleUserDetail);

    //const isFollowing = authState.singleUserDetail.following.find(({_id}) => _id === )

    const filteredSuggestionList = authState.usersList.reduce((acc, crr) => {
      console.log(followingList?.includes(crr));
      console.log(acc);

      const match = followingList?.find((user) => user._id === crr._id);

      return match ? acc : [...acc, crr];
    }, []);

    console.log(filteredSuggestionList);

    //  setFilteredUsers(filteredSuggestionList);
    setFilteredUsers(
      filteredSuggestionList.filter(
        ({ _id }) => _id !== authState.singleUserDetail._id
      )
    );
  };
  //_id !== authState.singleUserDetail._id
  const searchUser = (e) => {
    const value = e.target.value;

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

  //console.log(authState);
  //console.log(followingList);

  return (
    <div className="suggestionList">
      <input
        className="searchBox"
        placeholder="Search friend"
        onChange={(e) => searchUser(e)}
        type="text"
      />

      <h3 className="suggestionTitle">Suggestions for you</h3>

      {filteredUsers?.map(({ firstName, lastName, username, _id }) => (
        <li style={{ listStyle: "none" }} key={_id}>
          <div className="suggestedUser">
            <Link className="link" to={`/profile/${_id}`}>
              <img
                className="image-pic"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
              />
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
      ))}
    </div>
  );
}
