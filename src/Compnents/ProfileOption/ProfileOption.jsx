import "./ProfileOption.css";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext/authContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";

export default function ProfileOption() {
  const { authState } = useContext(authContext);

  const [show, setShow] = useState(false);

  const profileOption = () => {
    setShow(!show);
  };

  const profilePage = () => {
    setShow(!show);
  };

  console.log(authContext.singleUserDetail);

  return (
    <div className="profileOptionSection">
      <div onClick={() => profileOption()} className="profileOption">
        <img
          className="image-pic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU"
          alt="Pic"
        />
        <p className="profileName">{authState.singleUserDetail.firstName}</p>
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
        <p className="signout">
          <span className="icon">
            <GoSignOut />
          </span>
          Signout
        </p>
      </div>
    </div>
  );
}