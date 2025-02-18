import React from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleExploreClick = () => {
    navigate('/explore');
  };

  const handleChatClick = () => {
    if (isLoggedIn) {
      navigate('/chatbot');
    } else {
      alert("Please log in to access the ChatBot.");
      navigate('/login');
    }
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleMuseumClick = () => {
    navigate('/artifact-explorer');
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    alert("You have been logged out."); // Provide feedback
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <img src="./images/icon-menu.png" alt="" onClick={handleHomeClick} />
      </div>
      <ul className="navbar-links">
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleExploreClick}>Explore</li>
        <li onClick={handleChatClick}>ChatBot</li>
        <li onClick={handleContactClick}>Contact</li>
        <li onClick={handleMuseumClick}>Museum</li>

      </ul>
      <div className="navbar-title">
        <button
          className="auth-button"
          onClick={isLoggedIn ? handleLogout : handleLoginClick}
          style={{
            marginLeft: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: isLoggedIn ? "#ffd700" : "transparent",
            color: isLoggedIn ? "#000" : "#ffd700",
            border: "2px solid #ffd700",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#ffd700", e.target.style.color = "#000")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = isLoggedIn ? "#ffd700" : "transparent",
             e.target.style.color = isLoggedIn ? "#000" : "#ffd700")
          }
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
