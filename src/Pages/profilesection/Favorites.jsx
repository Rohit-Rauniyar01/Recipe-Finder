import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Favorites.css";
import "../../Styles/RecipeListPage.css"; // Import RecipeListPage styles

const BASE_URL = "http://localhost:5000";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [imgErrors, setImgErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    const handleRecipeClick = (recipe) => {
        navigate(`/recipes/${recipe.category || 'all'}/ingredient/${recipe.id}`);
    };

    const handleImageError = (id) => {
        setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    const removeFromFavorites = (e, recipeId) => {
        e.stopPropagation();
        const updatedFavorites = favorites.filter(fav => fav.id !== recipeId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

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
                    {favorites.map((recipe) => {
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
                                onClick={() => handleRecipeClick(recipe)}
                            >
                                {/* Remove from Favorites Button */}
                                <div 
                                    className="remove-favorite"
                                    onClick={(e) => removeFromFavorites(e, recipe.id)}
                                >
                                    ✖
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
            )}
        </div>
    );
};

export default Favorites;