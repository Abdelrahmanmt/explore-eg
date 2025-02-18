import React, { useState } from "react";
import { motion } from "framer-motion";
import ParticlesComponent from "./particles";
import "./Register.css"; // Reuse the same CSS as Register
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Save the token
        navigate("/chatbot"); // Redirect to the chatbot page
      } else {
        setErrorMessage(data.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle Background */}
      <ParticlesComponent className="particles-bg" />

      <motion.div
        className="register-form-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="register-title">Welcome Back</h1>
        <p className="register-subtitle">Login to continue your journey!</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              className="form-input"
              aria-label="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              className="form-input"
              aria-label="Password"
              required
            />
          </div>

          {/* Display Error Message */}
          {errorMessage && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                color: "red",
                margin: "10px 0",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="register-button"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#ffd700",
              color: "#000",
            }}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "#fff", marginBottom: "10px" }}>
            Don't have an account?
          </p>
          <motion.button
            onClick={handleRegClick}
            className="register-button"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#ffd700",
              color: "#000",
            }}
            whileTap={{ scale: 0.9 }}
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
