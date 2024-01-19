import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const userData = {
      username: username,
      password: password,
    };
    try {
      await axios.post("http://localhost:3002/register", { userData });
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
      await axios.post("http://localhost:3002/login", { userData });
    } catch (err) {
      console.log(err);
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
      <button onClick={handleRegister}>REGISTER</button>
      <button onClick={handleLogin}>LOGIN</button>
    </form>
  );
};

export default Login;
