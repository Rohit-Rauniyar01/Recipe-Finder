import "react";
import "/src/Styles/Navbar.css";
// import logo from "src\assets\logo1.png"; // Replace with the path to your logo

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo1.png" alt="Recipe Finder Logo" />
      </div>
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Recipe</li>
        <li>Ingredient</li>
        <li>Search</li>
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
