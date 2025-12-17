import { GoogleGenAI, Type, SchemaParams } from "@google/genai";
import { ActiveComponent, GeneratedResult } from "../types";

const getSchema = (): SchemaParams => {
  return {
    type: Type.OBJECT,
    properties: {
      code: {
        type: Type.STRING,
        description: "The complete, compilable Arduino C++ sketch code. Include comments in Chinese explaining key parts.",
      },
      wiring: {
        type: Type.STRING,
        description: "A Markdown formatted list explaining how to wire each component based on the user's pin selection. Use Chinese.",
      },
      explanation: {
        type: Type.STRING,
        description: "A brief summary of how the code works and the logic flow in Chinese.",
      }
    },
    required: ["code", "wiring", "explanation"],
  };
};

export const generateArduinoCode = async (
  components: ActiveComponent[],
  description: string
): Promise<GeneratedResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a prompt context based on current state
  const componentList = components.map(c => 
    `- ${c.name} (ID: ${c.id}) connected to pins: ${JSON.stringify(c.pins)}`
  ).join('\n');

  const systemInstruction = `You are an expert embedded systems engineer specializing in Arduino. 
  Your goal is to write robust, non-blocking (avoid delay() where possible, use millis()) Arduino C++ code.
  
  The user will provide:
  1. A list of hardware components and their pin connections.
  2. A description of the desired behavior.
  
  You must output:
  1. Valid Arduino C++ code (.ino).
  2. A wiring guide.
  3. A brief explanation.
  
  Language: All comments and explanations MUST be in Simplified Chinese (简体中文).`;

  const userPrompt = `
  Hardware Configuration:
  ${componentList}

  User Requirement / Interaction Logic:
  ${description}

  Please generate the code to implement this logic using the specified hardware. 
  Ensure you initialize all specified pins in setup().
  Handle edge cases (like switch debouncing) if applicable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: getSchema(),
        temperature: 0.2, // Low temperature for code precision
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    return JSON.parse(text) as GeneratedResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
