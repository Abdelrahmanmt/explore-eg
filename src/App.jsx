import React from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Explore from "./components/explore";
import Footer from "./components/Footer";
import YearEvent from "./components/YearEvent";
import Event2 from "./components/Event2";
import "./App.css";
import ChatBot from "./components/ChatBot";
import Event4 from "./components/Event4";
import Event3 from "./components/Event3";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import ArtifactExplorer from "./components/ArtifactExplorer";


function App() {
  const location = useLocation(); // Get the current location for route-specific animations

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/year-event" element={<YearEvent />} />
          <Route path="/event2" element={<Event2 />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="event4" element={<Event4 />} />
          <Route path="event3" element={<Event3 />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="artifact-explorer" element={<ArtifactExplorer />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
