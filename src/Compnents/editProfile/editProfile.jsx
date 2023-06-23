import "./editProfile.css";

import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext/authContext";

export const EditProfile = (props) => {
  const { authDispatch, authState } = useContext(authContext);
  // const [profileDesc, setProfileDesc] = useState({
  //   bio: "",
  //   title: "",
  //   website: "",
  // });

  if (!props.show) {
    return null;
  }

  const cancelBtn = () => {
    props.onClose();
  };

  const updateDesc = () => {
    authDispatch({ type: "updateDesc" });
    props.onClose();
  };

  return (
    <div className="parentModal">
      <div className="editProfileComponent">
        <p>Title</p>
        <input
          className="input"
          type="text"
          name="title"
          value={authState.descriptionUpdate.title}
          onChange={(e) =>
            authDispatch({ type: "addTitle", payload: e.target.value })
          }
        />
        <p>Bio</p>
        <textarea
          className="textArea"
          name="bio"
          value={authState.descriptionUpdate.bio}
          onChange={(e) =>
            authDispatch({ type: "addBio", payload: e.target.value })
          }
        ></textarea>
        <p>Website/Link</p>
        <input
          className="input"
          type="url"
          name="website"
          value={authState.descriptionUpdate.website}
          onChange={(e) =>
            authDispatch({ type: "addWebsite", payload: e.target.value })
          }
        />

        <div className="editFooter">
          <button onClick={() => cancelBtn()}>Cancel</button>

          <button onClick={() => updateDesc()}>Update</button>
        </div>
      </div>
    </div>
  );
};
