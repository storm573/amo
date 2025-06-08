import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Valid voice options for OpenAI TTS
const VALID_VOICES = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'] as const;
type VoiceType = typeof VALID_VOICES[number];

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'alloy', speed = 1.0 } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (text.length > 4096) {
      return NextResponse.json(
        { error: 'Text must be 4096 characters or less' },
        { status: 400 }
      );
    }

    // Validate voice option
    if (!VALID_VOICES.includes(voice as VoiceType)) {
      return NextResponse.json(
        { error: `Invalid voice. Must be one of: ${VALID_VOICES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate speed
    if (typeof speed !== 'number' || speed < 0.25 || speed > 4.0) {
      return NextResponse.json(
        { error: 'Speed must be between 0.25 and 4.0' },
        { status: 400 }
      );
    }

    console.log('Synthesizing speech for text length:', text.length, 'Voice:', voice);

    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as VoiceType,
      input: text,
      speed: speed,
    });

    // Convert the response to an array buffer
    const audioBuffer = await response.arrayBuffer();

    console.log('Speech synthesis successful, audio size:', audioBuffer.byteLength);

    // Return the audio as MP3
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Speech synthesis error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Speech synthesis failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown speech synthesis error' },
      { status: 500 }
    );
  }
} 