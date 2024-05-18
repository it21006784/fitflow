import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import "../css/workout.css";
import '../css/AddCurrentStatus.css'; 
import SideBar from "../components/SideBar";
import swal from 'sweetalert';
import addStatusBG from '../Images/cardBG.jpg';

export default function AddCurrentWorkoutStatus() {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [distanceRun, setDistanceRun] = useState("");
    const [noOfPushups, setNoOfPushups] = useState("");
    const [weightLifted, setWeightLifted] = useState("");
    const userId = localStorage.getItem("userId");

    function sendData(e) {
        e.preventDefault();

        const newStatus = {
            date,
            description,
            distanceRun,
            noOfPushups,
            weightLifted,
            username: localStorage.getItem("username")
        }

    axios.post(`http://localhost:8081/currentStatus/${userId}`, newStatus)
    .then(() => {
        swal({
            icon: 'success',
            title: 'Status added successfully!',
            showConfirmButton: true,
            confirmButtonText: 'Confirm',
        }).then(() => {
            // redirect to another page
            window.location.href = "/ViewAllStatus";
        });
    })
    .catch((err) => {
        alert(err);
    });

    };

    return (
        <div style={{ backgroundColor: "#E6E6EE", height: "785px", width: "1500px", marginTop: "-60px", marginLeft: "80px" }}><br/>
        <SideBar/>
        <h5 style={{ marginTop: "40px", marginLeft: "300px", marginTop: "70px", color: "#884766", fontFamily:"initial"}}>ADD CURRENT WORKOUT STATUS</h5>
        <div className="container" style={{  width: "800px", marginLeft: "19%", marginRight: "8%", height: "620px", borderRadius: "10px", marginTop: "10px", backgroundImage: `url(${addStatusBG})`}}>
            
                <form onSubmit={sendData} style={{ marginTop: "30px", marginLeft: "100px" }}>
       
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" id="date" style={{ width: "600px", height: "40px", borderColor: "lightgray" }} placeholder="Enter address" onChange={(e) => {
                            setDate(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="distanceRun">Distance Ran(KM)</label>
                        <input type="text" className="form-control" id="distanceRun" placeholder="Enter distance ran" style={{ width: "600px", height: "40px", borderColor: "lightgray" }} onChange={(e) => {
                            setDistanceRun(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="noOfPushups">No of Pushups</label>
                        <input type="text" className="form-control" id="noOfPushups" placeholder="Enter pushups count" style={{ width: "600px", height: "40px", borderColor: "lightgray" }} onChange={(e) => {
                            setNoOfPushups(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weightLifted">Weight Lifted(KG)</label>
                        <input type="text" className="form-control" id="weightLifted" style={{ width: "600px", height: "40px", borderColor: "lightgray" }} placeholder="Enter lifted weight" onChange={(e) => {
                            setWeightLifted(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea style={{ width: "600px", height: "80px", borderColor: "lightgray" }} className="form-control" placeholder="Enter your fitness achievement for the selected date" onChange={(e) => {
                            setDescription(e.target.value);
                        }} required /><br />   
                    </div>


                    <div className="btns">
                        <button className="btn btn-primary" style={{backgroundColor: '#884766'}} type="submit">Save</button>
                    </div>

                </form>
            </div>
            <RightSection/>
        </div>
    )
}
