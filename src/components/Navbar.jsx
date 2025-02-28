import  "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "/src/Styles/Navbar.css";
// import logo from "src/assets/logo1.png"; // Replace with the correct path to your logo

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipe">Recipe</Link></li>
        <li><Link to="/ingredient">Ingredient</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/goal">Goals</Link></li> {/* Corrected Link */}
        <li>
          <button className="signin-button">Sign in</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
