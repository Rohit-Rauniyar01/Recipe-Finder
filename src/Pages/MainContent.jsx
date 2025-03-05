import "/src/Styles/MainContent.css";  
import CategoryPage from "./Category";

const MainContent = () => {
  return (
    <div className="main-content">
      <img src="/src/assets/homeimage.png" alt="Home" className="home-image" />
      <div className="category-container"> 
        <CategoryPage /> 
      </div>
    </div>
  );
};

export default MainContent;
