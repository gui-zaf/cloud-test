import OpenAI from "openai";

export const imagineCore = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});