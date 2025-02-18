import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./FloatingButton.css";

const FloatingRamses = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [showOverlay, setShowOverlay] = useState(true); // Overlay state for the "Click to Play/Pause"

  // Toggle play/pause and mute/unmute
  const handleClick = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.muted = false; // Unmute the video
        videoRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    // Show overlay for 3 seconds on mount
    const timer = setTimeout(() => setShowOverlay(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="floating-button"
      onClick={handleClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      title="Click to Play/Pause"
    >
      {/* Overlay to prompt the user */}
      {showOverlay && (
        <div className="floating-overlay">
          <p>Click to Enable Audio / Play/Pause</p>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted} // Start muted for autoplay
        playsInline
        className="floating-video"
        style={{ pointerEvents: "none" }} // Prevents the video from capturing clicks
      >
        <source src="/audio/Ramses.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default FloatingRamses;
