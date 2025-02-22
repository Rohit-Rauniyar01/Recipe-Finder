import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/recipes")}>Recipe</li>
        <li onClick={() => navigate("/ingredients")}>Ingredient</li>
        <li onClick={() => navigate("/search")}>Search</li>
        <li>
          <button className="signin-button" onClick={() => navigate("/login")}> {/* Fixed path to lowercase */}
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
