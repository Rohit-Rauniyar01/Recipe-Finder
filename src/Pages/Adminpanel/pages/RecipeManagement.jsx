import { useState } from 'react';
import axios from 'axios';
import '../styles/RecipeManagement.css';

const RecipeManagement = () => {
  const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);

    try {
      const response = await axios.post('http://localhost:5000/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form on success
      setRecipeName('');
      setCategory('');
      setImage(null);
      setIngredients('');
      setInstructions('');

      alert('Recipe added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="recipe-management">
      <h2>Add Recipe</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label>Name of Recipe</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter recipe name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Recipe Category</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="dessert">Dessert</option>
            <option value="breakfast">Breakfast</option>
          </select>
        </div>

        <div className="form-group">
          <label>Choose Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>List of Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (one per line)"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter cooking instructions"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default RecipeManagement; 