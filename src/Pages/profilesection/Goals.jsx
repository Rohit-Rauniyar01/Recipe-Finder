import "react";
import { useNavigate } from "react-router-dom";
import "./Goals.css"; // Import the CSS file for styling
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon

function Goals() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="goals-container">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoArrowBack size={24} />
      </button>

      {/* Content */}
      <h1>Our Goals</h1>
      <p>
        Our mission is to make delicious recipes accessible to everyone. By
        offering a carefully curated selection of dishes, we aim to ignite your
        passion for cooking and help you create memorable meals at home.
        Explore, experiment, and bring the joy of cooking into your kitchen
        with ease!
      </p>
    </div>
  );
}

export default Goals;
