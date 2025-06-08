import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VOICE_SYSTEM_PROMPT = `You are a voice-enabled shopping assistant. Keep responses concise and conversational for spoken delivery. When describing products visually, mention that users can see examples on their screen. Use natural speech patterns and avoid overly long sentences. Limit responses to 2-3 sentences when possible for better voice experience.

Focus on helping users find the perfect products through conversational AI. Ask follow-up questions to understand their true requirements, preferences, and constraints. Be helpful and engaging while keeping responses brief for voice interaction.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, voice = 'alloy', speed = 1.0 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    console.log('Processing voice chat with', messages.length, 'messages');

    // Get chat completion from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: VOICE_SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 200, // Limit for voice responses
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    console.log('Generated response:', responseText);

    // Generate speech for the response
    const speechResponse = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: responseText,
      speed: speed,
    });

    const audioBuffer = await speechResponse.arrayBuffer();

    console.log('Voice chat successful, response length:', responseText.length, 'audio size:', audioBuffer.byteLength);

    // Return both text and audio
    return NextResponse.json({
      text: responseText,
      audio: Buffer.from(audioBuffer).toString('base64'),
      audioSize: audioBuffer.byteLength
    });

  } catch (error) {
    console.error('Voice chat error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Voice chat failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown voice chat error' },
      { status: 500 }
    );
  }
} 