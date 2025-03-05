// import React from "react";
import "../Styles/Search.css";


const RecipeSearch = () => {
  return (
    <div className="search-container">
      <div className="search-box">
        <input type="text" placeholder="Search all Recipes ........" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="recent-search">
        <h2>Recent Search</h2>
        <button className="recent-search-button">Baked</button>
      </div>

      <div className="search-results">
        <h2>Searched Result</h2>
        <div className="recipe-cards">
          {[1, 2, 3].map((index) => (
            <div key={index} className="recipe-card">
              {/* <img src={paneertika} alt="Paneer Tikka" className="recipe-image" /> */}
              <p className="recipe-title">Paneer Tikka</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
