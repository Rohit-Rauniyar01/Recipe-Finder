import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/RecipeList.css";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([
    "chicken",
    "chicken",
    "chicken",
    "chicken",
    "chicken",
  ]);

  return (
    <div className="recipe-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="table-header-cell">Name</div>
          <div className="table-header-cell">Edit</div>
          <div className="table-header-cell">Delete</div>
        </div>
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} className="table-row">
              <div className="recipe-name">{recipe}</div>
              <div className="action-cell">
                <button className="action-button edit-button">
                  <FaEdit className="icon" />
                </button>
              </div>
              <div className="action-cell">
                <button className="action-button delete-button">
                  <FaTrash className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
