import  { useState, useEffect } from "react";
import "./FavoriteRecipes.css";

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Dummy data for now; replace with API call to fetch favorite recipes
    const dummyRecipes = [
      { id: 1, name: "Spaghetti Bolognese", image: "spaghetti.jpg" },
      { id: 2, name: "Grilled Chicken", image: "chicken.jpg" },
      { id: 3, name: "Vegetable Stir Fry", image: "stirfry.jpg" },
    ];
    setRecipes(dummyRecipes);
  }, []);

  return (
    <div className="favorite-recipes-container">
      <h1>❤️ Favorite Recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <a href={`/recipe/${recipe.id}`}>
              <img
                src={`/uploads/images/${recipe.image}`}
                alt={recipe.name}
                onError={(e) => (e.target.src = "/uploads/images/default.jpg")}
              />
              <h3>{recipe.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
