
import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css"; // Reuse HeroSection styles
import { motion } from "framer-motion"; // Framer Motion for animations
import * as THREE from "three"; // Import Three.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Loader for 3D models
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // For camera controls
import { useNavigate } from "react-router-dom";
import FloatingRamses from "./FloatingRamses";

const Event3 = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo({top:0, behavior:'smooth'});
  }, []);
  const mountRef = useRef(null); // Reference to the Three.js container
  const detailsRef = useRef(null); // Reference to the detailed section
  const [modalImage, setModalImage] = useState(null); // State for modal image

  const handleExploreClick = () => {
    detailsRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the detailed section
  };

  const handleEvent3click = () => {
    navigate("/event4");
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/event2') // Smooth scroll to the detailed section
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc); // Open modal with selected image
  };

  const closeModal = () => {
    setModalImage(null); // Close modal
  };

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 4); // Adjust the camera to eye level and face the object directly

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Transparent background
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      "/models/Ramses/scene.gltf", // Path to your GLTF model
      (gltf) => {
        model = gltf.scene;

        // Center the model dynamically
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        model.position.sub(center); // Center the model
        model.position.y -= maxDimension / 2; // Raise the model to sit on the ground plane

        // Scale the model if necessary
        model.scale.set(2.2, 2.2, 2.2);

        scene.add(model);

        // Adjust the camera dynamically
        camera.position.set(0, maxDimension * 0.6, maxDimension * 2);
        camera.lookAt(0, 0, 0);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    // Add OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth controls
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the model if loaded
      if (model) model.rotation.y += 0.01;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      if (mountRef.current) {
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement); // Only remove if it exists
      }
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            1279–1213 BCE
          </motion.h2>
          <motion.h2
            className="hero-highlight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Reign of Ramses II
          </motion.h2>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ramses II, also known as "Ramses the Great," was one of ancient Egypt's most illustrious
            and enduring rulers. His reign marked an era of monumental architecture, military
            conquests, and unparalleled prosperity, making him a defining figure of the New Kingdom.
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
        </div>
        <motion.div
          className="hero-images"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={mountRef}
            style={{
              width: "100%",
              height: "850px",
              borderWidth: "10px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          ></div>
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
        <h2 className="eventTitle">Ramses II: Monumental Builder and Warrior</h2>
        <p className="eventText">
          Ramses II was a pharaoh of the 19th Dynasty whose reign spanned 66 years, making him one 
          of Egypt's longest-reigning monarchs. Known for his military prowess, Ramses II led 
          successful campaigns into Nubia, the Levant, and beyond, securing Egypt's borders and 
          elevating its power on the global stage.
        </p>
        <p className="eventText">
          His reign is best remembered for the monumental structures he commissioned, including the
          temples at Abu Simbel, the Ramesseum, and additions to Karnak and Luxor. These marvels of 
          engineering reflect his devotion to the gods and his ambition to immortalize his legacy 
          in stone. Ramses II's treaty with the Hittites following the Battle of Kadesh is considered 
          one of the earliest examples of a formal peace treaty in history.
        </p>
        <p style={{ textAlign: "center", color: "#888", marginTop: "10px", fontStyle: "italic" }}>
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
            "images/ramses-statue.jpg",
            "images/abu-simbel-temple.jpg",
            "images/kadesh-peace-treaty.jpg",
            "images/ramesseum.jpg",
            "/images/ramses-chariot.jpg",
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
          <h1>Ramses II’s Legacy</h1>
          <p>
            Ramses II's legacy extends far beyond his lifetime. The temples, statues, and artifacts 
            from his reign stand as a testament to Egypt’s artistic and architectural achievements. 
            His name, inscribed in countless monuments, ensured his memory endured for millennia.
          </p>
          <p>
            Known for his diplomacy, Ramses II's treaty with the Hittites laid the groundwork for 
            peaceful relations between two ancient superpowers. His reign embodies a golden age of 
            prosperity and innovation in Egyptian history.
          </p>
          <div style={{ margin: "20px", display: "flex", justifyContent: "space-between" }}>
            <motion.button
              className="hero-button"
              style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }}
              onClick={handleBackClick}
              whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Previous Event
            </motion.button>
            <motion.button
              className="hero-button"
              onClick={handleEvent3click}
              style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }}
              whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Next Event
            </motion.button>
          </div>
        </div>
        <div
          className="extraModel"
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        ></div>
      </div>
    </>
  );
  
  
};

export default Event3;
