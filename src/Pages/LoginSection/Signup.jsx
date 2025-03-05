import "../../Styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={24} />
      </button>
      <h3 className="signup-title">Create your account</h3>
      <div className="signup-container">
        <div className="signup-card">
          <input type="text" placeholder="Username" className="signup-input" />
          <input type="text" placeholder="Username or Email" className="signup-input" />
          <input type="password" placeholder="Password" className="signup-input" />
          <button className="signup-button">Sign up</button>
          <p className="signin-text">
            Already got an account?  
            <a onClick={() => navigate("/login")} className="signin-link"> Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
