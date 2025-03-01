import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import HomePage from "./Pages/HomeSection/HomePage"; 
import RecipeListPage from "./Pages/HomeSection/ReceipeListPage"; 
import Login from "./Pages/profilesection/Login"; 
import Signup from "./Pages/profilesection/Signup"; 
import Navbar from "./components/Navbar";
import AdminLayout from "./Pages/Adminpanel/layouts/AdminLayout";
import Dashboard from "./Pages/Adminpanel/pages/Dashboard";
import UserManagement from "./Pages/Adminpanel/pages/UserManagement";
import RecipeManagement from "./Pages/Adminpanel/pages/RecipeManagement";
import Categories from "./Pages/Adminpanel/pages/Categories";
import Settings from "./Pages/Adminpanel/pages/Settings";
import AddRecipe from "./Pages/Adminpanel/pages/AddRecipe";
import RecipeList from "./Pages/Adminpanel/pages/RecipeList";
import "./Styles/App.css"; // Global styles

// Protected Route component for admin routes
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="recipes" element={<RecipeManagement />} />
            <Route path="recipes/add" element={<AddRecipe />} />
            <Route path="recipes/list" element={<RecipeList />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Main App Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes/:category" element={<RecipeListPage />} />
                  </Routes>
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
