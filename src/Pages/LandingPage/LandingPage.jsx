import { useContext } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { authContext } from "../../Context/authContext/authContext";

import { toast } from "react-toastify";

export default function LandingPage() {
  const { authState, authDispatch, login } = useContext(authContext);

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
      <div>
        <h1>ALCONN</h1>
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
            type="password"
            placeholder="Password"
          />
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
