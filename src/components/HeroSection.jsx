import React from "react";
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"; // Import Framer Motion for animations

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen and invisible
    visible: { opacity: 1, y: 0 }, // Fade in and slide up
    exit: { opacity: 0, y: 50 }    // Fade out and slide down
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start small and invisible
    visible: { opacity: 1, scale: 1 }, // Fade in and grow
    exit: { opacity: 0, scale: 0.8 }   // Shrink and fade out
  };

  return (
    <motion.section
      className="hero-section"
      variants={containerVariants}
      initial="hidden" // Initial animation state
      animate="visible" // Animate when mounted
      exit="exit"       // Animate when unmounted
      transition={{ duration: 0.8 }} // Duration for the animation
    >
      <div className="hero-content">
        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, x: -50 }} // Slide in from left
          animate={{ opacity: 1, x: 0 }}  // Slide to its original position
          transition={{ duration: 0.8 }}
        >
          GREAT PYRAMID OF
        </motion.h2>
        <motion.h2
          className="hero-highlight"
          initial={{ opacity: 0, x: 50 }} // Slide in from right
          animate={{ opacity: 1, x: 0 }} // Slide to its original position
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          KHUFU
        </motion.h2>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 50 }} // Slide in from below
          animate={{ opacity: 1, y: 0 }} // Slide to its original position
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Great Pyramid of Giza is the largest Egyptian pyramid and the tomb of Fourth Dynasty
          pharaoh Khufu. Built in the 26th century BC during a period of around 27 years, it is the
          oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.
        </motion.p>
        <motion.button
            className="hero-button"
            style={{backgroundColor:"rgb(210, 174, 46,0.6)"}} // Black background and gold text
            onClick={handleExploreClick}
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }} // Gold background and black text on hover
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            EXPLORE
            </motion.button>
      </div>
      <motion.div
        className="hero-images"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src="./images/pyramid.jpg" alt="Pyramid" className="pyramid-image" />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
