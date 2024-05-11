import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Updatemealplan() {
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
        console.error("Error fetching mealplan:", error);
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
      const updatedMealPlan = { ...mealplan };
      await axios.put(`http://localhost:8081/mealplan/${mealplanId}`, updatedMealPlan);
      alert("Meal plan updated successfully");
      navigate("/Viewmealplan");
    } catch (error) {
      console.error("Error updating meal plan:", error);
      alert("An error occurred while updating the meal plan");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
      </div>
    </div>
  );
}

export default Updatemealplan;


