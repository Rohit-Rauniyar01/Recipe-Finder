import { useState } from "react";
import "../../Styles/Settings.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setPopupMessage("Passwords don't match!");
      setPopupType("error");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPopupMessage("Password must be at least 6 characters long!");
      setPopupType("error");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setPopupMessage("You must be logged in to change your password");
        setPopupType("error");
        setLoading(false);
        return;
      }

      // Make API call to change password
      const response = await axios.put(
        "http://localhost:5000/api/change-password",
        { 
          currentPassword, 
          newPassword 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPopupMessage("Password changed successfully!");
      setPopupType("success");
      
      // Clear form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response) {
        setPopupMessage(error.response.data.message || "Failed to change password");
      } else {
        setPopupMessage("Network error. Please try again.");
      }
      setPopupType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="settings-container">
      
      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
      
      {popupMessage && (
        <div className={`popup ${popupType}`}>
          <div className="popup-content">
            <span className={`popup-icon ${popupType}`}></span>
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;