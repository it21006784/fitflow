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

export default function AddCurrentWorkoutStatus() {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [distanceRun, setDistanceRun] = useState("");
    const [noOfPushups, setNoOfPushups] = useState("");
    const [weightLifted, setWeightLifted] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newStatus = {
            date,
            description,
            distanceRun,
            noOfPushups,
            weightLifted
        }

        axios.post("http://localhost:8081/currentStatus", newStatus).then(() => {
            alert("Status added")
            window.location.href = "/ViewAllStatus";
            //swal.fire({
            //     icon: 'success',
            //     title: 'Successfully added!',
            //     showConfirmButton: true,
            //     confirmButtonText: 'Confirm',
            // }).then(() => {
            //     // redirect to another page
            //     window.location.href = "#";
            // });
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div style={{ backgroundColor: "#E6E6EE", height: "785px", width: "1530px", marginTop: "-60px" }}><br/>
        <SideBar/>
            <div className="container" style={{ backgroundColor: "white", width: "900px", marginLeft: "18%", marginRight: "8%", height: "620px", borderRadius: "10px", marginTop: "60px" }}>
                <h3 className="titleStyle" style={{color:"#0F3052"}}><br />ADD CURRENT WORKOUT STATUS</h3>
                <form onSubmit={sendData}>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" id="date" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} placeholder="Enter address" onChange={(e) => {
                            setDate(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="distanceRun">Distance Ran(KM)</label>
                        <input type="text" className="form-control" id="distanceRun" placeholder="Enter distance ran" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} onChange={(e) => {
                            setDistanceRun(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="noOfPushups">No of Pushups</label>
                        <input type="text" className="form-control" id="noOfPushups" placeholder="Enter pushups count" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} onChange={(e) => {
                            setNoOfPushups(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weightLifted">Weight Lifted(KG)</label>
                        <input type="text" className="form-control" id="weightLifted" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} placeholder="Enter lifted weight" onChange={(e) => {
                            setWeightLifted(e.target.value);
                        }} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea style={{ width: "975px", height: "80px", borderColor: "lightgray" }} className="form-control" placeholder="Enter your fitness achievement for the selected date" onChange={(e) => {
                            setDescription(e.target.value);
                        }} required /><br />   
                    </div>


                    <div className="btns">
                        <button className="btn btn-primary" style={{backgroundColor: '#3C6EA7'}} type="submit">Save</button>
                    </div>

                </form>
            </div>
            <RightSection/>
        </div>
    )
}
