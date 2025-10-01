import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutLocal } from "../../features/auth/authSlice";
import "./Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  const token = useSelector(s => s.auth.token);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(logoutLocal());
      setMessage("You have been logged out\nThank you for using College Dashboard.");
    } else {
      setMessage("You haven’t created an account. Create an account to write reviews or add favorite colleges.");
    }
  }, [dispatch, token]);

  return (
    <main className="logout-wrap">
      <pre style={{ whiteSpace:"pre-wrap", textAlign:"center" }}>{message}</pre>
    </main>
  );
};

export default Logout;
