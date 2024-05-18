import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaShareSquare, FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import '../css/ViewAllWorkouts.css';
import { Link } from "react-router-dom";

export default function ViewAllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const [followers, setFollowers] = useState(0);
  const [user , setUser] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadWorkoutPlans();

      // Fetch the username by its ID
      axios.get(`http://localhost:8081/users/${userId}`)
          .then(response => {
            setUser(response.data.username);
          })
          .catch(error => {
              setError(error);
          });

  }, []);



  const loadWorkoutPlans = async () => {
    axios.get(`http://localhost:8081/api/workout`)
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleLike = async (w_id) => {
    try {
      await axios.post(`http://localhost:8081/api/workout/${w_id}/like`);
      loadWorkoutPlans();
    } catch (error) {
      console.error("Error liking workout plan:", error);
    }
  };

  const handleCommentSubmit = async (w_id) => {
    try {
      await axios.post(`http://localhost:8081/api/workout/${w_id}/comment`, {
        commentId: "cmt" + new Date().getTime(),
        userId: userId,
        content: commentText,
        date: new Date().toISOString(),
      });

      setCommentText("");
      loadWorkoutPlans();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleCommentInput = (w_id) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [w_id]: !prev[w_id],
    }));
  };

  const toggleComments = (w_id) => {
    setShowComments((prev) => ({
      ...prev,
      [w_id]: !prev[w_id],
    }));
  };

  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div>
      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="content">
          {workouts.map((workout) => (
            <div key={workout.id} className="card-container">
              <div className="user-details">
                <img
                  src={`https://ui-avatars.com/api/?name=${workout.u_name}&background=random&size=40`}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <p className="username">@ {workout.u_name}</p>
              </div>
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
                <button className="like-btn" onClick={() => handleLike(workout.w_id)}>
                  <FaHeart />
                  <span style={{ fontSize: "12px" }}>{workout.likes}</span>
                </button>
                <button className="comment-btn" onClick={() => { toggleCommentInput(workout.w_id); toggleComments(workout.w_id); }}>
                  <FaComment />
                </button>
                <Link to={`/EditWorkoutPlan/${workout.w_id}`} className="edit-btn"><FaShareSquare /></Link>
              </div>
              {showCommentInput[workout.w_id] && (
                <div className="add-comment">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button onClick={() => handleCommentSubmit(workout.w_id)}>Submit</button>
                </div>
              )}
              {showComments[workout.w_id] && (
                <div className="comments">
                  {workout.comments.map((comment, idx) => (
                    <div key={idx} className="comment">
                      <p><strong>{user}</strong>: {comment.content}</p>
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
