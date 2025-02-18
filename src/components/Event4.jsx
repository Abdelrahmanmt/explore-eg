
import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css"; // Reuse HeroSection styles
import { motion } from "framer-motion"; // Framer Motion for animations
import * as THREE from "three"; // Import Three.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Loader for 3D models
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // For camera controls
import { useNavigate } from "react-router-dom";
import FloatingButton from "./FloatingButton";

const Event4 = () => {
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

  const handleEvent4click = () => {
   navigate('/') // Smooth scroll to the detailed section
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/event3') // Smooth scroll to the detailed section
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
      "/models/Nefertiti/scene.gltf", // Path to your GLTF model
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
            1479–1425 BCE
          </motion.h2>
          <motion.h2
            className="hero-highlight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Reign of Thutmose III
          </motion.h2>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Thutmose III, often hailed as the "Napoleon of Egypt," was one of the most remarkable 
            rulers of the 18th Dynasty. His reign marked the zenith of Egypt’s power, during which 
            he conducted a series of military campaigns that expanded Egypt’s borders to their 
            greatest extent.
          </motion.p>
          <motion.button
            className="hero-button"
            style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }} // Black background and gold text
            onClick={handleExploreClick}
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }} // Gold background and black text on hover
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
        <h2 className="eventTitle">Thutmose III: Builder of an Empire</h2>
        <p className="eventText">
          Thutmose III ascended the throne as a young boy but initially ruled under the regency 
          of his stepmother and co-pharaoh Hatshepsut. Upon gaining full control, he led 
          Egypt into an era of unparalleled military success. His campaigns into the Levant, 
          Nubia, and Syria solidified Egypt’s dominance as a superpower of the ancient world.
        </p>
        <p className="eventText">
          Not just a warrior, Thutmose III was also a visionary statesman and builder. He 
          constructed monumental temples such as those at Karnak, dedicated to Amun-Ra, and 
          left behind a legacy of prosperity and unity. His achievements have been inscribed 
          in the annals of history as a testament to his strategic acumen and leadership.
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
            "images/thutmose-statue.jpg",
            "images/thutmose-campaigns-map.jpg",
            "images/thutmose-temple.jpg",
            "images/karnak-obelisk.jpg",
            "/images/thutmose-military.jpg",
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
          <h1>Thutmose III's Obelisks</h1>
          <p>
            Among the architectural wonders of Thutmose III’s reign were the majestic obelisks he 
            erected to honor the gods and commemorate his victories. The inscriptions on these 
            obelisks reveal his military prowess and his devotion to the divine. These towering 
            structures symbolize Egypt’s enduring influence and Thutmose III’s place in history 
            as one of its most illustrious leaders.
          </p>
          <p>
            Many of Thutmose III's obelisks have been transported to distant lands, including 
            Rome and Istanbul, serving as enduring monuments to his legacy and the reach of 
            Egyptian culture.
          </p>
          <div style={{ margin: "20px", display: "flex", justifyContent: "space-between" }}>
            <motion.button
              className="hero-button"
              style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }} // Black background and gold text
              onClick={handleBackClick}
              whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }} // Gold background and black text on hover
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Previous Event
            </motion.button>
            <motion.button
              className="hero-button"
              style={{ backgroundColor: "rgb(210, 174, 46,0.6)" }} // Black background and gold text
              onClick={handleEvent4click}
              whileHover={{ scale: 1.1, backgroundColor: "#ffd700", color: "#000" }} // Gold background and black text on hover
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Home
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

export default Event4;
