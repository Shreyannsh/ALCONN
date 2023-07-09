import "./ProfileOption.css";

import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { toast } from "react-toastify";

import { authContext } from "../../Context/authContext/authContext";

export default function ProfileOption() {
  const { authState, setIsLogin } = useContext(authContext);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const profileOption = () => {
    setShow(!show);
  };

  const profilePage = () => {
    setShow(!show);
  };

  const signOut = () => {
    navigate("/");
    setIsLogin(false);
    toast("Successfully Logged Out");
  };

  const loggedInUser = authState.usersList.find(
    (user) => user._id === authState.singleUserDetail._id
  );

  return (
    <div className="profileOptionSection">
      <div onClick={() => profileOption()} className="profileOption">
        <img className="image-pic" src={loggedInUser?.profilePic} alt="Pic" />
        <p className="profileName">{authState?.singleUserDetail?.firstName}</p>
        <span className="arrow">
          {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      <div
        style={{ display: show ? "block" : "none" }}
        className="profileDropDown"
      >
        <div className="profile" onClick={() => profilePage()}>
          <Link
            className="link"
            to={`/profile/${authState.singleUserDetail._id}`}
          >
            <span className="icon">
              <BsFillPersonFill />
            </span>
            Profile
          </Link>
        </div>
        <p onClick={() => signOut()} className="signout">
          <span className="icon">
            <GoSignOut />
          </span>
          Signout
        </p>
      </div>
    </div>
  );
}
