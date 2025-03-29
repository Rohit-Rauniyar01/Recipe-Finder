import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Grid, Typography, Card, CardMedia, CardContent, CardActionArea, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Styles/Search.css";

const BASE_URL = "http://localhost:5000";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (term) => {
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    saveRecentSearch(searchTerm);

    try {
      const response = await fetch(`${BASE_URL}/api/recipes/search?term=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search recipes. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    // Trigger search immediately when clicking a recent search
    const searchEvent = { preventDefault: () => {} };
    handleSearch(searchEvent);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.category}/ingredient/${recipe.id}`);
  };

  return (
    <Container maxWidth="lg" className="search-container">
      <div className="search-box">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search all Recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          InputProps={{
            endAdornment: (
              <Button 
                onClick={handleSearch}
                variant="contained" 
                className="search-button"
                disabled={loading}
              >
                Search
              </Button>
            )
          }}
        />
        
        {/* Moved recent searches directly below the text field */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <Typography variant="h6" component="h2">
              Recent Search
            </Typography>
            <div className="recent-search-chips">
              {recentSearches.map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  onClick={() => handleRecentSearchClick(term)}
                  className="recent-search-chip"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <Typography color="error" className="search-error">
          {error}
        </Typography>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          <Typography variant="h6" component="h2" className="results-title">
            Searched Result
          </Typography>
          <Grid container spacing={2}>
            {searchResults.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={recipe.image_url ? `${BASE_URL}${recipe.image_url}` : "/placeholder-image.png"}
                    alt={recipe.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                  <div className="recipe-title-overlay">
                    <Typography variant="subtitle1" component="div">
                      {recipe.name}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {!loading && searchTerm && searchResults.length === 0 && (
        <Typography className="no-results">
          No recipes found. Try a different search term.
        </Typography>
      )}
    </Container>
  );
};

export default Search;