import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  async function handleRegister() {
    const userData = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:3002/register", {
        userData,
      });
     setLoginStatus(response.data.message)
     setDisplay(true)
     setTimeout(()=>{
      setDisplay(false)
     },3000)
     setUsername("")
     setPassword("")
    } catch (err) {
      console.log(err);
    }
  }
  async function handleLogin() {
    const userData = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:3002/login", {
        userData,
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/home");
      }
      const { message, user_id } = response.data;

      console.log("Response:", message);
      console.log("User ID:", user_id);
    } catch (err) {
      if (err.response) {
        console.log(
          "Server responded with error data:",
          err.response.data.error
        );
        setLoginStatus(err.response.data.error);
        setDisplay(true);
        setTimeout(()=>{
      setDisplay(false)
     },3000)
        console.log("Status code:", err.response.status);
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Error during request setup:", err.message);
      }
    }
  }

  return (
    <form id="form1">
      <h2>Login and register</h2>
      <label htmlFor="username1">Username:</label>
      <input
        type="text"
        id="username1"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        name="username1"
        required
      />
      <br />
      <label htmlFor="password1">Password:</label>
      <input
        type="password"
        id="password1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password1"
        required
      />
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        REGISTER
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        LOGIN
      </button>
      {display ? <h2>{loginStatus}</h2> : <h2></h2>}
    </form>
  );
};

export default Login;
