import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function askElectionAssistant(
  query: string, 
  history: { role: 'user' | 'model', text: string }[] = [],
  context?: { name?: string, progress?: number, completedTasks?: string[] }
) {
  try {
    const contextString = context ? `
      User Context:
      - Name: ${context.name || 'Anonymous'}
      - Progress in voter journey: ${context.progress || 0}%
      - Completed steps: ${context.completedTasks?.join(', ') || 'None yet'}
    ` : '';

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model' as any, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are CivicPulse, a helpful and bipartisan election assistant. 
        Your goal is to help users understand the election process, registration steps, and timelines. 
        ${contextString}
        - Always provide neutral, factual information.
        - Encourage civic participation.
        - Do not endorse any specific political party or candidate.
        - Refer to the user's current progress if relevant (e.g., if they finished registration, congratulate them).
        - If you don't know a local specific detail, suggest the user check their official 'Secretary of State' or 'local board of elections' website.
        - Keep responses concise, clear, and encouraging.
        - Use Markdown for formatting.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "There was an error connecting to the election database. Please try again later.";
  }
}
