import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI(API_KEY);

export const getGeminiResponse = async (prompt, history = []) => {
    try {
        if (!API_KEY) {
            throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("[GeminiService] Error:", error);
        throw error;
    }
};

export const generatePatientReport = async (patientData, format = 'Clinical Summary') => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
      Act as a professional Clinical Physiotherapist Assistant. 
      Generate a ${format} for the following patient:
      
      Patient Name: ${patientData.name}
      Condition: ${patientData.condition}
      Adherence Rate: ${patientData.adherenceRate}%
      Completed Sessions: ${patientData.completedSessions}
      Total Sessions: ${patientData.totalSessions}
      Last Active: ${patientData.lastActive}
      Progress Level: ${patientData.progressLevel}
      
      The report should be professional, concise, and structured. 
      Include sections for: Summary, Progress Status, and Recommendations.
      Format: ${format}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("[GeminiService] Report generation error:", error);
        throw error;
    }
};
