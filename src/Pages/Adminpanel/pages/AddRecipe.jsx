// import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Paper, Snackbar, Alert } from '@mui/material';
import { categories } from "./Categories";

const AddRecipe = ({ addRecipe }) => {
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

      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Recipe added successfully:', data);
        addRecipe(data);
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
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Recipe
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Recipe Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                name="category"
                label="Category"
                onChange={handleInputChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2, mb: 2 }}>
              <input
                accept="image/*"
                type="file"
                id="recipe-image"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="recipe-image">
                <Button variant="contained" component="span">
                  Choose Image
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img 
                    src={imagePreview} 
                    alt="Recipe preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px', 
                      objectFit: 'cover' 
                    }} 
                  />
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              label="Ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
              placeholder="Format: Ingredient:Amount (one per line)&#10;Example:&#10;Strawberry:500g&#10;Sugar:1kg"
              helperText="Enter each ingredient with amount on a new line"
            />

            <TextField
              fullWidth
              label="Instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
              placeholder="Enter each instruction step on a new line"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              fullWidth
            >
              Add Recipe
            </Button>
          </form>
        </Paper>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

AddRecipe.propTypes = {
  addRecipe: PropTypes.func.isRequired
};

export default AddRecipe;
