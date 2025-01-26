import "react";
import "/src/Styles/Navbar.css";
// import logo from "src\assets\logo1.png"; // Replace with the path to your logo

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src\assets\logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Recipe</li>
        <li>Ingredient</li>
        <li>Trending</li>
        <li>Search</li>
        <li>
          <button className="signin-button">Sign in</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;




// git remote add origin https://github.com/Rohit-Rauniyar01/Recipe-Finder-using-React.git
// git branch -M main
// git push -u origin main