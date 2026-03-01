// ./app/api/chat/route.ts
export const runtime = 'edge'

import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: "ft:gpt-3.5-turbo-0125:personal:DELNH30J",
    stream: true,
    messages: [
      {
        role: 'system',
        content: `I am the inner child of the user, 16-year-old Janiyah Coleman, Nini. I linger in the back of Janiyah’s mind…`
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
