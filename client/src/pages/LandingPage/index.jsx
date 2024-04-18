import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector hook to access Redux state
import { removeAuthData } from "../../features/auth/authSlice";

export default function LandingPage() {
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState && !!authState.accessToken;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuthData());
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          Welcome, User! <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          Please log in to access this page <br />
          <a href="/login">login</a>
        </div>
      )}
    </div>
  );
}
