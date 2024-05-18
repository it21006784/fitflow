import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import RightSection from "../components/RightSection";
import axios from "axios";
import "../css/ViewAllWorkouts.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditWorkoutPlan() {
    const navigate = useNavigate();
    const { w_id } = useParams();
    const [error, setError] = useState(null);

    const [workoutPlan, setWorkoutPlan] = useState({
        w_name: "",
        description: "",
        timeDuration: ""
    });

    useEffect(() => {
        console.log("ID :" + w_id);
        fetchWorkoutPlan();
    }, [w_id]);

    const fetchWorkoutPlan = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/workout/${w_id}`);
            if (response.data) {
                setWorkoutPlan({
                    w_name: response.data.w_name || "",
                    description: response.data.description || "",
                    timeDuration: response.data.timeDuration || ""
                });
                console.log(workoutPlan);
            }
        } catch (error) {
            console.error("Error fetching workout plan:", error);
            setError(error);
        }
    };

    const onInputChange = (e) => {
        setWorkoutPlan({ ...workoutPlan, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/api/workout/${w_id}`, workoutPlan);
            alert("Workout plan updated successfully");
            navigate("/ViewAllWorkouts");
        } catch (error) {
            console.error("Error updating workout plan:", error);
            alert("An error occurred while updating the workout plan.");
        }
    };

    const onDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this workout plan?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8081/api/workout/${w_id}`);
                alert("Workout plan deleted successfully");
                navigate("/ViewAllWorkouts");
            } catch (error) {
                console.error("Error deleting workout plan:", error);
                alert("An error occurred while deleting the workout plan.");
            }
        }
    };

    function handleCancel() {
        navigate("/ViewAllWorkouts");
    };

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    return (
        <div className="container">
            <Sidebar />
            <div className="form_box">
                <div>
                    <h1 className="topic">
                        Update <span className="topicsub">Workout Plan</span>
                    </h1>

                    <form onSubmit={onSubmit} className="form_full">
                        <br />
                        <label className="form_label" htmlFor="w_name">
                            Workout Plan Name:
                        </label>
                        <br />
                        <input
                            onChange={onInputChange}
                            type="text"
                            className="form_input"
                            value={workoutPlan.w_name}
                            name="w_name"
                        />
                        <br />
                        <label className="form_label" htmlFor="description">
                            Description:
                        </label>
                        <br />
                        <textarea
                            className="form_input"
                            value={workoutPlan.description}
                            onChange={onInputChange}
                            name="description"
                        ></textarea>
                        <br />
                        <label className="form_label" htmlFor="timeDuration">
                            Time Duration:
                        </label>
                        <br />
                        <input
                            onChange={onInputChange}
                            type="text"
                            className="form_input"
                            value={workoutPlan.timeDuration}
                            name="timeDuration"
                        />
                        <br />
                        <button type="submit" className="update_btn">Update</button>
                        <button type="button" className="delete_btn" onClick={onDelete}>Delete</button>
                        <button className="btn btn-secondary" style={{ marginLeft: '10px' }} type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
            <RightSection />
        </div>
    );
}
