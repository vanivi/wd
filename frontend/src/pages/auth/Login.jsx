import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="Login">
      <div className="container">
        <div className="headerLogin">
          <p>Sign in or create an account</p>
        </div>
        <div className="emailDiv">
          <p>Username</p>
          <input
            onChange={handleChange}
            className="inputEmail"
            placeholder="username"
            id="username"
            type="text"
          />
        </div>
        <div className="passwordDiv">
          <p>Password:</p>
          <input
            onChange={handleChange}
            className="inputPass"
            id="password"
            type="text"
          />
        </div>
        <div className="btnClass">
          <button onClick={handleClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
