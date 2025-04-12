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
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
    
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/recipes`);
        
        if (response.data && Array.isArray(response.data)) {
          // Take only the first 3 recipes for HomeTrending
          setRecipes(response.data.slice(0, 3));
        } else {
          setRecipes([]);
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
    navigate(`/recipes/all/ingredient/${recipeId}`);
  };

  const handleImageError = (id) => {
    setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
  };

  const toggleFavorite = (e, recipe) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
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
          {recipes.map((recipe) => {
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
                <div className="home-trending-recipe-name">{recipe.name}</div>
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