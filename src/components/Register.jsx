import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import ParticlesComponent from "./particles"; // Import the particles effect
import "./Register.css"; // Import Register styling
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
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
      <ParticlesComponent className="particles-bg" />

      <motion.div
        className="register-form-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="register-title">Join Us</h1>
        <p className="register-subtitle">Become part of our community!</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              whileFocus={{ scale: 1.05 }}
              className="form-input"
            />
          </div>
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
            />
          </div>
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
            Register
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
