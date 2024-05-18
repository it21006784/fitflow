import React from "react";
import { useNavigate } from "react-router-dom";
import UserCheck from "./UserCheck";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear isLoggedIn flag from local storage
    localStorage.removeItem("isLoggedIn");
    
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="container">
    
      <div className="form_box">
        <div>
          <h1 className="topic">Logout</h1>
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout} className="add_btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
