import { useState } from "react";
import PropTypes from "prop-types";
import "/src/Styles/Addrecipe.css";

const AddRecipe = ({ onClose }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    image: null,
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setRecipe({ ...recipe, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to Local Storage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    storedRecipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(storedRecipes));

    alert("Recipe Added Successfully!");
    onClose(); // ✅ Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 className="page-title">Add New Recipe</h2>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter recipe name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={recipe.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="form-group">
            <label>Choose Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} required />
          </div>

          <div className="form-group">
            <label>List of Ingredients:</label>
            <textarea
              name="ingredients"
              placeholder="Enter ingredients separated by commas"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions:</label>
            <textarea
              name="instructions"
              placeholder="Enter step-by-step instructions"
              value={recipe.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="add-button">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

AddRecipe.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddRecipe;
