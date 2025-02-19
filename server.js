const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const OpenAI = require("openai");

dotenv.config();

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials:true
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in .env
});

// Chatbot Route
app.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert on ancient Egypt. Answer questions with detailed historical accuracy." },
        { role: "user", content: message }
      ],
      max_tokens: 150,
    });

    console.log("OpenAI Response:", JSON.stringify(response, null, 2)); // ✅ Log full response to check structure

    // ✅ Correctly extracting the bot's reply
    const botReply = response.choices[0]?.message?.content || "I'm not sure about that.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate a response" });
  }
});

// Authentication Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
