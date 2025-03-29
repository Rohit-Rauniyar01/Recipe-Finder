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

    // Check for admin credentials
    if (username === "admin" && password === "123") {
      // Store admin status in localStorage
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("user", JSON.stringify({ username: "admin", role: "admin" }));
      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: username, // Using username field for email
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
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
            <label className="input-label">Username/Email:</label>
            <input
              type="text"
              placeholder="Enter your username or email"
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
