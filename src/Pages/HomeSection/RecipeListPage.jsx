import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes
import "../../Styles/RecipeListPage.css";

const BASE_URL = "http://localhost:5000";

const RecipeListPage = ({ isTrending }) => {
    const navigate = useNavigate();
    const { category } = useParams();
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
                
                // Use a single endpoint for all cases to avoid the problematic route
                const endpoint = `${BASE_URL}/api/recipes`;
                console.log(`Fetching from: ${endpoint}`);
                
                const response = await axios.get(endpoint);
                
                if (response.data && Array.isArray(response.data)) {
                    let filteredRecipes = [...response.data];
                    
                    // Filter by category if needed
                    if (category && !isTrending) {
                        filteredRecipes = filteredRecipes.filter(recipe => 
                            recipe.category && recipe.category.toLowerCase() === category.toLowerCase()
                        );
                    }
                    
                    // For trending, sort by date and take top 6
                    if (isTrending) {
                        filteredRecipes.sort((a, b) => {
                            // If created_at is not available, use id as fallback
                            if (!a.created_at && !b.created_at) return b.id - a.id;
                            if (!a.created_at) return 1;
                            if (!b.created_at) return -1;
                            
                            return new Date(b.created_at) - new Date(a.created_at);
                        });
                        
                        filteredRecipes = filteredRecipes.slice(0, 6);
                    }
                    
                    setRecipes(filteredRecipes);
                } else {
                    console.warn("Response data is not an array:", response.data);
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
    }, [category, isTrending]); // Re-fetch when category or isTrending changes

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipes/${category || 'all'}/ingredient/${recipeId}`);
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

    // const goToFavorites = (e) => {
    //     e.stopPropagation(); // Prevent triggering the card click
    //     navigate('/favorites');
    // };

    const isFavorite = (recipeId) => {
        return favorites.some(fav => fav.id === recipeId);
    };

    const pageTitle = isTrending 
        ? "Trending Recipes" 
        : category 
            ? `${category} Recipes` 
            : "All Recipes";

    return (
        <div className="recipe-list">
            <h1 className="category-title">{pageTitle}</h1>
            
            {loading ? (
                <p>⏳ Loading recipes...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : recipes.length > 0 ? (
                <div className="recipe-cards-containerbox">
                    {recipes.map((recipe) => {
                        const imageUrl =
                            imgErrors[recipe.id] || !recipe.image_url
                                ? "/placeholder-image.png"
                                : recipe.image_url.startsWith("http")
                                ? recipe.image_url
                                : `${BASE_URL}${recipe.image_url}`;

                        return (
                            <div
                                className="recipe-cardbox1"
                                key={recipe.id}
                                onClick={() => handleRecipeClick(recipe.id)}
                            >
                                {/* Favorite Heart Icon */}
                                <div 
                                    className={`favorite-icon ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                                    onClick={(e) => toggleFavorite(e, recipe)}
                                >
                                    ❤
                                </div>

                                {/* Image Container */}
                                <div className="image-containerbox">
                                    <img
                                        src={imageUrl}
                                        alt={recipe.name}
                                        onError={() => handleImageError(recipe.id)}
                                    />
                                </div>

                                {/* Recipe Name */}
                                <div className="recipe-name">{recipe.name}</div>
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

// Add PropTypes validation
RecipeListPage.propTypes = {
  isTrending: PropTypes.bool
};

// Add default props
RecipeListPage.defaultProps = {
  isTrending: false
};

export default RecipeListPage;