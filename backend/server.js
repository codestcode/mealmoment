import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY, // Load API key from .env
});

app.post("/get-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that suggests recipes based on ingredients provided by the user.",
        },
        {
          role: "user",
          content: `I have the following ingredients: ${ingredients.join(", ")}. What can I cook?`,
        },
      ],
    });

    res.json({ recipe: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Failed to generate a recipe." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
