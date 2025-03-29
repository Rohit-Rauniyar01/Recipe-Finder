import "../Styles/Navbar.css";
import { useNavigate } from "react-router-dom";

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
        <li onClick={() => navigate("/trending")}>Trending</li>
        <li onClick={() => navigate("/search")}>Search</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li>
          <button className="signin-button" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;