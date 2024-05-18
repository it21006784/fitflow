import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import '../css/Login.css';

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
        navigate("/fitflow");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=1008104272492-dbuhd97q8qpgmhips3nt4i0n9vr06l0u.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Foauth2%2Fcode%2Fgoogle&response_type=code&scope=openid%20profile%20email&state=UUID.randomUUID().toString()&access_type=offline&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow"
    
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
          <center>
            <br></br>
          <button onClick={handleGoogleLogin} className="google-login-btn">
            <FcGoogle /> Sign in with Google
            <FcGoogle /> Sign in with Google
          </button>
          </center>
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

export default Login;