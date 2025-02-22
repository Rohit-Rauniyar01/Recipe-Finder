// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/RecipePage.css"; // Import CSS file

// const RecipePage = () => {
//   const [recipe, setRecipe] = useState({ name: "", imageUrl: "" });

//   useEffect(() => {
//     let isMounted = true;

//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
//         if (isMounted && response.data.meals) {
//           const meal = response.data.meals[0]; // Extract first meal
//           setRecipe({
//             name: meal.strMeal, // Fetch recipe name
//             imageUrl: meal.strMealThumb, // Fetch recipe image
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching the recipe:", error);
//       }
//     };

//     fetchRecipe();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <div className="recipe-card">
//       {/* Upper part - Image */}
//       <div className="recipe-image">
//         {recipe.imageUrl ? (
//           <img src={recipe.imageUrl} alt={recipe.name} />
//         ) : (
//           <p className="loading-text">Loading...</p>
//         )}
//       </div>

//       {/* Lower part - Recipe Name */}
//       <div className="recipe-text">
//         {recipe.name ? recipe.name : "Loading..."}
//       </div>
//     </div>
//   );
// };

// export default RecipePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ReceipeListPage.css";
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