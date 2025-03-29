import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import "../../Styles/Ingredient.css";

const BASE_URL = "http://localhost:5000";

const RecipeDisplay = ({ recipe }) => {
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;
  };

  return (
    <div className="recipe-paper">
      <h2 className="recipe-title">{recipe.name}</h2>
      <p className="recipe-category">Category: {recipe.category}</p>

      <div className="recipe-content">
        {recipe.image_url && (
          <div className="recipe-image">
            <img 
              src={getImageUrl(recipe.image_url)} 
              alt={recipe.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.png";
              }}
            />
          </div>
        )}

        <div>
          <h3>Ingredients Used:</h3>
          <div className="ingredients-list">
            {recipe.ingredients?.split("\n").map((ingredient, index) => {
              const parts = ingredient.split(":");
              const name = parts[0]?.trim() || "";
              const amount = parts[1]?.trim() || "";
              return (
                <div key={index} className="ingredient-item">
                  <span>{name}</span>
                  <span>{amount}</span>
                </div>
              );
            })}
          </div>

          <h3>Instructions:</h3>
          <div className="instructions">
            {recipe.instructions?.split("\n").map((instruction, index) => (
              <p key={index}>
                {index + 1}. {instruction}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeDisplay.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    ingredients: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
};

const Ingredient = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/recipes/${id}`);
        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setRecipe({
            name: data.name, // Ensure 'name' is fetched from the database
            category: data.category,
            image_url: data.image_url,
            ingredients: data.ingredients,
            instructions: data.instructions,
          });
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(`⚠️ Failed to fetch recipe: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        if (isMounted) setError("❌ Error fetching recipe: " + error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setError("⚠️ Recipe ID is missing");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <p>Loading recipe...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <p className="error">{error}</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {recipe ? <RecipeDisplay recipe={recipe} /> : <p>Recipe not found</p>}
    </Container>
  );
};

export default Ingredient;