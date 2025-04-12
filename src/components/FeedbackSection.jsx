import React from "react";
import { Link } from "react-router-dom";
import "./FeedbackSection.css"; // Importing the CSS file

const FeedbackSection = () => {
  return (
    <div className="feedback-container">
      <div className="column">
        <div className="left-section">
          <img src="src/assets/logo1.png" alt="Recipe Finder Logo" className="logo" />
        </div>
        <div className="navigation-column">
          <nav>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/goals">Our Goals</Link></li>
              <li><Link to="/support">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="right-section">
          <h2>Send Feedback</h2>
          <p>
            Tell us what you like, what you would like to see, bug reports, and
            support questions are all welcome!
          </p>
          <form>
            <input type="email" placeholder="Email" className="input-field" />
            <textarea placeholder="Comments" className="textarea-field"></textarea>
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      </div>
      <footer>© Recipe-Finder All Rights Reserved</footer>
    </div>
  );
};

export default FeedbackSection;
