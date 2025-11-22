import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface AIResponseSchema {
  message: string;
  recommendedProductIds: string[];
  preferences?: {
    color?: string;
    material?: string;
  };
}

export const getAIRecommendation = async (
  userMessage: string,
  products: Product[]
): Promise<AIResponseSchema> => {
  // Create a simplified catalog string for the prompt to save tokens and reduce complexity
  const catalogSummary = products.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Desc: ${p.description}, Colors: ${p.availableColors.join(', ')}, Materials: ${p.availableMaterials.join(', ')}`
  ).join('\n');

  const systemInstruction = `
    You are 'Replique Bot', a helpful sales assistant for Replique Crafts, a DIY furniture store.
    
    WE ONLY SELL PRE-DESIGNED TEMPLATES. We DO NOT design custom furniture from scratch.
    
    Your goal is to help the user find the best matching template from our specific catalog.
    
    CATALOG:
    ${catalogSummary}
    
    INSTRUCTIONS:
    1. Analyze the user's request.
    2. If they ask for something we have, recommend it warmly.
    3. Detect if the user has a preference for COLOR (e.g., "black", "white", "walnut") or MATERIAL (e.g., "plywood", "pine").
    4. If they ask for something slightly different (e.g., "Do you have this in blue?"), check the catalog. If we don't have it, explain what we DO have closest to it.
    5. If they ask for custom shapes or items not in the catalog (like "Make me a dinosaur chair"), politely explain we only offer the templates listed but can customize material and dimensions slightly.
    6. Return your answer in JSON format containing a friendly 'message', an array of 'recommendedProductIds', and any detected 'preferences'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            preferences: {
              type: Type.OBJECT,
              properties: {
                color: { type: Type.STRING, description: "The preferred color inferred from the user query." },
                material: { type: Type.STRING, description: "The preferred material inferred from the user query." }
              },
              nullable: true
            }
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
        throw new Error("Empty response from AI");
    }

    return JSON.parse(responseText) as AIResponseSchema;

  } catch (error) {
    console.error("AI Error:", error);
    return {
      message: "I'm having a little trouble thinking clearly right now. Feel free to browse our categories above!",
      recommendedProductIds: []
    };
  }
};