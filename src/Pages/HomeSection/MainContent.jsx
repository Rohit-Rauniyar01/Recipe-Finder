import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import HomeTrending from "./HomeTrending";
import "../../Styles/MainContent.css";
import homeImage from "/src/assets/homeimage.png";

const MainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status whenever the component renders or location changes
  useEffect(() => {
    checkLoginStatus();
  }, [location]);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const loggedIn = !!token || !!userInfo.email || !!user.email;
    setIsLoggedIn(loggedIn);
    
    // If not logged in and not on home page, redirect to login
    if (!loggedIn && location.pathname !== "/") {
      navigate("/login");
    }
  };

  const handleClick = (e) => {
    // If user is not logged in, navigate to login page
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="main-containerbox">
      <div className="image-container">
        <img src={homeImage} alt="Home" className="home-image" />
        <div className="overlay-card">
          <div className="card-text">
            <h2>What can I make with...</h2>
            <p>
            Our recipe finder tool will show you all the things you can make, 
            So none of your food goes to waste, with only a few added ingredients needed.
            </p>
          </div>
        </div>
      </div>

      <div className="middle-text">
        <h3>Looking for inspiration?</h3>
        <p>Discover new recipes based on what you already have.</p>
      </div>
      
      {/* Wrap protected content in conditional rendering */}
      {isLoggedIn ? (
        <>
          <CategoryPage />
          <HomeTrending />
        </>
      ) : (
        <div className="login-prompt" onClick={() => navigate("/login")}>
          <h3>Please log in to view recipes</h3>
          <button className="login-button">Log In</button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
