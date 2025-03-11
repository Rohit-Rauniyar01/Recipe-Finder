import  "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomeSection/HomePage"; 
import RecipeListPage from "./Pages/HomeSection/ReceipeListPage"; 
import Login from "./Pages/profilesection/Login"; 
import Signup from "./Pages/profilesection/Signup"; 
import Navbar from "./components/Navbar";
import "./Styles/App.css"; // Global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
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
