import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/Favorites.css";
import "../../Styles/RecipeListPage.css"; // Import RecipeListPage styles

const BASE_URL = "http://localhost:5000";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [imgErrors, setImgErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user email from localStorage (trying both possible keys)
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Use whichever has the email
        const userEmail = userInfo.email || user.email;
        console.log("User data from localStorage:", { userInfo, user });
        console.log("Using email:", userEmail);
        
        // For consistency, ensure both storage keys have the same data
        if (userEmail) {
            const userData = userInfo.email ? userInfo : user;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userInfo', JSON.stringify(userData));
        }
        
        const fetchFavorites = async () => {
            if (!userEmail) {
                console.log("No user email found, skipping favorites fetch");
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                console.log("Fetching favorites for email:", userEmail);
                const response = await axios.get(`${BASE_URL}/api/favorites/${userEmail}`);
                console.log("Favorites response:", response.data); // Debug API response
                
                if (response.data) {
                    // Fetch full recipe details for each favorite
                    const favoritesWithDetails = await Promise.all(
                        response.data.map(async (fav) => {
                            try {
                                const recipeResponse = await axios.get(`${BASE_URL}/api/recipes/${fav.recipe_id}`);
                                return {
                                    ...fav,
                                    recipe: recipeResponse.data
                                };
                            } catch (err) {
                                console.error(`Error fetching recipe ${fav.recipe_id}:`, err);
                                return fav;
                            }
                        })
                    );
                    
                    setFavorites(favoritesWithDetails);
                }
            } catch (err) {
                console.error("Error fetching favorites:", err);
                setError("Failed to load favorites. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchFavorites();
    }, []);

    const handleRecipeClick = (recipe) => {
        navigate(`/recipes/${recipe.category || 'all'}/ingredient/${recipe.id}`);
    };

    const handleImageError = (id) => {
        setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    // Also update the removeFromFavorites function
    const removeFromFavorites = async (e, recipeId) => {
        e.stopPropagation();
        
        // Try both storage keys
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userInfo.email || user.email;
        
        if (!userEmail) {
            alert("Please log in to manage favorites");
            navigate('/login');
            return;
        }
        
        try {
            await axios.delete(`${BASE_URL}/api/favorites/${userEmail}/${recipeId}`);
            setFavorites(favorites.filter(fav => fav.recipe_id !== recipeId));
        } catch (err) {
            console.error("Error removing favorite:", err);
            alert("Failed to remove from favorites. Please try again.");
        }
    };

    if (loading) {
        return <p>⏳ Loading your favorites...</p>;
    }
    
    if (error) {
        return <p className="error">{error}</p>;
    }
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
        return (
            <div className="favorites-page">
                <h1 className="favorites-title">My Favorite Recipes</h1>
                <div className="no-favorites">
                    <p>Please log in to view your favorites.</p>
                    <button onClick={() => navigate('/login')}>Log In</button>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">My Favorite Recipes</h1>
            
            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <p>You haven't added any recipes to your favorites yet.</p>
                    <button onClick={() => navigate('/')}>Browse Recipes</button>
                </div>
            ) : (
                <div className="recipe-cards-containerbox">
                    {favorites.map((favorite) => {
                        const recipe = favorite.recipe || {};
                        
                        const imageUrl =
                            imgErrors[recipe.id] || !recipe.image_url
                                ? "/placeholder-image.png"
                                : recipe.image_url?.startsWith("http")
                                ? recipe.image_url
                                : `${BASE_URL}${recipe.image_url}`;

                        return (
                            <div
                                className="recipe-cardbox1"
                                key={favorite.recipe_id}
                                onClick={() => handleRecipeClick(recipe)}
                            >
                                {/* Remove from Favorites Button */}
                                <div 
                                    className="remove-favorite"
                                    onClick={(e) => removeFromFavorites(e, favorite.recipe_id)}
                                >
                                    ✖
                                </div>

                                {/* Image Container */}
                                <div className="image-containerbox">
                                    <img
                                        src={imageUrl}
                                        alt={recipe.name || "Recipe"}
                                        onError={() => handleImageError(recipe.id)}
                                    />
                                </div>

                                {/* Recipe Name */}
                                <div className="recipe-name">{recipe.name || "Unknown Recipe"}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;