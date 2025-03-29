import React from "react";
import RecipeListPage from "./RecipeListPage";

const Trending = () => {
  return (
    <div className="trending-container">
      <h1 className="trending-title">Trending Recipes</h1>
      <RecipeListPage isTrending={true} />
    </div>
  );
};

export default Trending;