import { useContext } from "react";
import { authContext } from "../../Context/authContext/authContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const { isLogin } = useContext(authContext);
  const location = useLocation();

  const token = localStorage.getItem("encodedToken");

  return (
    <div>
      {token ? children : <Navigate to="/" state={{ from: location }} />}
    </div>
  );
}
