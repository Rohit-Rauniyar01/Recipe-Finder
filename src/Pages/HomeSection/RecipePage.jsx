import React from "react";
import RecipeListPage from "./RecipeListPage";

const RecipePage = () => {
  return (
    <div className="recipe-page-container">
      <h1 className="recipe-page-title">All Recipes</h1>
      <RecipeListPage />
    </div>
  );
};

export default RecipePage;