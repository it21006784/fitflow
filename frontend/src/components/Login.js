import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const storeUserIdInLocalStorage = (userId) => {
    localStorage.setItem("userId", userId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/users/login", {
        username,
        password,
      });

      console.log("Login response:", response);

      if (response && response.data) {
        const userData = response.data;
        console.log("User data:", userData);

        const userId = userData.userId;
        console.log("User ID:", userId);

        storeUserIdInLocalStorage(userId);

        localStorage.setItem("isLoggedIn", "true");

        const now = new Date();
        const expirationTime = now.getTime() + 3600 * 1000; // 1 hour expiration
        localStorage.setItem("expirationTime", expirationTime);

        alert("Login successful");
        navigate("/");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <div>
          <h1 className="login-topic">Login</h1>
          <form onSubmit={onSubmit} className="login-form-full">
            <label className="login-form-label" htmlFor="email">
              UserName:
            </label>
            <br />
            <input
              type="text"
              className="login-form-input"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <br />
            <label className="login-form-label" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              type="password"
              className="login-form-input"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <br />
            <button type="submit" className="login-add-btn">
              Login
            </button>
          </form>
          <p className="login-signup-text">
            Don't have an account?{" "}
            <a href="/signup" className="login-signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
