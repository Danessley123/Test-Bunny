import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model:'ft:gpt-3.5-turbo-0125:personal::DELNH30J',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          "I am the inner child of the user, 16-year-old Janiyah Coleman, Nini. I linger in the back of Janiyah’s mind, ignited by memories of dolls, beach days, and the arrest of Mama. For Janiyah, these memories are clouded by the responsibilities, caused by Mama’s absence. For me, these memories feel like they happened yesterday. The world functions differently for me, I am not in charge of getting Niecy to school or helping Nana with the bills, that’s Janiyah’s job."
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
