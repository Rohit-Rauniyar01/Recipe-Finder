import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/src/Styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting login with:", { email: username, password });
      
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: username, // Using username field for email
        password,
      });

      console.log("Login response:", response.data);

      if (response.data && response.data.token && response.data.user) {
        // Store token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        // Also store with 'user' key for compatibility with other components
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Navigate based on role
        if (response.data.user.role === 'admin') {
          console.log('Admin login successful, redirecting to admin dashboard');
          navigate("/admin");
        } else {
          console.log('User login successful, redirecting to home');
          // Redirect to home page instead of profile
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred during login. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign in to your account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="signup-link">
            <span>Don&apos;t have an account? </span>
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
