import "../../Styles/ForgetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (email) {
      // Implement your password reset logic here
      alert(`A password reset link has been sent to ${email}`);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </button>
      <div className="auth-container">
        <div className="auth-card">
          <h3 className="auth-title">Reset Your Password</h3>
          <p className="auth-text">
            Enter your email address.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="auth-button" onClick={handleReset}>
            Send Reset Link
          </button>
          <p className="auth-footer-text">
            Remembered your password?{" "}
            <span onClick={() => navigate("/login")} className="auth-link">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
