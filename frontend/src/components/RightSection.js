import React, { useEffect, useState } from "react";
import { FaUser, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/nav.css";
import "../css/workout.css";


function RightSection({ followers }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log("Retrieved user ID:", storedUserId);
    
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="right-section">
      {/* Icons container */}
      <div className="icons-container">
        {/* Logout icon */}
        <Link to="/logout" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon"><FaSignOutAlt size={20} color="white" /></div>
        </Link>
        {/* Setting icon */}
        <Link to="/settings" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon"><FaCog size={20} color="white" /></div>
        </Link>
        {/* Notification icon */}
        <Link to="/notifications" style={{ textDecoration: "none", color: "white" }}>
          <div className="icon"><FaBell size={20} color="white" /></div>
        </Link>
        {/* Profile icon */}
        <Link to={`/profile/${userId}`}  style={{ textDecoration: "none", color: "white" }}>
          <div className="icon"><FaUser size={20} color="white" /></div>
        </Link>
      </div>
      {/* Search bar */}
      <input type="text" placeholder="Search..." className="search-bar" style={{ width: "100%", padding: "10px", marginTop: "20px" }} />
      {/* Follower count */}
      <div className="followers" style={{ color: "white", textAlign: "left", marginTop: "20px", marginLeft: "20px" }}>Followers: {followers}</div>
    </div>
  );
}

export default RightSection;
