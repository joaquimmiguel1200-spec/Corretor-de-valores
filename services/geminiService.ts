
import { GoogleGenAI, Type } from "@google/genai";
import { User, Asset } from "../types";

export const getInvestmentAdvice = async (user: User, assets: Asset[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analise o seguinte perfil de investidor e ativos disponíveis e dê 3 sugestões de investimento em português.
    Perfil: ${user.profile}
    Saldo disponível: R$ ${user.balance.toFixed(2)}
    Ativos em destaque: ${assets.slice(0, 5).map(a => a.symbol).join(', ')}
    
    Responda em JSON seguindo este esquema:
    {
      "advice": [
        {"title": "string", "description": "string", "riskLevel": "string"}
      ],
      "marketSummary": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  riskLevel: { type: Type.STRING }
                },
                required: ["title", "description", "riskLevel"]
              }
            },
            marketSummary: { type: Type.STRING }
          },
          required: ["advice", "marketSummary"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
