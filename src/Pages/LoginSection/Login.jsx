import "/src/Styles/Login.css";
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <h3 className="login-title">Sign in to your account</h3> {/* Moved outside the container */}
      <div className="login-container">
        <div className="login-card">
          <input type="text" placeholder="Username or Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forget Password?</a>
          </div>
          <button className="login-button">Login</button>
          <p className="signup-text">
            Didn’t have an account? <a href="#" className="signup-link">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
