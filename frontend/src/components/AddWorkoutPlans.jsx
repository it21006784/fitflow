import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import RightSection from "../components/RightSection";
import axios from "axios";
import '../css/ViewAllWorkouts.css';

export default function AddWorkoutPlans() {
    const navigate = useNavigate();
    const [w_name, setName] = useState("");
    const [u_name, setUname] = useState("");
    const [u_id, setUid] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setUid(userId);

            // Fetch the username by its ID
            axios.get(`http://localhost:8081/users/${userId}`)
                .then(response => {
                    setUname(response.data.username);
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, []);

    function sendData(e) {
        e.preventDefault();

        const newWorkout = {
            u_id,
            u_name,
            w_name,
            description,
            timeDuration,
        };

        axios.post("http://localhost:8081/api/workout", newWorkout)
            .then(response => {
                console.log(response);
                alert("Workout added successfully");
                navigate("/ViewAllWorkouts"); // Redirect after adding workout
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });
    };

    function handleCancel() {
        navigate("/ViewAllWorkouts");
    }

    return (
        <div>
            <NavBar />
        <div style={{ backgroundColor: "#E6E6EE", height: "785px", width: "1530px", marginTop: "-60px" }}><br />
        
        <Sidebar />
            <div className="container" style={{ backgroundColor: "white", width: "1000px", marginLeft: "18%", marginRight: "8%", height: "620px", borderRadius: "10px", marginTop: "60px" }}>
            <h5 style={{ marginTop: "40px", marginLeft: "300px", marginTop: "70px", color: "#884766", fontFamily:"initial"}}>ADD WORKOUT PLAN</h5>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label htmlFor="Wname">Workout Name</label>
                        <input type="text" className="form-control" id="Wname" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} placeholder="Enter Workout Plan Name" onChange={(e) => {
                            setName(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea style={{ width: "975px", height: "80px", borderColor: "lightgray" }} className="form-control" id="description" placeholder="Enter Workout Plan Description" onChange={(e) => {
                            setDescription(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeDuration">Time Duration</label>
                        <textarea style={{ width: "700px", height: "80px", borderColor: "lightgray" }} className="form-control" id="timeDuration" placeholder="Enter Time Duration for the Workout Plan" onChange={(e) => {
                            setTimeDuration(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="btns">
                        <button className="btn btn-primary" style={{ backgroundColor: '#3C6EA7' }} type="submit">Save</button>
                        <button className="btn btn-secondary" style={{ marginLeft: '10px' }} type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                <RightSection />
            </div>
        </div>
        </div>
    );
}
