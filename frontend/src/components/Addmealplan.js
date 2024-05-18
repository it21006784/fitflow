import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import RightSection from "../components/RightSection";
import SideBar from "../components/SideBar"; 
import '../css/Addmealplan.css'; 
//import backgroundImage from '../Images/backgroundmeal.jpg'; // Adjust the path as needed

const AddMealPlan = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [cookingInstructions, setCookingInstructions] = useState("");
    const [nutritionalInformation, setNutritionalInformation] = useState("");
    const [portionSizes, setPortionSizes] = useState("");
    const [category, setCategory] = useState("vegetarian"); // Default category is vegetarian
    const [error, setError] = useState("");

    const categories = ["vegetarian", "vegan", "keto", "chicken", "soup", "salad"];

    const sendData = async (e) => {
        e.preventDefault();

        const newMealPlan = {
            category,
            recipes,
            ingredients,
            cookingInstructions,
            nutritionalInformation,
            portionSizes
        };

        try {
            const response = await axios.post("http://localhost:8081/mealplan", newMealPlan);
            if (response.status >= 200 && response.status < 300) {
                alert("New meal plan added");
                navigate("/Viewmealplan");
                // Clear form fields after successful submission
                setRecipes("");
                setNutritionalInformation("");
                setPortionSizes("");
            } else {
                setError("Error: Failed to add meal plan");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error: Failed to add meal plan");
        }
    };

    return (
        <div className="background-container">
            <SideBar />
            <NavBar />
            <div className="container" style={{ backgroundColor: "white", width: "1000px", marginLeft: "20%", marginRight: "8%", height: "800px", borderRadius: "10px", marginTop: "30px" }}>
                <h1 className="titleStyle">FOOD YOUR WAY</h1>
                {error && <div className="error">{error}</div>}
                <form onSubmit={sendData}><br></br>
                    <br></br>
                    <div className="form-group"><br></br><br></br>
                        <label htmlFor="category">Select Category:</label><br></br>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div><br></br>
                    <div className="form-group">
                        <label htmlFor="recipes">Recipes</label>
                        <input type="text" className="form-control" id="recipes" placeholder="Enter recipes" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} value={recipes} onChange={(e) => setRecipes(e.target.value)} required /><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients</label>
                        <input type="text" className="form-control" id="ingredients" placeholder="Enter ingredients" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} value={ingredients} onChange={(e) => setIngredients(e.target.value)} required /><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cookingInstructions">Cooking Instructions</label>
                        <input type="text" className="form-control" id="cookingInstructions" placeholder="Enter cooking instructions" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} value={cookingInstructions} onChange={(e) => setCookingInstructions(e.target.value)} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nutritionalInformation">Nutritional Information</label>
                        <input type="text" className="form-control" id="nutritionalInformation" placeholder="Enter information" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} value={nutritionalInformation} onChange={(e) => setNutritionalInformation(e.target.value)} required /><br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="portionSizes">Portion Sizes</label>
                        <input type="text" className="form-control" id="portionSizes" style={{ width: "975px", height: "40px", borderColor: "lightgray" }} placeholder="Portion Sizes" value={portionSizes} onChange={(e) => setPortionSizes(e.target.value)} required /><br />
                    </div>

                    <div className="btns">
                        <button type="submit"className="btn btn-primary me-2">Save</button>
                    </div>

                    <div />
                </form>
            </div>
            <RightSection />
        </div>
    )
}

export default AddMealPlan;
