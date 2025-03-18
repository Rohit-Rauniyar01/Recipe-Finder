import "react";
import "./About.css";
import { FaArrowLeft, FaRss, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-container">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </div>
      
      <div className="hero">
        <h1>About Us</h1>
      </div>

      <div className="content">
        <h2>Discover the Joy of Cooking</h2>
        <p>
          Our platform is designed for food enthusiasts to explore a wide variety of recipes curated by our expert team.
          Whether you’re a beginner or a seasoned cook, you’ll find dishes to inspire your culinary adventures.
          Learn, create, and enjoy cooking like never before!
        </p>

        <div className="icon-section">
          <div className="icon-box">
            <FaRss className="icon" />
            <h4>Activity Feed</h4>
            <p>See recent activity like &quot;Tried a new Recipe&quot; or &quot;Saved a favorite.&quot;</p>
          </div>

          <div className="icon-box">
            <FaHeart className="icon" />
            <h4>Favorite Recipes</h4>
            <p>A section where you can easily view recipes you’ve favorited or saved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
