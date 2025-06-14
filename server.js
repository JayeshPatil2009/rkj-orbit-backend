const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  const { messages, model } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "API call failed", details: error.message });
  }
});

// ✅ FIXED: Let Render assign the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post("/chat", async (req, res) => {
  const { messages, model } = req.body;

  console.log("Received request:", { messages, model }); // log incoming

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data); // log outgoing

    res.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "API call failed", details: error.message });
  }
});
