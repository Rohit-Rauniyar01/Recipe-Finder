// import React from "react";
import '/src/Styles/Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src="src/assets/footerimage.png" alt="Recipe Finder Logo" />
        </div>

        {/* About Links */}
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Our Goals</a>
          <a href="#">Contact</a>
        </div>

        {/* Feedback Form */}
        <div className="footer-feedback">
          <h3>Send Feedback</h3>
          <p>
            Tell us what you like, what you would like to see, bug reports and
            support questions are all welcome!
          </p>
          <input type="email" placeholder="Email" />
          <textarea placeholder="Comments"></textarea>
          <button>Send</button>
        </div>
      </footer>

      <div className="footer-copyright">
        © Recipe-Finder All Right Reserved
      </div>
    </>
  );
};

export default Footer;
