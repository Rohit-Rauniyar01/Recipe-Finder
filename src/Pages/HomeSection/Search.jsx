import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/Search.css";

const BASE_URL = "http://localhost:5000";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Get user email from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userEmail = userInfo.email || user.email;
    
    // If user is logged in, fetch their favorites
    if (userEmail) {
      const fetchFavorites = async () => {
        try {
          const favResponse = await axios.get(`${BASE_URL}/api/favorites/${userEmail}`);
          setFavorites(favResponse.data);
        } catch (favErr) {
          console.error("Error fetching favorites:", favErr);
        }
      };
      
      fetchFavorites();
    }
  }, []);

  const saveRecentSearch = (term) => {
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearch = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    saveRecentSearch(searchTerm);

    try {
      // Search by both name and category
      const response = await axios.get(`${BASE_URL}/api/recipes/search`, {
        params: {
          term: searchTerm
        }
      });
      
      setSearchResults(response.data);
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
    // Use setTimeout to ensure state is updated before search
    setTimeout(() => {
      handleSearch();
    }, 0);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.category || 'all'}/ingredient/${recipe.id}`);
  };

  const handleImageError = (id) => {
    setImgErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
  };
  
  const toggleFavorite = async (e, recipe) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Get user email from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userEmail = userInfo.email || user.email;
    
    if (!userEmail) {
      alert("Please log in to save favorites");
      navigate('/login');
      return;
    }
    
    try {
      const isFavorite = favorites.some(fav => fav.recipe_id === recipe.id);
      
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${BASE_URL}/api/favorites/${userEmail}/${recipe.id}`);
        setFavorites(favorites.filter(fav => fav.recipe_id !== recipe.id));
      } else {
        // Add to favorites
        const response = await axios.post(`${BASE_URL}/api/favorites`, {
          email: userEmail,
          recipe_id: recipe.id
        });
        setFavorites([...favorites, response.data]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.recipe_id === recipeId);
  };

  return (
    <Container 
      className="searchcontainerbox1" 
      maxWidth={false}
      disableGutters
    >
      <div className="search-box1">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search recipes by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
          InputProps={{
            endAdornment: (
              <Button 
                onClick={handleSearch}
                variant="contained" 
                className="search-button"
                disabled={loading}
                size="medium"
              >
                Search
              </Button>
            ),
            sx: { paddingRight: '8px' }
          }}
        />
        
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <Typography variant="h6" component="h2">
              Recent Searches
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

      {loading ? (
        <p className="loading-message">⏳ Searching for &quot;{searchTerm}&quot;...</p>
      ) : searchResults.length > 0 ? (
        <div className="search-results">
          <div className="recipe-cards-container">
            {searchResults.map((recipe) => {
              const imageUrl =
                imgErrors[recipe.id] || !recipe.image_url
                  ? "/placeholder-image.png"
                  : recipe.image_url.startsWith("http")
                  ? recipe.image_url
                  : `${BASE_URL}${recipe.image_url}`;

              return (
                <div
                  className="recipe-cardbox"
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                >
                  {/* Favorite Heart Icon */}
                  <div 
                    className={`favorite-icon ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                    onClick={(e) => toggleFavorite(e, recipe)}
                  >
                    ❤
                  </div>
                  <div className="image-container">
                    <img
                      src={imageUrl}
                      alt={recipe.name}
                      onError={() => handleImageError(recipe.id)}
                    />
                  </div>
                  <div className="recipe-name">{recipe.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        !loading && searchTerm && (
          <Typography className="no-results">
            No recipes found for &quot;{searchTerm}&quot;. Try a different search term.
          </Typography>
        )
      )}
    </Container>
  );
};

export default Search;