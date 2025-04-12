import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/RecipeList.css";

export default function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([
    "chicken",
    "chicken",
    "chicken",
    "chicken",
    "chicken",
  ]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    id: null,
    name: "",
    image: null,
    ingredients: "",
    instructions: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEdit = (recipeId, recipeName) => {
    // Instead of navigating, show popup with recipe data
    setCurrentRecipe({
      id: recipeId,
      name: recipeName,
      ingredients: "Update Ingredient", // Placeholder, would be fetched from API
      instructions: "Update Instruction" // Placeholder, would be fetched from API
    });
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setCurrentRecipe({
      id: null,
      name: "",
      image: null,
      ingredients: "",
      instructions: ""
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentRecipe(prev => ({
        ...prev,
        image: file
      }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateRecipe = () => {
    // Here you would send the updated recipe to your API
    console.log("Updating recipe:", currentRecipe);
    
    // Close the popup after update
    handleClosePopup();
  };

  return (
    <div className="recipe-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="table-header-cell">Name</div>
          <div className="table-header-cell">Edit</div>
          <div className="table-header-cell">Delete</div>
        </div>
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} className="table-row">
              <div className="recipe-name">{recipe}</div>
              <div className="action-cell">
                <button 
                  className="action-button edit-button"
                  onClick={() => handleEdit(index, recipe)}
                >
                  <FaEdit className="icon" />
                </button>
              </div>
              <div className="action-cell">
                <button className="action-button delete-button">
                  <FaTrash className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Recipe Popup */}
      {showEditPopup && (
        <div className="edit-popup-overlay">
          <div className="edit-popup">
            <h2>Update Recipe</h2>
            
            <div className="edit-form-group">
              <label>Name of Recipe</label>
              <input
                type="text"
                name="name"
                value={currentRecipe.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="edit-form-group">
              <label>Current Image</label>
              <div className="current-image-display">
                {imagePreview ? (
                  <img src={imagePreview} alt="Recipe preview" />
                ) : (
                  <span>Current image of Recipe</span>
                )}
              </div>
            </div>
            
            <div className="edit-form-group">
              <label>Choose</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="image-update-text">Update image of Recipe</span>
            </div>
            
            <div className="edit-form-group">
              <textarea
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
                placeholder="Update Ingredient"
              />
            </div>
            
            <div className="edit-form-group">
              <textarea
                name="instructions"
                value={currentRecipe.instructions}
                onChange={handleInputChange}
                placeholder="Update Instruction"
              />
            </div>
            
            <div className="edit-form-actions">
              <button 
                className="update-button"
                onClick={handleUpdateRecipe}
              >
                Update
              </button>
              <button 
                className="cancel-button"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}