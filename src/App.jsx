// import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import HomePage from "./Pages/HomeSection/HomePage";
import MainContent from "./Pages/HomeSection/MainContent";
import RecipeListPage from "./Pages/HomeSection/RecipeListPage";
import Ingredient from "./Pages/HomeSection/Ingredient";
import Login from "./Pages/profilesection/Login";
import Signup from "./Pages/profilesection/Signup";
import Profile from "./Pages/profilesection/Profile";
import EditName from "./Pages/profilesection/EditName";
import Favourites from "./Pages/profilesection/Favorites";
import Goals from "./Pages/profilesection/Goals";
import About from "./Pages/profilesection/About";
import Supports from "./Pages/profilesection/Supports";
import Settings from "./Pages/profilesection/Settings";

import Navbar from "./components/Navbar";
import AdminLayout from "./Pages/Adminpanel/layouts/AdminLayout";
import Dashboard from "./Pages/Adminpanel/pages/Dashboard";
import AddRecipe from "./Pages/Adminpanel/pages/AddRecipe";
import RecipeList from "./Pages/Adminpanel/pages/RecipeList";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Trending from "./Pages/HomeSection/Trending";
import RecipePage from "./Pages/HomeSection/RecipePage";
import Search from "./Pages/HomeSection/Search";
import FeedbackSection from "./components/FeedbackSection";

import "./Styles/App.css";

// NavbarWrapper component to conditionally render Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return isAdminRoute || isAuthPage ? null : <Navbar />;
};

// FeedbackWrapper component to conditionally render FeedbackSection
const FeedbackWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isProfileRoute = location.pathname.startsWith("/profile") || 
                         location.pathname === "/favorites" || 
                         location.pathname === "/goals" || 
                         location.pathname === "/about" || 
                         location.pathname === "/support" || 
                         location.pathname === "/settings";

  return isAdminRoute || isAuthPage || isProfileRoute ? null : <FeedbackSection />;
};

const App = () => {
  return (
    <Router>
      <NavbarWrapper />
      <div className="content">
        <Routes>
          {/* Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="recipes/add" element={<AddRecipe />} />
              <Route path="recipes/list" element={<RecipeList />} />
            </Route>
          </Route>

          {/* Main App Routes */}
          <Route path="/" element={<MainContent />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:category" element={<RecipeListPage />} />
          <Route path="/recipes/:category/ingredient/:id" element={<Ingredient />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditName />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Supports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <FeedbackWrapper />
    </Router>
  );
};

export default App;