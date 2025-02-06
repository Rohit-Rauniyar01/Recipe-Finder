// import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "/src/Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();  // Initialize the navigate function

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}> {/* Clicking logo navigates to Home */}
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li onClick={() => navigate('/')}>Home</li>  {/* Navigate to Home */}
        <li>Recipe</li>
        <li>Ingredient</li>
        <li>Search</li>
        <li>
          <button className="signin-button" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
