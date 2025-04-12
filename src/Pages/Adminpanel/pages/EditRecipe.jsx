import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/EditRecipe.css';
import { categories } from "./Categories";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe data when component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        
        const data = await response.json();
        
        // Populate form with recipe data
        setFormData({
          name: data.name || '',
          category: data.category || '',
          image: null, // Can't set File object from API response
          ingredients: data.ingredients || '',
          instructions: data.instructions || ''
        });
        
        // Set image preview if available
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to load recipe. Please try again.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

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
        message: 'Updating recipe...',
        severity: 'info'
      });

      // Add console logs to debug the request
      console.log('Sending updated recipe data:', {
        name: formData.name,
        category: formData.category,
        hasImage: !!formData.image
      });

      // Use PUT or PATCH method for updating
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Recipe updated successfully:', data);
        setSnackbar({
          open: true,
          message: 'Recipe updated successfully!',
          severity: 'success'
        });
        
        // Navigate back to recipe list after successful update
        setTimeout(() => {
          navigate('/admin/recipes');
        }, 2000);
      } else {
        console.error('Server error:', data);
        setSnackbar({
          open: true,
          message: data.message || 'Failed to update recipe. Please try again.',
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

  const handleCancel = () => {
    navigate('/admin/recipes');
  };

  if (loading) {
    return <div className="loading-message">Loading recipe data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-recipe-container">
      <div className="recipe-form-card">
        <h1 className="form-title">Edit Recipe</h1>
        
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
                  {imagePreview ? 'Change Image' : 'Upload Image'}
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
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Update Recipe
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

export default EditRecipe;