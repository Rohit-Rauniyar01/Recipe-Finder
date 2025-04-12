import "../Styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // 👈 Import profile icon
import { useState, useEffect } from "react"; // Add these imports

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/recipes")}>Recipe</li>
        <li onClick={() => navigate("/trending")}>Trending</li>
        <li onClick={() => navigate("/search")}>Search</li>

        {/* Conditionally render profile icon or sign in button */}
        {isLoggedIn ? (
          <li onClick={() => navigate("/profile")}>
            <FaUserCircle size={24} />
          </li>
        ) : (
          <li>
            <button className="signin-button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
