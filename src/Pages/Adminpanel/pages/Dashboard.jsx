import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    vegetarianRecipes: 0,
    chickenRecipes: 0,
    seafoodRecipes: 0,
    dessertRecipes: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get user info from localStorage
        const token = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        
        // Check if user is admin
        if (!token || userInfo.role !== 'admin') {
          console.log('Not an admin, redirecting to login');
          navigate('/admin/login');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Use Promise.all to fetch all data in parallel
        const [
          recipesResponse,
          usersResponse,
          vegetarianResponse,
          chickenResponse,
          seafoodResponse,
          dessertResponse
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/recipes/count', { headers }),
          axios.get('http://localhost:5000/api/users/count', { headers }),
          axios.get('http://localhost:5000/api/recipes/count/category/vegetarian', { headers }),
          axios.get('http://localhost:5000/api/recipes/count/category/chicken', { headers }),
          axios.get('http://localhost:5000/api/recipes/count/category/seafood', { headers }),
          axios.get('http://localhost:5000/api/recipes/count/category/dessert', { headers })
        ]);
        
        setStats({
          totalRecipes: recipesResponse.data.count || 0,
          totalUsers: usersResponse.data.count || 0,
          vegetarianRecipes: vegetarianResponse.data.count || 0,
          chickenRecipes: chickenResponse.data.count || 0,
          seafoodRecipes: seafoodResponse.data.count || 0,
          dessertRecipes: dessertResponse.data.count || 0,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        let errorMessage = 'Failed to load dashboard statistics';
        
        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = 'Access denied. Admin privileges required.';
            // Redirect to login if access denied
            navigate('/login');
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        setStats(prevStats => ({
          ...prevStats,
          loading: false,
          error: errorMessage
        }));
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="dashboard-content">
      {stats.error && <div className="error-message">{stats.error}</div>}
      
      <div className="stats-grid">
        <div className="stats-card">
          <h3>No. of Recipes</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.totalRecipes}
          </div>
        </div>
        <div className="stats-card">
          <h3>No. of Users</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.totalUsers}
          </div>
        </div>
        <div className="stats-card">
          <h3>Vegetarian Recipes</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.vegetarianRecipes}
          </div>
        </div>
        <div className="stats-card">
          <h3>Chicken</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.chickenRecipes}
          </div>
        </div>
        <div className="stats-card">
          <h3>Seafood</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.seafoodRecipes}
          </div>
        </div>
        <div className="stats-card">
          <h3>Dessert</h3>
          <div className="number">
            {stats.loading ? <div className="loading-spinner"></div> : stats.dessertRecipes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;