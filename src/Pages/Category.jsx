import { useNavigate } from "react-router-dom";
import "../Styles/Category.css";

const categories = [
  { name: "Vegetarian", image: "https://www.themealdb.com/images/category/vegetarian.png" },
  { name: "Chicken", image: "https://www.themealdb.com/images/category/chicken.png" },
  { name: "Seafood", image: "https://www.themealdb.com/images/category/seafood.png" },
  { name: "Dessert", image: "https://www.themealdb.com/images/category/Dessert.png" },
];

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="category-container">
      <h2 className="category-title">Looking for inspiration?</h2>
      <h3>To make something new</h3>
      <div className="category-section">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => navigate(`/recipes/${category.name}`)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
