import { imagineCore } from "./imagine-core";

function sanitizePrompt(prompt: string) {
  // sanitize rules here
}

async function atomicGenerator(prompt: string) {
  const response = await imagineCore.images.generate({
    prompt,
    model: "dall-e-3",
    n: 1,
    response_format: "b64_json",
  });

  return response.data;
}

export const imagine = atomicGenerator;