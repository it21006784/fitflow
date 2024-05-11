import React, { useEffect, useState } from "react";
import { FaUser, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import profilePhoto from "../Images/profile.jpeg";
import UserCheck from "./User/UserCheck";
import "../css/nav.css";
import "../css/workout.css";

function ProfileRightSection({ user, followers }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log("Retrieved user ID:", storedUserId);
  }, []);

  return (
    <div className="right-section">
      <div className="top-icons">
        <Link to="/logout" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon" style={{ position: "absolute", top: "10px", right: "10px" }}>
            <FaSignOutAlt size={20} color="white" />
          </div>
        </Link>
        <Link to="/settings" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon" style={{ position: "absolute", top: "10px", right: "60px" }}>
            <FaCog size={20} color="white" />
          </div>
        </Link>
        <Link to="/notifications" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon" style={{ position: "absolute", top: "10px", right: "110px" }}>
            <FaBell size={20} color="white" />
          </div>
        </Link>
        <Link to={`/profile/${userId}`} style={{ textDecoration: "none" }}>
          <img
            src={profilePhoto}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "20px auto 30px",
              display: "block",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Link>
      </div>
      <div
        className="profile-info"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Description: {user.description}</p>
      </div>
      <div className="followers" style={{ color: "white", textAlign: "left", marginBottom: "20px", marginLeft: "20px" }}>
        Followers: {followers}
      </div>
    </div>
  );
}

export default ProfileRightSection;
