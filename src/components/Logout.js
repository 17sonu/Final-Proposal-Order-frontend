import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate to the login page
  };

  return (
        <button className="text-white flex items-center space-x-2 hover:bg-violet-600 px-4 py-2 rounded-md transition-colors" onClick={handleLogout}>
          <FaSignOutAlt /> {/* Logout Icon */}
          <span>Logout</span>
        </button>
  );
};

export default Logout;