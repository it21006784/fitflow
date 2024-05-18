import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import RightSection from "../components/RightSection";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'; // Import SweetAlert
// import UserCheck from "../User/UserCheck";
import addStatusBG from "../Images/addStatusBG.jpg";

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
      await axios.put(`http://localhost:8081/currentStatus`, workoutStatus);
      swal({
        icon: 'success',
        title: 'Workout Status updated successfully!',
        text: 'Your workout status has been updated.',
        button: 'OK',
      });
      navigate("/ViewUserStatus");
    } catch (error) {
      console.error("Error updating workout status:", error);
      swal({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the workout status.',
        button: 'OK',
      });
    }
  };

  const onDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workout status?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/currentStatus/${statusId}`);
        swal({
          icon: 'success',
          title: 'Workout Status deleted successfully!',
          button: 'OK',
        });
        navigate("/ViewUserStatus");
      } catch (error) {
        console.error("Error deleting workout status:", error);
        swal({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the workout status.',
          button: 'OK',
        });
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#E6E6EE", height: "785px", width: "1530px", marginTop: "-10px", marginLeft: "10px" }}><br/>
    <div className="container">
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}

      <Sidebar />

      <div><h1 className="topic" style={{backgroundColor: "#E6E6EE", marginLeft: "440px"}}>
            Update Workout Status
          </h1></div>
      <div className="form_box" style={{marginLeft: "-350px", backgroundColor: "white", marginTop: "70px"}}>
        <div>

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
              name="distanceRun"
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
              name="noOfPushups"
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
    </div>
  );
}

export default UpdateWorkoutStatus;
