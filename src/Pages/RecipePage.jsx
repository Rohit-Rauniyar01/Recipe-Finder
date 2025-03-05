import "../Styles/Recipe.css";

// Updated `recipes` array with Indian food items.
const recipes = [
  { id: 1, name: 'Butter Chicken', image: 'src/assets/paneertika.jpg' },
  { id: 2, name: 'Paneer Tikka', image: 'src/assets/paneertika.jpg' },
  { id: 3, name: 'Biryani', image: 'src/assets/paneertika.jpg' },
  { id: 4, name: 'Masoor Dal', image: 'src/assets/paneertika.jpg' },
  { id: 5, name: 'Chole Bhature', image: 'src/assets/paneertika.jpg' },
  { id: 6, name: 'Palak Paneer', image: 'src/assets/paneertika.jpg' },
  { id: 7, name: 'Aloo Gobi', image: 'src/assets/paneertika.jpg' },
  { id: 8, name: 'Rogan Josh', image: 'src/assets/paneertika.jpg' },
  { id: 9, name: 'Tandoori Chicken', image: 'src/assets/paneertika.jpg' },
  { id: 10, name: 'Samosa', image: 'src/assets/paneertika.jpg' },
  { id: 11, name: 'Dosa', image: 'src/assets/paneertika.jpg' },
  { id: 12, name: 'Pav Bhaji', image: 'src/assets/paneertika.jpg' },
  // Add more recipes with images as needed
];

const RecipePage = () => {
  return (
    <div className="recipe-page">
      {/* "RECIPE" title */}
      <h2 className="recipe-heading">RECIPE</h2>

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="recipe-image" 
            />
            <h2 className="recipe-name">{recipe.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
