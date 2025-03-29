import  { useState } from "react";
import "../../Styles/Supports.css";

const Supports = () => {
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Backend not implemented)");
  };

  return (
    <div className="contact-container">
      <div className="back-arrow">
        <a href="javascript:history.back();">
          <i className="fas fa-arrow-left"></i>
        </a>
      </div>

      <div className="contact-content">
        <h2>Contact / Support</h2>
        <p>
          Tell us what you like, what you would like to see, bug reports, and
          support questions are all welcome!
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            name="comments"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Supports;