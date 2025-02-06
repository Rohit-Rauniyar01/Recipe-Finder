import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import React Router

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginSection/Login';  // Import LoginPage
import Navbar from './components/Navbar';  // Import Navbar if you want it globally

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />  {/* Navbar will be displayed on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home page route */}
        <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
      </Routes>
    </Router>
  </StrictMode>
);
