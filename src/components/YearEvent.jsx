import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css"; // Reuse HeroSection styles
import { motion } from "framer-motion"; // Framer Motion for animations
import * as THREE from "three"; // Import Three.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Loader for 3D models
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // For camera controls
import FloatingPyr from "./FloatingPyr";

const YearEvent = () => {
  const mountRef = useRef(null); // Reference to the Three.js container
  const detailsRef = useRef(null); // Reference to the detailed section
  const audioRef = useRef(null); // Reference to the audio element
  const [modalImage, setModalImage] = useState(null); // State for modal image
  const [isPlaying, setIsPlaying] = useState(false); // State for audio playback

  const navigate = useNavigate();

  const handleExploreClick = () => {
    detailsRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the detailed section
  };

  const handleEvent2click = () => {
    navigate("/event2"); // Navigate to the next event
  };

  const toggleAudioPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc); // Open modal with selected image
  };

  const closeModal = () => {
    setModalImage(null); // Close modal
  };

  useEffect(() => {}, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <>
      <motion.section
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            2700 B.C
          </motion.h2>
          <motion.h2
            className="hero-highlight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pyramids of Giza
          </motion.h2>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Pyramids of Giza, constructed during Egypt's Old Kingdom, are among the most iconic
            architectural achievements of the ancient world. Built as tombs for Pharaohs Khufu,
            Khafre, and Menkaure, they stand as enduring symbols of Egypt’s grandeur and engineering
            expertise.
          </motion.p>
          <motion.button
            className="hero-button"
            style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }}
            onClick={handleExploreClick}
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            EXPLORE MORE
          </motion.button>

          

          {/* Hidden Audio Element */}
          <audio ref={audioRef} src="/audio/giza.mp3" preload="auto" />
        </div>
        <motion.div
          className="hero-images"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="hero-images"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="sketchfab-embed-wrapper"
              style={{
                marginRight: "20px",
                width: "100%",
                height: "650px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <iframe
                title="The Giza pyramid complex | EGYPT"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/710ce0d3291f4e0ca054482de637028c/embed?&autostart=1&transparent=1&ui_theme=dark&dnt=1"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Detailed Section */}
      <section
        ref={detailsRef}
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2 className="eventTitle">Pyramids of Giza: Wonders of the Ancient World</h2>
        <p className="eventText">
          The Pyramids of Giza, constructed during the Old Kingdom around 2600–2500 BCE, are a
          testament to the engineering prowess of ancient Egypt. Commissioned by Pharaohs Khufu,
          Khafre, and Menkaure, these pyramids served as monumental tombs designed to honor their
          reigns and ensure safe passage to the afterlife.
        </p>
        <p className="eventText">
          The Great Pyramid of Khufu, the largest of the three, was considered one of the Seven
          Wonders of the Ancient World and remains the only one still largely intact. These
          architectural marvels were originally covered in polished limestone casing stones, which
          shimmered in the sunlight, symbolizing divine radiance.
        </p>
        <p className="eventText">
          Surrounding the pyramids are numerous smaller pyramids, mastabas, and the iconic Great
          Sphinx, a guardian figure believed to represent Pharaoh Khafre. The Giza complex remains a
          source of awe and wonder, representing the peak of ancient Egyptian civilization.
        </p>
        <p
          style={{ textAlign: "center", color: "#888", marginTop: "10px", fontStyle: "italic" }}
        >
          Click on an image to view it in detail.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {[
            "images/great-pyramid-khufu.png",
            "images/194387-004-C5288409.webp",
            "images/scale_1200.jpg",
            "images/giza-sphinx.jpg",
            "/images/giza-complex.webp",
          ].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Artifact ${index + 1}`}
              style={{
                width: "300px",
                height: "250px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </section>
      {/* Modal */}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Enlarged Artifact"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>
      )}

      <div className="eventExtra">
        <div className="extraTitle">
          <h1>The Great Pyramid of Khufu</h1>
          <p>
            The Great Pyramid of Khufu stands as the largest pyramid ever constructed and was
            originally 481 feet tall. Built using over 2.3 million limestone blocks, its precision
            engineering continues to baffle archaeologists and engineers. The internal chambers,
            including the King's Chamber, are architectural masterpieces that reflect the pharaoh's
            vision of eternity.
          </p>
          <motion.button
            className="hero-button"
            style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }}
            onClick={handleEvent2click}
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Next Event
          </motion.button>
        </div>
        <div className="extraModel">
          <img
            src="/images/2d5f2f2001f9d2853d1e0bd7fbf741da.jpg"
            style={{ width: "auto", borderRadius: "5px" }}
            alt="Giza Pyramid Complex"
          />
        </div>
      </div>
    </>
  );
};

export default YearEvent;
