// Navbar.js or Navbar.jsx
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/recipe')}>Recipe</li> {/* Updated path */}
        <li onClick={() => navigate('/trending')}>Trending</li>
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
