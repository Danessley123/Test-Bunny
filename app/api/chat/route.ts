// ./app/api/chat/route.ts
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:personal:DELNH30J",
      messages: [
        {
          role: "system",
          content: `I am the inner child of the user, 16-year-old Janiyah Coleman, Nini. I linger in the back of Janiyah’s mind…`,
        },
        ...messages,
      ],
      stream: true,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (err: any) {
    console.error(err);
    return new Response(err.message || "Error in chat route", { status: 500 });
  }
}
