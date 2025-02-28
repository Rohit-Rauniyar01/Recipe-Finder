import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import RecipePage from "./Pages/RecipePage";
import Trending from "./Pages/Trending";
import RecipeSearch from "./Pages/Search";
import LoginPage from "./Pages/LoginSection/Login";
import SignUpPage from "./Pages/LoginSection/Signup";
import ForgotPassword from "./Pages/LoginSection/Forgetpassword";
import Footer from "./components/Footer"; // Import Footer
import AdminPanel from "./Admin/Adminpanel"; // ✅ Fixed Admin Panel path
import AddRecipe from "./Admin/AddRecipe";

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/signup", "/forgot-password", "/admin", "/add-recipe"]; // Hide Footer on Admin Panel

  return (
    <>
      <Routes>
        {/* Routes WITHOUT Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminPanel />} /> {/* ✅ Added AdminPanel Route */}
        <Route path="/add-recipe" element={<AddRecipe />} /> {/* ✅ Added AddRecipe Route */}

        {/* Routes WITH Footer */}
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<RecipeSearch />} />
      </Routes>

      {/* Show Footer only if the current route is NOT in hideFooterRoutes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
