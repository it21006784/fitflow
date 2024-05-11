import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  const { name, username, age, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        console.log("Submitting form data:", formData);
        const response = await axios.post("http://localhost:8081/users/register", {
          name,
          username,
          age,
          email,
          password,
        });
        if (response && response.data) {
          alert("Sign up successful");
          console.log(response.data);
          navigate("/"); // Redirect to login page after successful sign up
        } else {
          alert("Unexpected response from server");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Sign up error:", error.response.data.message);
          alert("Sign up failed: " + error.response.data.message);
        } else {
          console.error("Sign up error:", error.message);
          alert("Sign up failed: " + error.message);
        }
      }
    }
  };
  

  return (
    <div className="sign-container">
      <div className="sign-form-box">
        <div className="sign-form-img"></div>
        <div className="sign-form-content">
          <h1 className="sign-topic">Sign Up</h1>
          <form onSubmit={onSubmit} className="sign-form-full">
          <label className="sign-form-label" htmlFor="name">
              Full Name:
            </label>
            <br />
            <input
              type="text"
              className="sign-form-input"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <br />
            <label className="sign-form-label" htmlFor="name">
              Username:
            </label>
            <br />
            <input
              type="text"
              className="sign-form-input"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <br />
            <label className="sign-form-label" htmlFor="age">
              Age:
            </label>
            <br />
            <input
              type="age"
              className="sign-form-input"
              id="age"
              name="age"
              value={age}
              onChange={onChange}
              required
            />
            <br />
            <label className="sign-form-label" htmlFor="email">
              Email:
            </label>
            <br />
            <input
              type="email"
              className="sign-form-input"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <br />
            <label className="sign-form-label" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              type="password"
              className="sign-form-input"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <br />
            <label className="sign-form-label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <br />
            <input
              type="password"
              className="sign-form-input"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
            />
            <br />
          
            <button type="submit" className="sign-add-btn">
              Sign Up
            </button>
            <p className="sign-login-text">
              Already have an account? <Link to="/" className="sign-login-link">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
