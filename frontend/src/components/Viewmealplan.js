import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar"; 
import RightSection from "../components/RightSection";
import NavBar from "../components/NavBar";
import { FaEdit } from "react-icons/fa"; // Import Font Awesome icons
import { FaTrashAlt } from "react-icons/fa";
import '../css/Viewmealplan.css';

const ViewMealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const fetchMealPlansByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8081/mealplan/category/${category}`);
      setMealPlans(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      setError("Error: Failed to fetch meal plans");
      setMealPlans([]);
    }
  };

  const deleteMealPlan = async (mealplanId) => {
    try {
      await axios.delete(`http://localhost:8081/mealplan/${mealplanId}`);
      setMealPlans(mealPlans.filter(mealPlan => mealPlan.mealplanId !== mealplanId));
      alert("Meal plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      alert("An error occurred while deleting the meal plan.");
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      fetchMealPlansByCategory(selectedCategory);
    } else {
      setError("Please select a category.");
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchMealPlansByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    
    <center>
      <NavBar />
    <div className="container"><br></br>
      <SideBar/>
      
      <h1>View Meal Plans</h1><br></br><br></br><br></br>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select Category:</label><br></br>
          <select id="categorySelect" className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select...</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="chicken">Chicken</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">View Meal Plans</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div>
        {mealPlans.map((mealPlan) => (
          <div key={mealPlan.mealplanId} className="card my-3">
            <div className="card-body">
              <h3 className="card-title">{mealPlan.name}</h3>
              <p className="card-text"><strong>Category:</strong> {mealPlan.category}</p>
              <p className="card-text"><strong>Recipes:</strong> {mealPlan.recipes}</p>
              <p className="card-text"><strong>Ingredients:</strong> {mealPlan.ingredients}</p>
              <p className="card-text"><strong>Cooking Instructions:</strong> {mealPlan.cookingInstructions}</p>
              <p className="card-text"><strong>Nutritional Information:</strong> {mealPlan.nutritionalInformation}</p>
              <p className="card-text"><strong>Portion Sizes:</strong> {mealPlan.portionSizes}</p>
              <Link to={`/Updatemealplan/${mealPlan.mealplanId}`} className="btn btn-primary me-2"style={{ backgroundColor: "#804967", color: "white", cursor: "pointer" }}><FaEdit /></Link>
              <button
                    //className="btn btn-danger"
                    onClick={() => deleteMealPlan(mealPlan.mealplanId)}
                  >
                     <FaTrashAlt />
                  </button>
              
            </div>
            
          </div>
        ))}
      </div>
      <RightSection/>
    </div>
    </center>
  );
};

export default ViewMealPlan;
