import "../Styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import { useState, useEffect } from "react"; // Add these imports

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo"); // Changed from "user" to "userInfo" to match your storage key
    setIsLoggedIn(false);
    navigate("/");
  };

  // Function to handle navigation and close mobile menu
  const handleNavigation = (path) => {
    // If user is not logged in and trying to access protected routes, redirect to login
    if (!isLoggedIn && path !== "/" && path !== "/login") {
      navigate("/login");
      setMobileMenuOpen(false);
      return;
    }
    
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      
      {/* Mobile menu toggle button */}
      <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      
      <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <li onClick={() => handleNavigation("/")}>Home</li>
        <li onClick={() => handleNavigation("/recipes")}>Recipe</li>
        <li onClick={() => handleNavigation("/trending")}>Trending</li>
        <li onClick={() => handleNavigation("/search")}>Search</li>

        {/* Conditionally render profile icon or sign in button */}
        {isLoggedIn ? (
          <li onClick={() => handleNavigation("/profile")}>
            <FaUserCircle size={24} />
          </li>
        ) : (
          <li>
            <button className="signin-button" onClick={() => handleNavigation("/login")}>
              Sign in
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
