import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AddRecipe.css';
import { categories } from "./Categories";

const AddRecipe = ({ addRecipe = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: null,
    ingredients: '',
    instructions: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      image: null,
      ingredients: '',
      instructions: ''
    });
    setImagePreview(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Auto-hide snackbar after 6 seconds
  if (snackbar.open) {
    setTimeout(() => {
      handleCloseSnackbar();
    }, 6000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.category || !formData.ingredients || !formData.instructions) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('category', formData.category.trim());
    formDataToSend.append('ingredients', formData.ingredients.trim());
    formDataToSend.append('instructions', formData.instructions.trim());
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      setSnackbar({
        open: true,
        message: 'Adding recipe...',
        severity: 'info'
      });

      // Add console logs to debug the request
      console.log('Sending recipe data:', {
        name: formData.name,
        category: formData.category,
        hasImage: !!formData.image
      });

      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Recipe added successfully:', data);
        if (addRecipe) addRecipe(data.recipe);
        resetForm();
        setSnackbar({
          open: true,
          message: 'Recipe added successfully!',
          severity: 'success'
        });
      } else {
        console.error('Server error:', data);
        setSnackbar({
          open: true,
          message: data.message || 'Failed to add recipe. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setSnackbar({
        open: true,
        message: 'Network error. Please check your connection and try again.',
        severity: 'error'
      });
    }
  };

  return (
    <div className="add-recipe-container">
      <div className="recipe-form-card">
        <h1 className="form-title">Add New Recipe</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label required-field">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category" className="form-label required-field">Category</label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="image-upload-container">
            <label htmlFor="image-upload" className="form-label">Recipe Image</label>
            <div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <button 
                  type="button" 
                  className="upload-button" 
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  Upload Image
                </button>
              </label>
            </div>
            
            {imagePreview && (
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Recipe preview" 
                  className="preview-image"
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="ingredients" className="form-label required-field">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="form-textarea"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="Enter each ingredient on a new line"
              required
              rows={4}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="instructions" className="form-label required-field">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-textarea"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Enter step-by-step instructions"
              required
              rows={6}
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="reset-button"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
      
      {snackbar.open && (
        <div className={`snackbar snackbar-${snackbar.severity}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

AddRecipe.propTypes = {
  addRecipe: PropTypes.func
};

export default AddRecipe;