import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditWorkoutPlan() {
    const [workout, setWorkout] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the current workout by its ID
        axios.get(`http://localhost:8081/api/workout/${id}`)
            .then(response => {
                setWorkout(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Send a PUT request to update the status
        axios.put(`http://localhost:8081/api/workout/${id}`, workout)
            .then(response => {
                console.log("Status updated successfully:", response.data);
            })
            .catch(error => {
                setError(error);
            });
    };

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    return (
        <div className="container mt-4">
            <h3>Update Workout Plans</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Workout Name:</label>
                    <input type="text" className="form-control" id="w_name" name="w_name" value={workout.w_name || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Workout Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={workout.description || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="distanceRun">Time Duration:</label>
                    <input type="text" className="form-control" id="timeDuration" name="timeDuration" value={workout.timeDuration || ''} onChange={handleChange} />
                </div>
            
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}