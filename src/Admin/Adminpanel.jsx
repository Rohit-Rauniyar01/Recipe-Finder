import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/Styles/Adminpanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove login status
    navigate("/login"); // Redirect to login page
  };

  const data = {
    recipes: 255,
    users: 255,
    vegetarianRecipes: 255,
    nonVegetarianRecipes: 255,
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin</h2>
        <button className="menu-btn">Dashboard</button>
        <button className="menu-btn">Add Recipes</button>
        <button className="menu-btn">List of Recipes</button>
        <button className="logout-btn" onClick={handleLogout}>
          LogOut
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          <div className="card">
            <h3>No. of Recipes</h3>
            <p>{data.recipes}</p>
          </div>
          <div className="card">
            <h3>No. of Users</h3>
            <p>{data.users}</p>
          </div>
          <div className="card">
            <h3>Vegetarians Recipes</h3>
            <p>{data.vegetarianRecipes}</p>
          </div>
          <div className="card">
            <h3>Non-Vegetarians Recipes</h3>
            <p>{data.nonVegetarianRecipes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
