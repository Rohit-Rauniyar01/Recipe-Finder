import React from "react";
import "./OurGoals.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OurGoals = () => {
  const navigate = useNavigate();

  return (
    <div className="our-goals-container">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </div>
      <div className="content">
        <h2>Our Goals</h2>
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

export default OurGoals;
