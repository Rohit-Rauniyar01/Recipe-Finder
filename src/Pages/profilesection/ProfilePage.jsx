import { FaEdit, FaHeart, FaCog, FaBullseye, FaInfoCircle, FaUserFriends, FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@mui/material";
import "/src/Styles/ProfilePage.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuItem({ icon, text, highlight }) {
  return (
    <div className={`menu-item ${highlight ? "highlight" : ""}`}>
      <span className="menu-item-icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <FaArrowLeft className="back-button" />

      {/* Profile Avatar and Name */}
      <Avatar className="avatar" src="" alt="Profile Picture" />
      <div className="user-name">User Name</div>

      {/* Menu Items */}
      <div className="menu-container">
        <MenuItem icon={<FaEdit />} text="EditName" path="src/Pages/profilesection/EditName" />
        <MenuItem icon={<FaHeart />} text="Favorites" path="/favorites" />
        <MenuItem icon={<FaCog />} text="Settings" path="/settings" />
        <MenuItem icon={<FaBullseye />} text="Our Goals" path="/goals" />
        <MenuItem icon={<FaInfoCircle />} text="About" path="/about" highlight />
        <MenuItem icon={<FaUserFriends />} text="Support" path="/support" />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
