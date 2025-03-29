

// import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/CategoryPage.css";

 const CategoryPage = () => {
  const navigate = useNavigate();

  // List of categories with images
  const categories = [
    { name: "Vegetarian", image: "https://www.themealdb.com/images/category/vegetarian.png" },
    { name: "Chicken", image: "https://www.themealdb.com/images/category/chicken.png" },
    { name: "Seafood", image: "https://www.themealdb.com/images/category/seafood.png" },
    { name: "Dessert", image: "https://www.themealdb.com/images/category/Dessert.png" },
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to the RecipeListPage with the selected category in the URL
    navigate(`/recipes/${categoryName}`);
  };

  return (
    <div className="recipe-container">
      {/* Category Grid */}
      <div className="category-section">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  ); 
};

export default CategoryPage;