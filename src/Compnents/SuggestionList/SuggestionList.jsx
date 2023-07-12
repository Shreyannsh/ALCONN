import "./SuggestionList.css";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function SuggestionList(props) {
  const { authState, filteredUsers, setFilteredUsers } =
    useContext(authContext);
  const { follow } = useContext(featureContext);
  const [noUserFound, setNoUserFound] = useState(false);

  const followingList = authState?.singleUserDetail?.following;

  const displayFilterList = () => {
    const filteredSuggestionList = authState.usersList?.reduce((acc, crr) => {
      const match = followingList?.find((user) => user._id === crr._id);

      return match ? acc : [...acc, crr];
    }, []);

    setFilteredUsers(
      filteredSuggestionList?.filter(
        ({ _id }) => _id !== authState.singleUserDetail._id
      )
    );
  };

  const searchUser = (e) => {
    const value =
      props.searchText !== undefined ? props.searchText : e?.target?.value;
    console.log(props.searchText, "props.searchText");
    console.log(value);

    if (value) {
      const searchedUser = authState.usersList.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
      );

      if (searchedUser.length === 0) {
        setNoUserFound(true);
      } else {
        setNoUserFound(false);
      }
      setFilteredUsers(searchedUser);
    } else {
      const followersIds = followingList?.map((user) => user._id);
      const nonFollowedUsers = authState.usersList?.reduce((acc, crr) => {
        if (
          !followersIds?.includes(crr._id) &&
          crr._id !== authState.singleUserDetail._id
        ) {
          acc = [...acc, crr];
        }

        return acc;
      }, []);

      setFilteredUsers(nonFollowedUsers);
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
      <div className="suggestedUserList">
        {filteredUsers?.length !== 0 ? (
          filteredUsers?.map(
            ({ firstName, lastName, username, _id, profilePic }) => (
              <li style={{ listStyle: "none" }} key={_id}>
                <div className="suggestedUser">
                  <Link className="linkk" to={`/profile/${_id}`}>
                    <img className="image-picc" src={profilePic} alt="" />
                    <p className="fullNamee">
                      {firstName} {lastName}
                    </p>
                    <p className="userNamee">@{username}</p>
                  </Link>
                  {authState.singleUserDetail._id !== _id && (
                    <span
                      className="follow-btnn"
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
          )
        ) : noUserFound ? (
          <h3 className="errormsg">No such user is there...</h3>
        ) : (
          <h3 className="errormsg">Followed all</h3>
        )}
      </div>
    </div>
  );
}
