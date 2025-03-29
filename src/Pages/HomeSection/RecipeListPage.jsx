import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../Styles/RecipeListPage.css";

const BASE_URL = "http://localhost:5000";

const RecipeListPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgErrors, setImgErrors] = useState({});

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recipes`);
                setRecipes(response.data);
            } catch (err) {
                console.error("❌ Error fetching recipes:", err);
                setError("⚠️ Failed to load recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipes/${category}/ingredient/${recipeId}`);
    };

    const handleImageError = (id) => {
        setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    return (
        <div className="recipe-list">
            {loading ? (
                <p>⏳ Loading recipes...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : recipes.length > 0 ? (
                recipes.map((recipe) => {
                    const imageUrl =
                        imgErrors[recipe.id] || !recipe.image_url
                            ? "/placeholder-image.png"
                            : recipe.image_url.startsWith("http")
                            ? recipe.image_url
                            : `${BASE_URL}${recipe.image_url}`;

                    return (
                        <div
                            className="recipe-cardbox"
                            key={recipe.id}
                            onClick={() => handleRecipeClick(recipe.id)}
                        >
                            {/* Image Container (80%) */}
                            <div className="image-container">
                                <img
                                    src={imageUrl}
                                    alt={recipe.name}
                                    onError={() => handleImageError(recipe.id)}
                                />
                            </div>

                            {/* Recipe Name (20%) */}
                            <div className="recipe-name">{recipe.name}</div>
                        </div>
                    );
                })
            ) : (
                <p>📭 No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeListPage;
