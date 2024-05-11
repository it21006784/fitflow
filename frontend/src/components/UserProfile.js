import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileRightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
// import UserCheck from "./UserCheck";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [workoutStatus, setWorkoutStatus] = useState([]);
  const [followers, setFollowers] = useState(0); // Assuming you fetch follower count

  const { id } = useParams(); // Get id from URL params

  useEffect(() => {
    loadUserDetails();
    loadWorkoutStatus();
    // Load follower count
    // Example:
    // setFollowers(fetchFollowerCount());
  }, [id]); // Add id as dependency

  const loadUserDetails = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/users/${id}`);
      console.log(result);
      setUserDetails(result.data);
    } catch (error) {
      console.error("Error loading user details:", error);
    }
  };

  const loadWorkoutStatus = async () => {
    try {
      const result = await axios.get("http://localhost:8081/currentStatus");
      setWorkoutStatus(result.data.filter(workout => workout.userId === id));
    } catch (error) {
      console.error("Error loading workout status:", error);
    }
  };

  return (
    <div>
      {/* <UserCheck />  */}
      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="content">

          {/* Display workout status */}
        {workoutStatus.map((workout, index) => (
          <div key={index} className="card-container">
            {/* Username */}
            <p className="username">{userDetails && userDetails.username}</p> {/* Add conditional rendering check here */}
            {/* Description */}
            <p className="description">{workout.description}</p>
            {/* Card */}
            
            <div className="card"> 
              <div className="card-content">
                {/* Workout details */}
                <div className="workout-details-container">
                  <p>{workout.date}</p>
                  <div className="workout-details">
                    <p>Distance Ran: {workout.distanceRun}</p>
                    <p>No of Pushups: {workout.noOfPushups}</p>
                    <p>Weight Lifted:{workout.weightLifted}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Like and comment buttons */}
            <div className="like-comment">
              <button className="like-btn"><FaHeart /></button>
              <button className="comment-btn"><FaComment /></button>
              <Link to={`/updateworkoutstatus/${workout.id}`} className="edit-btn"><FaEdit /></Link>
            </div>
          </div>
          ))}

        </div>
        <ProfileRightSection user={userDetails} followers={followers}  /> {/* Ensure id is passed as string */}
      </div>
    </div>
  );

}

export default UserProfile;
