import { useState } from "react";
import "/src/Styles/Login.css";   // Correct path to Login.css

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
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
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
          <div className="signup-link">
            <span>Didn&apos;t have an account? </span>
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
