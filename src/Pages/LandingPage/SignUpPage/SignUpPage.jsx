import { useContext } from "react";
import "./SignUpPage.css";

import { Link } from "react-router-dom";
import { authContext } from "../../../Context/authContext/authContext";

export default function SignUpPage() {
  const { authDispatch, authState, signUp } = useContext(authContext);

  return (
    <div className="parent">
      <h1 className="title">ALCONN</h1>

      <div className="signUpPage">
        <p className="subHeading">Create a new account</p>

        <div className="fullName">
          <input
            onChange={(e) =>
              authDispatch({ type: "signUpFirstName", payload: e.target.value })
            }
            className="firstName"
            placeholder="First Name"
          />
          <input
            onChange={(e) =>
              authDispatch({ type: "signUpLastName", payload: e.target.value })
            }
            className="lastName"
            placeholder="Last Name"
          />
        </div>

        <input
          onChange={(e) =>
            authDispatch({
              type: "signUpEmailAddress",
              payload: e.target.value,
            })
          }
          className="input"
          placeholder="Email Address"
        />
        <input
          onChange={(e) =>
            authDispatch({ type: "signUpUserName", payload: e.target.value })
          }
          className="input"
          placeholder="Username"
        />
        <input
          onChange={(e) =>
            authDispatch({ type: "signUpPassword", payload: e.target.value })
          }
          className="input"
          placeholder="Password"
        />
        <input
          onChange={(e) =>
            authDispatch({ type: "signUpRePassword", payload: e.target.value })
          }
          className="input"
          placeholder="Confirm Password"
        />

        <p className="footerContext">
          By clicking Sign Up, you agree to our{" "}
          <span className="blue">Terms, Privacy Policy</span> and{" "}
          <span className="blue">Cookies Policy</span>. You may receive SMS
          notifications from us and can opt out at any time.
        </p>

        <p className="signupBtn" onClick={() => signUp()}>
          Sign Up
        </p>
        <Link className="alreadyHaveAnAccount" to="/">
          Alreay have an account?
        </Link>
      </div>
    </div>
  );
}
