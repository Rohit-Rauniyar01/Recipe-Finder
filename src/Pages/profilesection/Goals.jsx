// import React from "react";
import "../../Styles/Goals.css";

import foodBanner from "/src/assets/food-banner.png"; 

const Goals = () => {


  return (
    <div className="our-goals-container">
      <div className="hero-banner" style={{ backgroundImage: `url(${foodBanner})` }}>
        <div className="overlay-text">
          <h1>Our Goal: Inspire Your Inner Chef</h1>
        </div>
      </div>
      
      <div className="content-card">
        <h2>What We Aim To Achieve</h2>
        <p>
          Our mission is to make delicious recipes accessible to everyone. By offering a carefully
          curated selection of dishes, we aim to ignite your passion for cooking and help you
          create memorable meals at home. Explore, experiment, and bring the joy of cooking into
          your kitchen with ease!
        </p>
      </div>
    </div>
  );
};

export default Goals;