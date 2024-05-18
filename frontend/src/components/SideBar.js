import React, { useState } from "react";
import { FaHome, FaUpload, FaRunning, FaDumbbell, FaUtensils } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import "../css/nav.css";
import "../css/workout.css";

// import UserCheck from "./User/UserCheck";

function SideBar() {
  const location = useLocation(); // Get current location

  // Initialize active tab state based on current pathname
  const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));

  function getActiveTab(pathname) {
    const tabName = pathname.split("/").filter(Boolean)[0]; // Get the first part of pathname
    if (tabName) {
      return tabName.charAt(0).toUpperCase() + tabName.slice(1); // Capitalize the first letter if tabName is not empty
    } else {
      // Return a default tab name or handle the case when pathname doesn't contain any '/'
      return "Home"; // For example, default to "Home" tab
    }
  }
  
  // Function to handle tab click and update active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Sidebar items with icons and corresponding paths
  const sidebarItems = [
    { name: "Home", icon: <FaHome />, path: "/fitflow" },
    { name: "Post Upload", icon: <FaUpload />, path: "/AddMedia" },
    { name: "Workout Status Upload", icon: <FaRunning />, path: "/AddCurrentWorkoutStatus" },
    { name: "Workout Plan Upload" , icon: <FaDumbbell />, path: "/" },
    { name: "Meal Plan Upload", icon: <FaUtensils />, path: "/" }
  ];

  return (
    <div className="sidebar">
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}
      <div className="item_side_bar">
        <div>
          <h1 className="logo">
            Fit<span className="logosub" style={{fontStyle:"italic"}}>Flow</span>
          </h1>
        </div>
        <div className="sideitem">
          {sidebarItems.map((item, index) => (
            <div key={index}>
                <Link to={item.path} onClick={() => handleTabClick(item.name)} style={{ textDecoration: 'none' }}>
                    <h3 className={`item_side ${activeTab === item.name ? "active" : ""}`}>
                        <span style={{ paddingRight: '10px' }}>{item.icon}</span>
                        <span>{item.name}</span>
                    </h3>
                </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
