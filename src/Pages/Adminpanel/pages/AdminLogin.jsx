import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // In your handleSubmit function
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      
      console.log('Login response:', response.data); // Add this to debug

      // Handle different response structures
      let token, user;
      
      if (response.data.token) {
        token = response.data.token;
      }
      
      if (response.data.user) {
        user = response.data.user;
      } else if (response.data.email && response.data.role) {
        // If user data is directly in the response
        user = {
          email: response.data.email,
          role: response.data.role
        };
      }
      
      if (!token || !user) {
        throw new Error('Invalid response format from server');
      }
      
      // Store the token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user));

      // Check role and redirect accordingly
      if (user.role === 'admin') {
        console.log('Admin login successful, redirecting to admin dashboard');
        navigate('/admin');
      } else {
        console.log('User login successful, redirecting to home');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError(error.message || 'Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;