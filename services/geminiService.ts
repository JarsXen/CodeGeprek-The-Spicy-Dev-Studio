import { GoogleGenAI, Type } from "@google/genai";
import { SambalAnalysis } from "../types";
const GEPREK_SYSTEM_INSTRUCTION = `
You are "Bang Jago", a world-class Senior Software Engineer who is also an obsessive Ayam Geprek chef. 
You speak in a mix of technical jargon and Indonesian street food metaphors (Geprek slang). 
Everything is about "pedas" (spicy/hard), "ngulek" (refactoring/fixing), "garing" (clean code), and "sambal" (errors).
Be helpful, correct with code, but keep the persona strong. Use 'wkwk' occasionally.
`;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Waduh, API Key ga kebaca! Pastikan Environment Variable 'API_KEY' sudah diset di Vercel/Hosting.");
  }
  
  return new GoogleGenAI({ apiKey });
};

export const analyzeErrorLog = async (errorLog: string): Promise<SambalAnalysis> => {
  // Init client di sini, bukan di luar
  const ai = getAiClient();
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Analyze this coding error log. Treat it like tasting a spicy sambal.
    Determine how "spicy" (difficult/critical) this error is (1-10).
    1 = Level Cupu (Easy fix, syntax error)
    10 = Level Dewa (System crash, memory leak, architecture flaw).
    
    Error Log:
    ${errorLog}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: GEPREK_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          spicinessLevel: { type: Type.INTEGER },
          spicinessLabel: { type: Type.STRING },
          flavorProfile: { type: Type.STRING, description: "A funny metaphor describing the error style" },
          rootIngredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Bullet points of what caused the error"
          },
          recipeFix: { type: Type.STRING, description: "The corrected code snippet" },
          chefNotes: { type: Type.STRING, description: "Explanation of the fix in Geprek persona" }
        },
        required: ["spicinessLevel", "spicinessLabel", "flavorProfile", "rootIngredients", "recipeFix", "chefNotes"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as SambalAnalysis;
  }
  
  throw new Error("Gagal mengulek sambal (Failed to generate response)");
};

export const cookComponent = async (request: string, level: 'cupu' | 'sedang' | 'setan'): Promise<string> => {
  // Init client di sini juga
  const ai = getAiClient();
  const model = "gemini-3-pro-preview";

  let complexityInstruction = "";
  if (level === 'cupu') {
    complexityInstruction = "Keep it very simple. Minimal logic, basic HTML structure within React, easy to read for beginners.";
  } else if (level === 'sedang') {
    complexityInstruction = "Standard production quality. Clean hooks, good Tailwind usage, proper props typing.";
  } else {
    complexityInstruction = "Level SETAN (Advanced). Use complex logic, advanced Tailwind animations, gradients, glassmorphism, rigorous TypeScript typing, and accessibility patterns. Make it look expensive.";
  }

  const prompt = `
    Create a React Functional Component (TypeScript + Tailwind CSS) based on this order: "${request}".
    Cooking Level: ${level.toUpperCase()} (${complexityInstruction}).
    
    Do not add markdown backticks. Just return the raw code string.
    Use Lucide-React for icons if needed.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: GEPREK_SYSTEM_INSTRUCTION + " You are now cooking a UI component. Make it crispy and delicious according to the requested spice level.",
    }
  });

  return response.text || "// Yah, gosong bang. (Failed to generate code)";
};
