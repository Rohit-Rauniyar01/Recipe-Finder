import  { useState } from "react";
import "../../Styles/EditName.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditName = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const username = sessionStorage.getItem("username") || "Guest";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Name:", newName);
    // Perform API call to update the name here
  };

  return (
    <div className="edit-name-container">

      
      <div className="profile-image">
        <FaUser />
      </div>
      <div className="username">{username}</div>

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
          />
          <div className="button-container">
            <button type="submit" className="save-btn">Save It</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditName;