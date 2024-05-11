import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import '../css/ViewAllWorkouts.css'
import { useParams, Link } from "react-router-dom";

export default function ViewAllWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/workout`)
            .then(response => {
                setWorkouts(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    const handleDelete = (w_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8081/api/workout/${w_id}`)
                .then(response => {
                    console.log('Deleted workout with ID:', w_id);
                    // Handle success
                })
                .catch(error => {
                    console.error('Error deleting workout:', error);
                    // Handle error
                });
        }
        window.location.href = "/";
    };

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    return (
        <div>
          {/* <UserCheck userId={localStorage.getItem("userId")} /> */}
    
          <NavBar />
          <div className="container">
            <Sidebar />
            <div className="content">
              {workouts.map((workout) => (
                <div key={workout.id} className="card-container">
                  {/* Username */}
                  {/* <p className="username">{workout.w_name}</p> */}
                  {/* Description */}
                  <p className="username">{workout.w_name}</p>
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
          </div>
        </div>
      );
}