import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/HomeTrending.css";

const BASE_URL = "http://localhost:5000";

const HomeTrending = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get user email from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userEmail = userInfo.email || user.email;
    
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Fetch all recipes from the database
        const response = await axios.get(`${BASE_URL}/api/recipes`);
        
        if (response.data && Array.isArray(response.data)) {
          // Sort all recipes by view_count in descending order
          const sortedRecipes = response.data.sort((a, b) => 
            (b.view_count || 0) - (a.view_count || 0)
          );
          
          // Take only the top 3 most viewed recipes
          setRecipes(sortedRecipes.slice(0, 3));
        } else {
          setRecipes([]);
        }
        
        // If user is logged in, fetch their favorites
        if (userEmail) {
          try {
            const favResponse = await axios.get(`${BASE_URL}/api/favorites/${userEmail}`);
            setFavorites(favResponse.data);
          } catch (favErr) {
            console.error("Error fetching favorites:", favErr);
          }
        }
      } catch (err) {
        console.error(`❌ Error fetching recipes:`, err);
        setError(`⚠️ Failed to load recipes. Please try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeId) => {
    // Update view count when a recipe is clicked
    updateViewCount(recipeId);
    navigate(`/recipes/all/ingredient/${recipeId}`);
  };

  // Function to update view count
  const updateViewCount = async (recipeId) => {
    try {
      await axios.post(`${BASE_URL}/api/recipes/${recipeId}/view`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const handleImageError = (id) => {
    setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
  };

  const toggleFavorite = async (e, recipe) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Get user email from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userEmail = userInfo.email || user.email;
    
    if (!userEmail) {
      alert("Please log in to save favorites");
      navigate('/login');
      return;
    }
    
    try {
      const isFavorite = favorites.some(fav => fav.recipe_id === recipe.id);
      
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${BASE_URL}/api/favorites/${userEmail}/${recipe.id}`);
        setFavorites(favorites.filter(fav => fav.recipe_id !== recipe.id));
      } else {
        // Add to favorites
        const response = await axios.post(`${BASE_URL}/api/favorites`, {
          email: userEmail,
          recipe_id: recipe.id
        });
        setFavorites([...favorites, response.data]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.recipe_id === recipeId);
  };

  return (
    <div className="home-trending-list">
      <div className="home-trending-title1">
      <h1 className="home-trending-title">Trending Recipes</h1>
      <p onClick={() => navigate("/trending")}>More</p>
      </div>
      
      
      {loading ? (
        <p>⏳ Loading recipes...</p>
      ) : error ? (
        <p className="home-trending-error">{error}</p>
      ) : recipes.length > 0 ? (
        <div className="home-trending-cards-container">
          {recipes.map((recipe, index) => {
            const imageUrl =
              imgErrors[recipe.id] || !recipe.image_url
                ? "/placeholder-image.png"
                : recipe.image_url.startsWith("http")
                ? recipe.image_url
                : `${BASE_URL}${recipe.image_url}`;

            return (
              <div
                className="home-trending-card"
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
              >
                {/* Remove trending rank badge */}

                {/* Favorite Heart Icon */}
                <div 
                  className={`home-trending-favorite-icon ${isFavorite(recipe.id) ? 'home-trending-favorited' : ''}`}
                  onClick={(e) => toggleFavorite(e, recipe)}
                >
                  ❤
                </div>

                {/* Image Container */}
                <div className="home-trending-image-container">
                  <img
                    src={imageUrl}
                    alt={recipe.name}
                    onError={() => handleImageError(recipe.id)}
                  />
                </div>

                {/* Recipe Name */}
                <div className="home-trending-recipe-name">
                  <div className="home-trending-name-text">{recipe.name}</div>
                  {recipe.view_count > 0 && (
                    <div className="home-trending-view-count">
                      {recipe.view_count} views
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>📭 No recipes found.</p>
      )}
    </div>
  );
};

export default HomeTrending;