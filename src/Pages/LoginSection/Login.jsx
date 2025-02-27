import "../../Styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      localStorage.removeItem("isUser"); // Ensure only one role is set
      navigate("/admin");
    } else if (username && password) {
      localStorage.setItem("isUser", "true");
      localStorage.removeItem("isAdmin"); // Ensure only one role is set
      navigate("/");
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={24} />
      </button>
      <h3 className="login-title">Sign in to your account</h3>
      <div className="login-container">
        <div className="login-card">
          <input
            type="text"
            placeholder="Username or Email"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <button
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="signup-text">
            Don’t have an account?{" "}
            <button
              className="signup-link"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
