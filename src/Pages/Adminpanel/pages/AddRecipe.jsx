import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: null,
    ingredients: '',
    instructions: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    // TODO: Implement API call to save recipe
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
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="dessert">Dessert</MenuItem>
                <MenuItem value="snack">Snack</MenuItem>
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
              placeholder="Enter ingredients (one per line)"
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
              placeholder="Enter cooking instructions"
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
    </Container>
  );
};

export default AddRecipe;
