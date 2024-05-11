import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../css/ViewCurrentStatus.css';

export default function ViewCurrentWorkoutStatus() {
    const [status, setStatus] = useState({});
    const [error, setError] = useState();
    const { statusId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/currentStatus/${statusId}`)
            .then(response => {
                setStatus(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [statusId]);

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/currentStatus/${statusId}`)
            .then(response => {
                alert("Status deleted successfully.");
                window.location.href = "/ViewAllStatus";
            })
            .catch(error => {
                alert("Error deleting status: " + error.message);
            });
    };

    return (
        <div className="page-wrapper">
            <div className="container mt-4"><br/><br/>
                <div className="post-card">
                    <div className="post-content">
                        <h3 className="post-title">CURRENT WORKOUT STATUS</h3>
                        <div className="post-details">
                            <p><strong>Date:</strong> {status.date}</p>
                            <p><strong>Description:</strong> {status.description}</p>
                            <p><strong>Distance Ran:</strong> {status.distanceRun}KM</p>
                            <p><strong>No of Pushups:</strong> {status.noOfPushups}</p>
                            <p><strong>Weight Lifted:</strong> {status.weightLifted}KG</p><br/>
                            <div className="d-flex justify-content-center">
                                <Link to={`/UpdateStatus/${status.statusId}`} className="btn btn-primary" style={{backgroundColor: '#3C6EA7', marginRight: '20px'}}>Update</Link>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





