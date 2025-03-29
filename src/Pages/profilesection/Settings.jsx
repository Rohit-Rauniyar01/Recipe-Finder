import  { useState } from "react";
import "../../Styles/Settings.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPopupMessage("Passwords don't match!");
      setPopupType("error");
    } else {
      setPopupMessage("Password changed successfully!");
      setPopupType("success");
    }
  };

  return (
    <div className="change-password-container">
      <div className="back-container">
        <a href="/settings">
          <i className="fas fa-arrow-left"></i>
        </a>
      </div>
      <div className="setting-container">
      </div>
      <div className="main-container">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">Change it</button>
          </div>
        </form>
      </div>
      {popupMessage && (
        <div className={`popup ${popupType}`}>
          <i className={popupType === "success" ? "fas fa-check-circle" : "fas fa-times-circle"}></i>
          <h4>{popupMessage}</h4>
          <button onClick={() => setPopupMessage(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;