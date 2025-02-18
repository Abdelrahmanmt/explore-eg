import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./explore.css";
import { useNavigate } from "react-router-dom";
import ParticlesComponent from "./particles"; // Import ParticlesComponent

const Explore = () => {
  const navigate = useNavigate();

  const handleExploreClick1 = () => {
    navigate("/year-event");
  };
  
  const handleEvent2click1 = () => {
    navigate("/event2");
  };

  const handleEvent4click = () => {
    navigate("/event4");
  };
  const handleEvent3click = () => {
    navigate("/event3");
  };

  const events = [
    {
        function: handleExploreClick1,
        title: "Construction of the Pyramids",
        id: "pyramids-construction",
        pic: "DALL·E 2024-12-06 20.02.11 - A realistic and detailed depiction of the construction of the pyramids of Giza in ancient Egypt. The scene shows workers in traditional ancient Egypti.webp",
        subtitle: "The Great Pyramids of Giza were built during Egypt's Old Kingdom, under Pharaohs Khufu, Khafre, and Menkaure. These monuments stand as a testament to ancient architectural skill and remain one of the Seven Wonders of the Ancient World."
    },
    {
        function: handleEvent2click1,
        title: "Reign of Tutankhamun",
        id: "reign-tutankhamun",
        pic: "tutankhamun-ai-artwork-372_1024x1024-transformed.webp",
        subtitle: "Tutankhamun, the boy king of the 18th dynasty, ruled during the New Kingdom. He is most famous for his intact tomb, filled with treasures, which was discovered by Howard Carter in 1922."
    },
    {
      function: handleEvent3click,
      title: "Ramses II: The Great Builder",
      id: "ramses-ii",
      pic: "Ramses-II.jpg", // Update the image path to match Ramses II-related artifacts
      subtitle: "Ramses II, also known as 'Ramses the Great,' reigned during Egypt's 19th Dynasty (1279–1213 BCE). Famous for his military campaigns, monumental architecture, and diplomacy, he is celebrated as one of ancient Egypt's most powerful and enduring pharaohs. His legacy includes the temples at Abu Simbel and the Ramesseum, and the peace treaty with the Hittites following the Battle of Kadesh."
    },
    {
        function: handleEvent4click,
        title: "Reign of Thutmose III",
        id: "thutmose-reign",
        pic: "Thutmosis_III-2.jpg",
        subtitle: "Cleopatra VII, the last ruler of the Ptolemaic Dynasty, played a key role in Roman politics. Her reign ended with her death in 30 BC, marking the conclusion of ancient Egyptian sovereignty."
    }
];


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Add Particles Component */}
      <ParticlesComponent className='parts'/>

      <div className="explore-container" style={{ position: "relative" }}>
        <h1 className="explore-t1">Key Events</h1>
        <h1 className="explore-title">
          Explore Egypt's Rich Heritage and Timeless Milestones
        </h1>
        <div className="explore-events">
          {events.map((event, index) => (
            <motion.div
              className="explore-card"
              key={event.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{
                boxShadow: "0px 0px 23px 0px rgba(0,0,0,0.30)",
                display: "flow-root",
              }}
            >
              <div id={event.id}>
                <img
                  width={"250px"}
                  height={"250px"}
                  src={`./images/${event.pic}`}
                  alt={event.title}
                  className="explore-image"
                />
              </div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-subtitle">{event.subtitle}</p>
              <button className="btn btn-rect-to-round btn-rect-to-round--black"
                onClick={event.function}
              >
                Explore More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Explore;
