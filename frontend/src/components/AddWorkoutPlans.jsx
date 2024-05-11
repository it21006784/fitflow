import React, { useState } from "react";
import axios from "axios";
import '../css/ViewAllWorkouts.css'

export default function AddWorkoutPlans() {
    const [w_name, setName] = useState("");
    const [u_name, setUname] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [description, setDescription] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newWorkout = {
            u_name,
            w_name,
            description,
            timeDuration
        }

        axios.post("http://localhost:8081/api/workout", newWorkout).then(() => {
            alert("Status added")
            window.location.href = "/";
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div style={{ backgroundColor: "#E6E6EE", height: "785px", width: "1530px", marginTop: "-60px" }}><br/>
            <div className="container" style={{ backgroundColor: "white", width: "1000px", marginLeft: "18%", marginRight: "8%", height: "620px", borderRadius: "10px", marginTop: "60px" }}>
                <h3 className="titleStyle" style={{color:"#0F3052"}}><br />ADD NEW WORKOUT PLANS</h3>
                <form onSubmit={sendData}>

                <div className="form-group">
                        <label htmlFor="name">User Name</label>
                        <input type="text" className="form-control" id="Uname" style={{ width: "975px", height: "40px", borderColor: "lightgray" }}  placeholder="Enter User Name" onChange={(e) => {
                            setUname(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Workout Name</label>
                        <input type="text" className="form-control" id="Wname" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} placeholder="Enter Workout Plan Name" onChange={(e) => {
                            setName(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea style={{ width: "975px", height: "80px", borderColor: "lightgray" }} className="form-control" placeholder="Enter Workout Plan Description" onChange={(e) => {
                            setDescription(e.target.value);
                        }} required /><br />   
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Time Duration</label>
                        <textarea style={{ width: "975px", height: "80px", borderColor: "lightgray" }} className="form-control" placeholder="Enter Time Duration for the Workout Plan" onChange={(e) => {
                            setTimeDuration(e.target.value);
                        }} required /><br />   
                    </div>


                    <div className="btns">
                        <button className="btn btn-primary" style={{backgroundColor: '#3C6EA7'}} type="submit">Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}