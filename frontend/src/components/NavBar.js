import React, { useState } from "react";
// import UserCheck from "./User/UserCheck";
import "../css/nav.css";
import "../css/workout.css";


function NavBar() {
  const [activeTab, setActiveTab] = useState("Workout Status");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Define the routes for each tab
    let route;
    switch (tab) {
      case "Posts":
        route = "/MediaList";
        break;
      case "Workout Status":
        route = "/ViewAllStatus";
        break;
      case "Workout Plan":
        route = "/ViewAllWorkouts";
        break;
      case "Meal Plan":
        route = "/Viewmealplan";
        break;
      default:
        route = "#";
    }
    // Navigate to the corresponding route
    window.location.href = route;
  };

  return (
    <div className="navbar">
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}

      <div className="nav-tabs">
        <h3 className={`nav-tab ${activeTab === "Posts" ? "active" : ""}`} onClick={() => handleTabClick("Posts")}>Posts</h3>
        <h3 className={`nav-tab ${activeTab === "Workout Status" ? "active" : ""}`} onClick={() => handleTabClick("Workout Status")}>Workout Status</h3>
        <h3 className={`nav-tab ${activeTab === "Workout Plan" ? "active" : ""}`} onClick={() => handleTabClick("Workout Plan")}>Workout Plan</h3>
        <h3 className={`nav-tab ${activeTab === "Meal Plan" ? "active" : ""}`} onClick={() => handleTabClick("Meal Plan")}>Meal Plan</h3>
      </div>
    </div>
  );
}

export default NavBar;
