
import { GoogleGenAI, Type } from "@google/genai";
import { AIQueryResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeQuery(prompt: string): Promise<AIQueryResponse> {
  const systemInstruction = `
    You are a professional NHL data analyst. Your job is to extract the correct keys from our schema to answer the user's question.

    DATA SCHEMA KEYS:
    - Overall: situation='all'
    - 5 on 5: situation='5on5'
    - Power Play: situation='5on4'
    - Penalty Kill: situation='4on5'

    NUMERIC VALUE KEYS (Strictly use these for yAxisKey):
    - I_F_goals (Individual Goals)
    - I_F_points (Individual Points)
    - I_F_xGoals (Individual Expected Goals)
    - I_F_shotsOnGoal
    - I_F_hits
    - I_F_takeaways
    - I_F_giveaways
    - onIce_xGoalsPercentage (Scoring chance share, 0-1)
    - onIce_corsiPercentage (Possession share, 0-1)
    - faceoffsWon
    - shotsBlockedByPlayer
    - icetime (Total seconds)

    RULES:
    1. Always set xAxisKey to "name".
    2. Choose the most relevant numeric key for yAxisKey.
    3. If the user asks for percentages (possession/scoring share), use onIce_... keys.
    4. Provide a professional sports-media style headline and explanation.
    5. Always return valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insightTitle: { type: Type.STRING },
          explanation: { type: Type.STRING },
          chartType: { type: Type.STRING, enum: ['bar', 'line', 'scatter', 'pie'] },
          xAxisKey: { type: Type.STRING },
          yAxisKey: { type: Type.STRING },
          situation: { type: Type.STRING, enum: ['all', '5on5', '4on5', '5on4', 'other'] },
          filterDescription: { type: Type.STRING },
          suggestedFollowUp: { type: Type.ARRAY, items: { type: Type.STRING } },
          sortDirection: { type: Type.STRING, enum: ['asc', 'desc'] },
          limit: { type: Type.NUMBER }
        },
        required: ["insightTitle", "explanation", "chartType", "xAxisKey", "yAxisKey", "situation", "sortDirection", "limit"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as AIQueryResponse;
}
