import { NextRequest, NextResponse } from 'next/server'
import { generateChatCompletion } from '@/lib/openai'
import { z } from 'zod'

const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })),
  sessionId: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, sessionId } = ChatRequestSchema.parse(body)

    // Convert messages to OpenAI format
    const openAIMessages = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }))

    const aiResponse = await generateChatCompletion(openAIMessages)

    return NextResponse.json({
      message: aiResponse,
      sessionId
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 