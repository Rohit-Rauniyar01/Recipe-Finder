import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import RecipePage from './Pages/RecipePage';
import LoginPage from './Pages/LoginSection/Login';
import SignUpPage from './Pages/LoginSection/Signup';  // ✅ Import SignUpPage
import ForgotPassword from './Pages/LoginSection/Forgetpassword';  // ✅ Import ForgotPassword


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home page */}
        <Route path="/recipe" element={<RecipePage />} />  {/* Recipe page */}
        <Route path="/login" element={<LoginPage />} />  {/* Login page */}
        <Route path="/signup" element={<SignUpPage />} />  {/* ✅ Signup page added */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Forgot Password page added */}x 
      </Routes>
    </Router>
  </StrictMode>
);
