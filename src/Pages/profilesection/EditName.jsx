import { useState, useEffect } from "react";
import "../../Styles/EditName.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditName = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [currentName, setCurrentName] = useState("Guest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Get user data from localStorage using the correct key "userInfo"
    const userInfoString = localStorage.getItem("userInfo");
    console.log("User info from localStorage:", userInfoString);
    
    if (!userInfoString) {
      setError("User information not found in localStorage");
      return;
    }
    
    try {
      const userData = JSON.parse(userInfoString);
      console.log("Parsed user data:", userData);
      
      if (userData && (userData.username || userData.name || userData.email)) {
        const displayName = userData.username || userData.name || userData.email || "Guest";
        setCurrentName(displayName);
        setNewName(displayName); // Pre-fill the input with current name
      } else {
        setError("User data is incomplete");
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
      setError("Error reading user information");
    }
  }, []);

  const handleBack = () => {
    navigate("/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!newName.trim()) {
      setError("Username cannot be empty");
      setLoading(false);
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to update your username");
        setLoading(false);
        return;
      }

      // Get user ID from localStorage
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        setError("User information not found in localStorage");
        setLoading(false);
        return;
      }
      
      const userData = JSON.parse(userInfoString);
      console.log("User data for update:", userData);
      
      if (!userData) {
        setError("Failed to parse user data");
        setLoading(false);
        return;
      }
      
      // Use email as identifier if id is not available
      const userId = userData.id || userData.email;
      
      if (!userId) {
        setError("User identifier not found");
        setLoading(false);
        return;
      }

      // Make API call to update username
      console.log("Sending update request for user:", userId);
      
      // Fix the endpoint URL to match your backend routes
      const response = await axios.put(
        "http://localhost:5000/api/user/update-username",
        { 
          newUsername: newName,
          email: userData.email  // Include email for identification
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", response.data);
      
      // Update localStorage with new username
      userData.username = newName;
      localStorage.setItem("userInfo", JSON.stringify(userData));

      setCurrentName(newName);
      setSuccess("Username updated successfully!");
      
      // Navigate back to profile after a short delay
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error updating username:", error);
      if (error.response) {
        setError(error.response.data.message || "Failed to update username");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-name-container">
      
      <div className="profile-image">
        <FaUser />
      </div>
      <div className="username">{currentName}</div>

      <div className="edit-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="newName"><strong>Edit Name</strong></label>
          <input
            type="text"
            id="newName"
            name="newName"
            placeholder="Change Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="button-container">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save It"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditName;