import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";

import AddCurrentWorkoutStatus from './components/AddCurrentWorkoutStatus';
import ViewCurrentWorkoutStatus from './components/ViewCurrentWorkoutStatus';
import ViewAllStatus from './components/ViewAllStatus';
import UpdateStatus from './components/UpdateStatus';
import Home from "./components/Home";

import Login from "./components/Login"
import Register from "./components/Register";
import UserProfile from './components/UserProfile';

import AddMedia from './components/AddMedia';
import MediaList from './components/MediaList';
import ViewOneMedia from './components/ViewOneMedia';

import Addmealplan from './components/Addmealplan';
import ViewMealPlan from './components/Viewmealplan';
import UpdateMealPlan from './components/Updatemealplan';

function App() {
  return (
    <Router>
      <div>

        <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login/>} />

        <Route path="/AddCurrentWorkoutStatus" exact element={<AddCurrentWorkoutStatus/>}/>
        <Route path="/ViewCurrentWorkoutStatus/:statusId" exact element={<ViewCurrentWorkoutStatus/>}/>
        <Route path="/ViewAllStatus" exact element={<ViewAllStatus/>}/>
        <Route path="/UpdateStatus/:statusId" exact element={<UpdateStatus/>}/>
        <Route path="/Register" exact element={<Register/>}/>
        <Route path="/UserProfile/:userId" exact element={<UserProfile/>}/>

        <Route path="/AddMedia" exact element={<AddMedia/>}/>
        <Route path="/MediaList" exact element={<MediaList/>}/>
        <Route path="/ViewOneMedia/:mediaId" exact element={<ViewOneMedia/>}/>

        <Route path="/Addmealplan" exact element={<Addmealplan/>}/>
        <Route path="/Viewmealplan" exact element={<ViewMealPlan/>}/>
        <Route path="/Updatemealplan/:mealplanId" exact element={<UpdateMealPlan/>}/>

        </Routes>
      </div>
    </Router>

  );
}

export default App;