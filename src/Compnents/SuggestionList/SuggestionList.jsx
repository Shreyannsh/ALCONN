import "./SuggestionList.css";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

import { authContext } from "../../Context/authContext/authContext";
import { featureContext } from "../../Context/FeatureContext/FeatureContext";

export default function SuggestionList(props) {
  const { authState, filteredUsers, setFilteredUsers, setIsMobile } =
    useContext(authContext);
  const { follow, unfollow } = useContext(featureContext);
  const [noUserFound, setNoUserFound] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const followingList = authState?.singleUserDetail?.following;

  const followingListId = followingList?.map((follower) => follower._id);

  const searchUser = () => {
    const value =
      props.searchText !== undefined ? props.searchText : searchedText;

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
    }
    //here else part is helping to render the suggestion list when no value is provided in search bar
    else {
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
    setIsMobile(false);
    if (followingListId?.includes(id)) {
      unfollow(id);
      setSearchedText("");
      toast(`Unfollowed ${person.username}`);
    } else {
      follow(id);
      setSearchedText("");
      setFilteredUsers(filteredUsers.filter(({ _id }) => _id !== id));
      toast(`Following ${person.username}`);
    }
  };

  useEffect(() => {
    searchUser();
  }, [props.searchText, searchedText]);

  return (
    <div className="suggestionList">
      <input
        // search bar is defined seprately for mobile
        style={{ display: props.mobile ? "none" : "block" }}
        className="searchBox"
        placeholder="Search friend"
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
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
              <li style={{ listStyle: "none" }} key={username}>
                <div className="suggestedUser">
                  <Link className="linkk" to={`/profile/${username}`}>
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
                      {followingListId?.includes(_id) ? "Following" : "Follow"}
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
