import { useState, useEffect } from "react";
import { FaEdit, FaHeart, FaCog, FaBullseye, FaInfoCircle, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { Avatar } from "@mui/material";
import "../../Styles/Profile.css";
import { useNavigate } from "react-router-dom";

function MenuItem({ icon, text, highlight, onClick }) {
  return (
    <div className={`menu-item ${highlight ? "highlight" : ""}`} onClick={onClick}>
      <span className="menu-item-icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "Guest" });

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem("token");
    // Try to get user data from both possible keys
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || localStorage.getItem("user") || "{}");
    
    if (!token || !userInfo || Object.keys(userInfo).length === 0) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    // Also ensure the user data is stored with both keys for consistency
    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    
    setUserData(userInfo);
  }, [navigate]);

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear user data from localStorage (both keys)
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("user");
    // Redirect to home page after logout
    navigate("/");
  };

  return (
    <div className="profile-container">
      {/* Profile Avatar and Name */}
      <Avatar className="avatar" src="" alt="Profile Picture" />
      <div className="user-name">{userData.username || userData.email}</div>

      {/* Menu Items */}
      <div className="menu-container">
        <MenuItem 
          icon={<FaEdit />} 
          text="Edit Name" 
          onClick={() => handleMenuItemClick("/profile/edit")} 
        />
        <MenuItem 
          icon={<FaHeart />} 
          text="Favorites" 
          onClick={() => handleMenuItemClick("/favorites")} 
        />
        <MenuItem 
          icon={<FaCog />} 
          text="Settings" 
          onClick={() => handleMenuItemClick("/settings")} 
        />
        <MenuItem 
          icon={<FaBullseye />} 
          text="Our Goals" 
          onClick={() => handleMenuItemClick("/goals")} 
        />
        <MenuItem 
          icon={<FaInfoCircle />} 
          text="About" 
          onClick={() => handleMenuItemClick("/about")} 
        />
        {/* <MenuItem 
          icon={<FaUserFriends />} 
          text="Support" 
          onClick={() => handleMenuItemClick("/support")} 
        /> */}
        <MenuItem 
          icon={<FaSignOutAlt />} 
          text="Logout" 
          onClick={handleLogout} 
        />
      </div>
    </div>
  );
};

export default Profile;
