import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/ReceipeListPage.css";

const RecipeListPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <div className="recipe-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{category} Recipes</h2>
      <div className="recipe-list">
        {isLoading ? (
          <p className="loading-text">Loading recipes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((meal) => (
            <div key={meal.idMeal} className="recipe-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
              <div className="recipe-text">{meal.strMeal}</div>
            </div>
          ))
        ) : (
          <p className="loading-text">No recipes found for {category}.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeListPage;
