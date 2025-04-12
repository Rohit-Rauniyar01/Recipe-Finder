import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../Styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    
    try {
      console.log("Attempting signup with:", { username, email, password: "***" });
      
      // Add timeout to the request to prevent hanging
      // Update the axios request URL to ensure it's correct
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Signup response:', response.data);
      
      if (response.data && response.data.user) {
        alert(response.data.message || "Signup successful! You can now login.");
        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
        // Navigate to login page after successful signup
        navigate("/login");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        
        // More detailed error message
        setError(
          error.response.data.message || 
          error.response.data.error || 
          `Server error (${error.response.status}): Please try again.`
        );
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError("No response from server. Please check if the server is running at http://localhost:5000");
      } else {
        console.error('Error message:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
            minLength="6"
          />
        </div>
        <button 
          className="signup-btn" 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;