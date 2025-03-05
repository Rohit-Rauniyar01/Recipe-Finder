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
import Footer from "./components/Footer";
import AdminPanel from "./Admin/Adminpanel";
import AddRecipe from "./Admin/AddRecipe";

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/signup", "/forgot-password", "/admin", "/add-recipe"];

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
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

// ✅ Wrap App inside <BrowserRouter>
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* ✅ Fix: Ensure App is inside BrowserRouter */}
      <App />
    </Router>
  </StrictMode>
);
