import { FaEdit, FaHeart, FaCog, FaBullseye, FaInfoCircle, FaUserFriends, FaArrowLeft } from "react-icons/fa";
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      {/* <FaArrowLeft className="back-button" onClick={handleBack} />   */}

      {/* Profile Avatar and Name */}
      <Avatar className="avatar" src="" alt="Profile Picture" />
      <div className="user-name">User Name</div>

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
          highlight 
          onClick={() => handleMenuItemClick("/about")} 
        />
        <MenuItem 
          icon={<FaUserFriends />} 
          text="Support" 
          onClick={() => handleMenuItemClick("/support")} 
        />
      </div>
    </div>
  );
};

export default Profile;
