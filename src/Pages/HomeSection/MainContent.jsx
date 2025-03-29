import CategoryPage from "./CategoryPage";
import "../../Styles/MainContent.css";
import homeImage from "/src/assets/homeimage.png";

const MainContent = () => {
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
      <CategoryPage />
       
    </div>
  );
};

export default MainContent;
