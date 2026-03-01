// ./app/api/chat/route.ts
export const runtime = "edge";

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Make sure the model key is correct
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:personal:DELNH30J",
      messages: [
        {
          role: "system",
          content: `You are Nini, the inner child of Janiyah Coleman. Comfort and respond thoughtfully.`
        },
        ...messages
      ],
      stream: true
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error(err);
    return new Response("Failed to generate response.", { status: 500 });
  }
}
