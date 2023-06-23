export const authReducer = (state, action) => {
  switch (action.type) {
    case "userName":
      return { ...state, userName: action.payload };

    case "loginPassword":
      return { ...state, loginPassword: action.payload };

    case "guestLogin":
      return { ...state, userName: "shreyansh", loginPassword: "00001111" };

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
      //console.log(updatedDescription);
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
      return {
        ...state,
        singleUserDetail: {
          ...state.singleUserDetail,
          title: state.descriptionUpdate.title,
          bio: state.descriptionUpdate.bio,
          website: state.descriptionUpdate.website,
        },
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

    default:
      return state;
  }
};
