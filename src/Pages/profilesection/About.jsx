import "react";
import "../../Styles/About.css";
import { FaRss, FaHeart } from "react-icons/fa";

const About = () => {

  return (
    <div className="about-us-container">

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
  );
};

export default About;