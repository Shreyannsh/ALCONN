import "./SignUpPage.css";

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { authContext } from "../../../Context/authContext/authContext";

export default function SignUpPage() {
  const { authDispatch, authState, signUp } = useContext(authContext);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const showPasswordFunc = (value) => {
    if (value === "one") {
      setShowPassword1(!showPassword1);
    }
    if (value === "two") {
      setShowPassword2(!showPassword2);
    }
  };

  const signUpBtn = () => {
    const signUpValues = Object.values(authState.signUpDetails).includes("");

    if (signUpValues) {
      toast.error(" Enter all fields to signup ");
    } else {
      signUp();
    }
  };

  return (
    <div className="parent">
      <h1>ALCONN</h1>

      <div className="signUpPage">
        <p className="subHeading">Create a new account</p>

        <div className="fullname">
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
          type="email"
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
          type={showPassword1 ? "text" : "password"}
          onChange={(e) =>
            authDispatch({ type: "signUpPassword", payload: e.target.value })
          }
          className="input"
          placeholder="Password"
        />
        <div className="hidePasswordComponentSignUp">
          {showPassword1 ? (
            <span className="eyeIcon">
              <BsFillEyeFill onClick={() => showPasswordFunc("one")} />
            </span>
          ) : (
            <span className="eyeIcon">
              <BsFillEyeSlashFill onClick={() => showPasswordFunc("one")} />
            </span>
          )}
        </div>

        <input
          type={showPassword2 ? "text" : "password"}
          onChange={(e) =>
            authDispatch({ type: "signUpRePassword", payload: e.target.value })
          }
          className="input"
          placeholder="Confirm Password"
        />
        <div className="hidePasswordComponentSignUp2">
          {showPassword2 ? (
            <span className="eyeIcon">
              <BsFillEyeFill onClick={() => showPasswordFunc("two")} />
            </span>
          ) : (
            <span className="eyeIcon">
              <BsFillEyeSlashFill onClick={() => showPasswordFunc("two")} />
            </span>
          )}
        </div>

        <p className="footerContext">
          By clicking Sign Up, you agree to our{" "}
          <span className="blue">Terms, Privacy Policy</span> and{" "}
          <span className="blue">Cookies Policy</span>. You may receive SMS
          notifications from us and can opt out at any time.
        </p>

        <p className="signupBtn" onClick={() => signUpBtn()}>
          Sign Up
        </p>
        <Link className="alreadyHaveAnAccount" to="/">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
