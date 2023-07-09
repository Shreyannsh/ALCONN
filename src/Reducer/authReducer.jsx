export const authReducer = (state, action) => {
  switch (action.type) {
    case "userName":
      return { ...state, userName: action.payload };

    case "loginPassword":
      return { ...state, loginPassword: action.payload };

    case "guestLogin":
      return {
        ...state,
        userName: "Shreyansh007",
        loginPassword: "000011112222",
      };

    case "postList":
      return { ...state, postList: action.payload };

    case "allPostList": {
      return { ...state, allPostList: action.payload };
    }
    case "usersList":
      return { ...state, usersList: action.payload };

    case "singleUserDetail":
      return { ...state, singleUserDetail: action.payload };

    case "bookmarks":
      return { ...state, bookmarks: action.payload };

    case "postContent":
      return { ...state, postContent: action.payload };

    case "editedContent":
      return { ...state, editedContent: action.payload };

    case "update":
      const updatedDescription = {
        bio:
          action.payload.target.name === "bio"
            ? action.payload.target.value
            : "",
        title:
          action.payload.target.name === "title"
            ? action.payload.target.value
            : "",
        website:
          action.payload.target.name === "website"
            ? action.payload.target.value
            : "",
      };
      return { ...state, descriptionUpdate: updatedDescription };

    case "addTitle": {
      return {
        ...state,
        descriptionUpdate: {
          ...state.descriptionUpdate,
          title: action.payload,
        },
      };
    }

    case "addBio": {
      return {
        ...state,
        descriptionUpdate: {
          ...state.descriptionUpdate,
          bio: action.payload,
        },
      };
    }

    case "addWebsite": {
      return {
        ...state,
        descriptionUpdate: {
          ...state.descriptionUpdate,
          website: action.payload,
        },
      };
    }

    case "updateDesc":
      const updatedUser = state.usersList.map((user) => {
        if (user._id === state.singleUserDetail._id) {
          return {
            ...user,
            title: state.descriptionUpdate.title,
            bio: state.descriptionUpdate.bio,
            website: state.descriptionUpdate.website,
            profilePic: action.payload,
          };
        } else {
          return user;
        }
      });
      return {
        ...state,
        usersList: updatedUser,
      };

    case "prevDesc": {
      return {
        ...state,
        descriptionUpdate: {
          title: state.singleUserDetail.title,
          bio: state.singleUserDetail.bio,
          website: state.singleUserDetail.website,
        },
      };
    }

    //signUp Info

    case "signUpFirstName":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, firstName: action.payload },
      };

    case "signUpLastName":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, lastName: action.payload },
      };

    case "signUpUserName":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, username: action.payload },
      };

    case "signUpEmailAddress":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, emailAddress: action.payload },
      };

    case "signUpPassword":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, password: action.payload },
      };

    case "signUpRePassword":
      return {
        ...state,
        signUpDetails: { ...state.signUpDetails, rePassword: action.payload },
      };

    default:
      return state;
  }
};
