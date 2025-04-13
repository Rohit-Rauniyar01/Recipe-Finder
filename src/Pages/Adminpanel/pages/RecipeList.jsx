import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RecipeList.css";

export default function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    id: null,
    name: "",
    category: "",
    image: null,
    ingredients: "",
    instructions: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch all recipes when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to fetch all recipes
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/admin/login");
        return;
      }
      
      const response = await axios.get("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setRecipes(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!searchTerm.trim()) {
        fetchRecipes();
        return;
      }
      
      const response = await axios.get(`http://localhost:5000/api/recipes/search?term=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setRecipes(response.data);
      setError("");
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle edit button click
  const handleEdit = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const recipe = response.data;
      setCurrentRecipe({
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      });
      
      if (recipe.image_url) {
        setImagePreview(recipe.image_url);
      }
      
      setShowEditPopup(true);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setError("Failed to load recipe details. Please try again.");
    }
  };

  // Function to handle delete button click
  const handleDelete = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the recipe list
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setCurrentRecipe({
      id: null,
      name: "",
      category: "",
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

  const handleUpdateRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      const { id, name, category, ingredients, instructions, image } = currentRecipe;
      
      // Create form data for multipart/form-data (for image upload)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      
      if (image) {
        formData.append("image", image);
      }
      
      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      // Refresh the recipe list and close popup
      fetchRecipes();
      handleClosePopup();
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="recipe-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading recipes...</div>
      ) : (
        <div className="table-container">
          <div className="table-header">
            <div className="table-header-cell">Name</div>
            <div className="table-header-cell">Edit</div>
            <div className="table-header-cell">Category</div>
            <div className="table-header-cell">Delete</div>
          </div>
          <div>
            {recipes.length === 0 ? (
              <div className="no-recipes">No recipes found</div>
            ) : (
              recipes.map((recipe) => (
                <div key={recipe.id} className="table-row">
                  <div className="recipe-name">{recipe.name}</div>
                  <div className="action-cell">
                    <button 
                      className="action-button edit-button"
                      onClick={() => handleEdit(recipe.id)}
                    >
                      <FaEdit className="icon" />
                    </button>
                  </div>
                  <div className="recipe-category">{recipe.category}</div>
                  <div className="action-cell">
                    <button 
                      className="action-button delete-button"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      <FaTrash className="icon" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

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
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={currentRecipe.category}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="edit-form-group">
              <label>Current Image</label>
              <div className="current-image-display">
                {imagePreview ? (
                  <img src={imagePreview} alt="Recipe preview" />
                ) : (
                  <span>No image available</span>
                )}
              </div>
            </div>
            
            <div className="edit-form-group">
              <label>Choose New Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            
            <div className="edit-form-group">
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
                placeholder="Enter ingredients"
              />
            </div>
            
            <div className="edit-form-group">
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={currentRecipe.instructions}
                onChange={handleInputChange}
                placeholder="Enter instructions"
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