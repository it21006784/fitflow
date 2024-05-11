import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import RightSection from "../components/RightSection";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
// import UserCheck from "../User/UserCheck";

function UpdateWorkoutStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { statusId } = useParams();


  const [workoutStatus, setWorkoutStatus] = useState({
    date: "",
    distanceRun: "",
    noOfPushups: "",
    weightLifted: "",
    description: "",
   
  });


  useEffect(() => {
    fetchWorkoutStatus();
  }, []);

  const fetchWorkoutStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/currentStatus/${statusId}`);
      setWorkoutStatus(response.data);
    } catch (error) {
      console.error("Error fetching workout status:", error);
    }
  };

  const onInputChange = (e) => {
    setWorkoutStatus({ ...workoutStatus, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/currentStatus/${statusId}`, workoutStatus);
      alert("Workout Status updated successfully");
      navigate("/workoutstatusdetails");
    } catch (error) {
      console.error("Error updating workout status:", error);
      alert("An error occurred while updating the workout status.");
    }
  };

  const onDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workout status?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/currentStatus/${statusId}`);
        alert("Workout Status deleted successfully");
        navigate("/workoutstatusdetails");
      } catch (error) {
        console.error("Error deleting workout status:", error);
        alert("An error occurred while deleting the workout status.");
      }
    }
  };

  return (
    <div className="container">
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}

      <Sidebar />
      <div className="form_box">
        <div>
          <h1 className="topic">
            Update<span className="topicsub"> Workout Status</span>
          </h1>

          <form onSubmit={onSubmit} className="form_full">
          <label className="form_lable" htmlFor="date">
                Date:
            </label>
            <br />
            <input
                onChange={onInputChange}
                type="date"
                className="form_input"
                value={workoutStatus.date}
                required
                name="date"
                placeholder="Enter date"
            />
            <br />
            <label className="form_lable" htmlFor="distanceRan">
                Distance Ran:
            </label>
            <br />
            <input
                onChange={onInputChange}
                type="text"
                className="form_input"
                value={workoutStatus.distanceRun}
                name="distanceRan"
                placeholder="Enter distance ran"
            />
            <br />
            <label className="form_lable" htmlFor="numberOfPushupsCompleted">
                Number of Pushups Completed:
            </label>
            <br />
            <input
                onChange={onInputChange}
                type="text"
                className="form_input"
                value={workoutStatus.noOfPushups}
                name="numberOfPushupsCompleted"
                placeholder="Enter number of pushups completed"
            />
            <br />
            <label className="form_lable" htmlFor="weightLifted">
                Weight Lifted:
            </label>
            <br />
            <input
                onChange={onInputChange}
                type="text"
                className="form_input"
                value={workoutStatus.weightLifted}
                name="weightLifted"
                placeholder="Enter weight lifted"
            />
            <br />
            
            <textarea
                className="form_input"
                value={workoutStatus.description}
                onChange={onInputChange}
                name="description"
                placeholder="Enter description"
            ></textarea>
            <br />
            <button type="submit" className="update_btn">Update</button>
            <button type="button" className="delete_btn" onClick={onDelete}>Delete</button>
            
          </form>
        </div>
      </div>
      <RightSection />
    </div>
  );
}

export default UpdateWorkoutStatus;
