import React, { useState } from "react";
import "./ChatBot.css";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with ancient Egypt?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Track bot typing status

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true); // Show "Typing..."

    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log("Chatbot Response:", data); // ✅ Debugging output

      if (data.reply) {
        setMessages((prevMessages) => [...prevMessages, { text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { text: "Error: No response from chatbot.", sender: "bot" }]);
      }
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Server error. Try again later.", sender: "bot" }]);
    } finally {
      setIsTyping(false); // Hide "Typing..." after response
    }
  };

  return (
    <motion.div
      className="chatbot-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="chatbot-title">Ancient Egypt Chatbot</h1>
      <div className="chatbot-box">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {message.text}
            </div>
          ))}
          {isTyping && <div className="chatbot-message bot-message">Typing...</div>}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Ancient Egypt..."
          />
          <button className="chatbot-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;
