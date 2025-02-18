import React from "react";
import { motion } from "framer-motion";
import "./Contact.css"; // Create this CSS file for styling
import ParticlesComponent from "./particles"; // Add particles.js background

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      className="contact-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      {/* Particles Background */}
      <ParticlesComponent />

      <div className="contact-container">
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="contact-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We’d love to hear from you! Feel free to reach out with any questions,
          feedback, or inquiries.
        </motion.p>
        <form className="contact-form" action="https://formspree.io/f/xblrllkr" method="POST">>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email" 
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <motion.button
            className="contact-button"
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
