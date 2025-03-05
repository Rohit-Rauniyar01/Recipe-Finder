import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isUser = localStorage.getItem("isUser") === "true";
    setIsLoggedIn(isAdmin || isUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/recipe")}>Recipe</li>
          <li onClick={() => navigate("/trending")}>Trending</li>
          <li onClick={() => navigate("/search")}>Search</li>
          {!isLoggedIn ? (
            <li>
              <button
                className="signin-button"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </li>
          ) : (
            <li
              className="dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src="/src/assets/avatar.png"
                alt="User Avatar"
                className="user-avatar"
              />
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/profile")}>Manage Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;
