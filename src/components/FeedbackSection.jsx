import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeedbackSection.css"; // Importing the CSS file

const FeedbackSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Check if user is logged in using token or user info
    setIsLoggedIn(!!token || !!userInfo.email || !!user.email);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Check login before any action
  const checkLoginAndProceed = (callback) => {
    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleNavigation = (path) => {
    if (checkLoginAndProceed()) {
      navigate(path);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in before submitting
    if (!checkLoginAndProceed()) {
      return;
    }
    
    // Validate form
    if (!formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please fill in all required fields"
      });
      return;
    }
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      // Send feedback to backend
      await axios.post("http://localhost:5000/api/feedback", formData);
      
      // Reset form and show success message
      setFormData({ name: "", email: "", message: "" });
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      // Error handling code remains the same
      console.error("Error sending feedback:", error);
      
      // Store feedback in localStorage as a fallback
      try {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toISOString()
        });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        
        // Reset form and show partial success message
        setFormData({ name: "", email: "", message: "" });
        setStatus({
          submitting: false,
          success: false,
          error: "Email service is currently unavailable, but we've saved your feedback locally."
        });
      } catch (storageError) {
        setStatus({
          submitting: false,
          success: false,
          error: "Failed to send feedback. Please try again later."
        });
      }
    }
  };

  return (
    <div className="feedback-container">
      <div className="column">
        <div className="left-section">
          <img src="src/assets/logo1.png" alt="Recipe Finder Logo" className="logo" />
        </div>
        <div className="navigation-column">
          <nav>
            <ul>
              <li onClick={() => handleNavigation("/about")}>About</li>
              <li onClick={() => handleNavigation("/goals")}>Our Goals</li>
            </ul>
          </nav>
        </div>
        <div className="right-section">
          <h2>Send Feedback</h2>
          <p>
            Tell us what you like, what you would like to see, bug reports, and
            support questions are all welcome!
          </p>
          
          {status.success && (
            <div className="success-message">
              Thank you for your feedback! We'll get back to you soon.
            </div>
          )}
          
          {status.error && (
            <div className="error-message">{status.error}</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              className="input-field"
              value={formData.name}
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea 
              name="message"
              placeholder="Comments" 
              className="textarea-field"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button 
              type="submit" 
              className="send-button"
              disabled={status.submitting}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
            >
              {status.submitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      <footer>© Recipe-Finder All Rights Reserved</footer>
    </div>
  );
};

export default FeedbackSection;
