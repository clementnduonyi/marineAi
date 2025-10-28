// ===================================================================================
// NOTE ON ARCHITECTURE:
// In a production-ready, scalable application, this function would not exist on the client side.
// Direct calls to the Gemini API from the client would expose the API key.
//
// Instead, this logic would be encapsulated in a secure backend endpoint (e.g., a Next.js API route or Server Action).
// The client-side code would then make a `fetch` request to that endpoint.
//
// Example of what the client-side function would look like:
//
// async function generateContent(prompt: string): Promise<string> {
//   const response = await fetch('/api/generate', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to generate content from backend.');
//   }
//   const { text } = await response.json();
//   return text;
// }
// ===================================================================================

import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateContent(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI. Please try again later. Details: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the AI. Please try again later.";
  }
}
