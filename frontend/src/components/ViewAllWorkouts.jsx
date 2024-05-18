import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import '../css/ViewAllWorkouts.css';
import { Link } from "react-router-dom";

export default function ViewAllWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/workout`)
            .then(response => {
                setWorkouts(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    return (
        <div>
            <NavBar />
            <div className="container">
                <Sidebar />
                <div className="content">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="card-container">
                            <p className="username">{workout.u_name}</p>
                            <div className="card">
                                <div className="card-content">
                                    <div className="workout-details-container">
                                        <p className="workout-name">{workout.w_name}</p>
                                        <div className="workout-details">
                                            <p>Description: {workout.description}</p>
                                            <p>Time Duration: {workout.timeDuration}</p>
                                            <p>Likes: {workout.likes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="like-comment">
                                <button className="like-btn"><FaHeart /></button>
                                <button className="comment-btn"><FaComment /></button>
                                <Link to={`/EditWorkoutPlan/${workout.id}`} className="edit-btn"><FaEdit /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
