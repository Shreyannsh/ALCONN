import "./LandingPage.css";

import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { authContext } from "../../Context/authContext/authContext";

export default function LandingPage() {
  const { authState, authDispatch, login } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordFunc = () => {
    setShowPassword(!showPassword);
  };

  const guestLogin = () => {
    authDispatch({ type: "guestLogin" });
  };

  const loginBtn = () => {
    if (!authState.userName || !authState.loginPassword) {
      toast.error("Invaild Credentials");
    } else {
      login();
    }
  };

  return (
    <div className="landingPage">
      <div className="landingImage">
        <img className="landingPageImage" src="../../assets/blue.png" alt="" />
        <p>
          <i>Stay Always Connceted</i>
        </p>
      </div>
      <div className="login-section">
        <h1 className="brandNameLanding">ALCONN</h1>
        <div className="loginPage">
          <p className="loginTitle">Login to Alconn</p>
          <p onClick={() => guestLogin()} className="guestLogin">
            Guest Login
          </p>
          <input
            onChange={(e) =>
              authDispatch({ type: "userName", payload: e.target.value })
            }
            value={authState.userName}
            className="email"
            type="email"
            placeholder="Email address"
          />

          <input
            onChange={(e) =>
              authDispatch({ type: "loginPassword", payload: e.target.value })
            }
            value={authState.loginPassword}
            className="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <div className="hidePasswordComponent">
            {showPassword ? (
              <span className="eyeIcon">
                <BsFillEyeFill onClick={() => showPasswordFunc()} />
              </span>
            ) : (
              <span className="eyeIcon">
                <BsFillEyeSlashFill onClick={() => showPasswordFunc()} />
              </span>
            )}
          </div>

          <button onClick={() => loginBtn()} className="login-btn">
            Log in
          </button>
          <div className="loginFooter">
            {" "}
            <p className="forgottenAccount">Forgotten password?</p>{" "}
            <Link to="/signup" className="signup">
              Sign up for Alconn
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
