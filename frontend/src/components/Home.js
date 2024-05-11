import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import '../css/workout.css'; 
import '../css/nav.css'; 
import SideBar from "../components/SideBar";
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit } from "react-icons/fa";

import { FaIconName } from 'react-icons/fa';

// import UserCheck from "./User/UserCheck";

function Home() {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(0);

  return (
    <div>
      {/* <UserCheck userId={localStorage.getItem("userId")} /> */}

      <NavBar />
      <SideBar />
      <div className="bk_home_img">
       <RightSection followers={followers}/>
      </div>
    </div>
  );
}

export default Home;
