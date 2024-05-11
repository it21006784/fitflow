import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import "../css/workout.css";

// import UserCheck from "../User/UserCheck";

function DisplayWorkoutStatus() {
  const [workoutstatus, setWorkoutStatus] = useState([]);
  const [followers, setFollowers] = useState(0); // Assuming you fetch follower count

  const { statusId } = useParams();
  const [selectedImage, setSelectedImage] = useState(""); // State to store the selected image URL

  useEffect(() => {
    loadWorkoutStatus();
    // Load follower count
    // Example:
    // setFollowers(fetchFollowerCount());
  }, []);

  const loadWorkoutStatus = async () => {
    try {
      const result = await axios.get("http://localhost:8081/currentStatus");
      setWorkoutStatus(result.data);
      if (result.data.length > 0) {
        setSelectedImage(result.data[0].selectedImage);
      }
    } catch (error) {
      console.error("Error loading workout status:", error);
    }
  };

  return (
    <div>
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}

      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="content">
          {workoutstatus.map((workout, index) => (
            <div key={index} className="card-container">
              {/* Username */}
              <p className="username">{workout.username}</p>
              {/* Description */}
              <p className="description">{workout.description}</p>
              {/* Card */}
              
              <div className="card"> {/* style={{ backgroundImage: `url(${workout.selectedImage})` }}*/}
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
                <Link to={`/UpdateStatus/${workout.statusId}`} className="edit-btn"><FaEdit /></Link>
              </div>
            </div>
          ))}
        </div>
        <RightSection followers={followers} />
      </div>
    </div>
  );

}

export default DisplayWorkoutStatus;
