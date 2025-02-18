import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ParticlesComponent from "./particles"; // Background particles
import "./ArtifactExplorer.css";

const models = [
  {
    name: "Tutankhamun's Mask",
    file: "/models/tut/scene.gltf",
    description: "The iconic golden death mask of Tutankhamun, symbolizing ancient Egyptian craftsmanship.",
    video: "nVid/king toutankhanamon.mp4",
  },
  {
    name: "Ramses II Statue",
    file: "/models/ramses/scene.gltf",
    description: "A colossal statue of Ramses II, one of the most powerful pharaohs of ancient Egypt.",
    video: "nVid/Ramsis II.mp4",
  },
  {
    name: "Thutmose III Statue",
    file: "/models/Nefertiti/scene.gltf",
    description: "A detailed statue of Thutmose III, often called the 'Napoleon of Egypt'.",
    video: "nVid/King Thutmose III.mp4",
  },
  {
    name: "Great Pyramid of Giza",
    file: "/models/pyramid/scene.gltf",
    description: "The largest and most famous of the pyramids, built for Pharaoh Khufu.",
    video: "nVid/prymids history.mp4",
  },
];

const ArtifactExplorer = () => {
  const mountRef = useRef(null);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [model, setModel] = useState(null);

  const loadModel = (modelFile) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.innerHTML = ""; // Clear previous model
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const loader = new GLTFLoader();
    loader.load(
      modelFile,
      (gltf) => {
        setModel(gltf.scene);
        scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        gltf.scene.position.sub(center);
        gltf.scene.position.y -= maxDimension / 2;
        gltf.scene.scale.set(2.2, 2.2, 2.2); 

        camera.position.set(0, maxDimension * 0.6, maxDimension * 2);
        camera.lookAt(0, 0, 0);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  };

  const handleNextModel = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
  };

  const handlePreviousModel = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadModel(models[currentModelIndex].file);
  }, [currentModelIndex]);

  return (
    <div className="artifact-explorer">
      {/* Background Particles */}
      <ParticlesComponent className="artifact-particles" />

      {/* Split Layout */}
      <div className="artifact-layout">
        {/* Left Side - 3D Model */}
        <div className="artifact-viewer">
          <div ref={mountRef} className="artifact-canvas"></div>
        </div>

        {/* Right Side - Video & Info */}
        <div className="artifact-info">
          <h2>{models[currentModelIndex].name}</h2>
          <p>{models[currentModelIndex].description}</p>

          <video className="artifact-video" controls autoPlay loop>
            <source src={models[currentModelIndex].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="artifact-controls">
            <button onClick={handlePreviousModel} className="artifact-button">Previous</button>
            <button onClick={handleNextModel} className="artifact-button">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactExplorer;
