import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa";
import "../css/workout.css";

function DisplayWorkoutStatus() {
  const [workoutstatus, setWorkoutStatus] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [commentText, setCommentText] = useState("");
  const { statusId } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [showCommentInput, setShowCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadWorkoutStatus();
  }, []);

  const loadWorkoutStatus = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/currentStatus/user/${userId}`);
      setWorkoutStatus(result.data);
      if (result.data.length > 0) {
        setSelectedImage(result.data[0].selectedImage);
      }
    } catch (error) {
      console.error("Error loading workout status:", error);
    }
  };

  const handleLike = async (statusId) => {
    try {
      await axios.post(`http://localhost:8081/currentStatus/${statusId}/like`);
      loadWorkoutStatus();
    } catch (error) {
      console.error("Error liking workout status:", error);
    }
  };

  const handleCommentSubmit = async (statusId) => {
    try {
      await axios.post(`http://localhost:8081/currentStatus/${statusId}/comment`, {
        commentId: "cmt" + new Date().getTime(),
        userId: "66438e5f82c90660c83a4acd",
        content: commentText,
        date: new Date().toISOString(),
      });
      setCommentText("");
      loadWorkoutStatus();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleCommentInput = (statusId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [statusId]: !prev[statusId],
    }));
  };

  const toggleComments = (statusId) => {
    setShowComments((prev) => ({
      ...prev,
      [statusId]: !prev[statusId],
    }));
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="content">
          {workoutstatus.map((workout, index) => (
            <div key={index} className="card-container">
              <div className="user-details">
                <img
                  src={`https://ui-avatars.com/api/?name=${workout.username}&background=random&size=40`}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <p className="username">@ {workout.username}</p>
              </div>
              <p className="description" style={{ fontFamily: "cursive", marginTop: "50px", marginLeft: "-60px" }}>{workout.description}</p>
              <div className="card">
                <div className="card-content">
                  <div className="workout-details-container">
                    <p>{workout.date}</p>
                    <div className="workout-details">
                      <p>Distance Ran : {workout.distanceRun}km</p>
                      <p>No of Pushups : {workout.noOfPushups}</p>
                      <p>Weight Lifted : {workout.weightLifted}kg</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="like-comment">
                <button className="like-btn" onClick={() => handleLike(workout.statusId)}>
                  <FaHeart />
                  <span style={{fontSize: "12px"}}>{workout.likes}</span>
                </button>
                <button className="comment-btn" onClick={() => {toggleCommentInput(workout.statusId); toggleComments(workout.statusId)}}>
                  <FaComment />
                </button>
                <Link to={`/UpdateStatus/${workout.statusId}`} className="edit-btn"><FaEdit /></Link>
              </div>
              {showCommentInput[workout.statusId] && (
                <div className="add-comment">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button onClick={() => handleCommentSubmit(workout.statusId)}>Submit</button>
                </div>
              )}
              {showComments[workout.statusId] && (
                <div className="comments">
                  {workout.comments.map((comment, idx) => (
                    <div key={idx} className="comment">
                      <p><strong>{comment.userId}</strong>: {comment.content}</p>
                      <p className="comment-date">{comment.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <RightSection followers={followers} />
      </div>
    </div>
  );
}

export default DisplayWorkoutStatus;
