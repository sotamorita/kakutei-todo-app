import { GoogleGenAI } from "@google/genai";
import { GeminiAdvice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini with Google Search Grounding to get the latest info
 * regarding tax return deadlines and specific advice based on the profile.
 */
export const getTaxAdvice = async (
  userProfile: string
): Promise<GeminiAdvice> => {
  try {
    const prompt = `
      あなたは日本の確定申告のエキスパートです。
      以下のユーザープロフィールに基づいて、今年の確定申告に関する
      「最新の提出期限（開始日と終了日）」と「このユーザーが特に注意すべきポイントや最新トレンド」を教えてください。

      ユーザープロフィール:
      ${userProfile}

      Google検索を利用して、必ず最新の情報を取得してください。
      特に、国税庁の最新の発表に基づいた正確な日付が必要です。
      回答は簡潔な日本語でまとめてください。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType and responseSchema are NOT allowed with googleSearch
      },
    });

    // Extract text
    const text = response.text || "情報を取得できませんでした。";

    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title, url: chunk.web.uri };
        }
        return null;
      })
      .filter((source: any): source is { title: string; url: string } => source !== null);

    return {
      text,
      sources,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "最新情報の取得中にエラーが発生しました。インターネット接続を確認するか、しばらく待ってから再試行してください。",
      sources: []
    };
  }
};
