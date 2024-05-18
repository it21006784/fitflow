import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import RightSection from "../components/RightSection";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import '../css/updatemealplan.css'; // Add appropriate styling

function UpdateMealPlan() {
  const navigate = useNavigate();
  const { mealplanId } = useParams();

  const [mealplan, setMealPlan] = useState({
    category: "",
    recipes: "",
    nutritionalInformation: "",
    portionSizes: ""
  });

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/mealplan/${mealplanId}`);
        setMealPlan(response.data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    if (mealplanId) {
      fetchMealPlan();
    }
  }, [mealplanId]);

  const onInputChange = (e, fieldName) => {
    setMealPlan(prevState => ({
      ...prevState,
      [fieldName]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/mealplan/${mealplanId}`, mealplan);
      Swal.fire({
        icon: "success",
        title: "Post Updated Successfully",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
      }).then(() => {
        navigate("/Viewmealplan"); // Redirect to a different page after successful update
      });
      
    } catch (error) {
      console.error("Error updating meal plan:", error);
      alert("An error occurred while updating the meal plan");
    }
  };

  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-content">
        <SideBar className="sidebar"/>
        <div className="content">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Update Meal Plan</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="recipes" className="form-label">Recipes:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipes"
                    value={mealplan.recipes || ""}
                    onChange={(e) => onInputChange(e, "recipes")}
                    placeholder="Enter recipes"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">Ingredients:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredients"
                    value={mealplan.ingredients || ""}
                    onChange={(e) => onInputChange(e, "ingredients")}
                    placeholder="Enter ingredients"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cookingInstructions" className="form-label">Cooking Instructions:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cookingInstructions"
                    value={mealplan.cookingInstructions || ""}
                    onChange={(e) => onInputChange(e, "cookingInstructions")}
                    placeholder="Enter cooking instructions"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nutritionalInformation" className="form-label">Nutritional Information:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nutritionalInformation"
                    value={mealplan.nutritionalInformation || ""}
                    onChange={(e) => onInputChange(e, "nutritionalInformation")}
                    placeholder="Enter nutritional information"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="portionSizes" className="form-label">Portion Sizes:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="portionSizes"
                    value={mealplan.portionSizes || ""}
                    onChange={(e) => onInputChange(e, "portionSizes")}
                    placeholder="Enter portion sizes"
                  />
                </div>
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button type="button" className="btn btn-danger" onClick={() => navigate("/Viewmealplan")}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
        <RightSection className="right-section"/>
      </div>
    </div>
  );
}

export default UpdateMealPlan;
