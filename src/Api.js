
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from Vite's environment variables
const apiKey = import.meta.env.VITE_HF_API_KEY;

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getRecipeFromGemini(ingredients) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
    Using these ingredients: ${ingredients.join(", ")}`;

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
}

// Api.js
// export async function getRecipeFromBackend(ingredients) {
//   try {
//     const response = await fetch("http://localhost:5000/get-recipe", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ingredients }),
//     });

//     if (!response.ok) throw new Error("Failed to fetch recipe");

//     const data = await response.json();
//     return data.recipe;
//   } catch (error) {
//     console.error("Error fetching recipe:", error);
//     return "Error generating a recipe. Please try again.";
//   }
// }
