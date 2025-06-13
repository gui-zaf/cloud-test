import { amazeCore } from "./amaze-core";

async function amazeGenerator() {
  const systemPrompt =
    "Gere uma descrição curta e criativa para criação de uma imagem. A resposta deve ter no máximo 30 palavras.";

  const response = await amazeCore.chat.completions.create({
    model: "sabia-3",
    messages: [
      { role: "system", content: systemPrompt },
    ],
  });

  return response.choices[0].message.content;
}

export const amaze = amazeGenerator;
