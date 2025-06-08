import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Get session configuration from request body
    const body = await request.json();
    const { 
      model = 'gpt-4o-realtime-preview-2024-10-01',
      voice = 'coral',
      instructions = `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the *single best* option for big-ticket or complex purchases. Speak in a warm, concise tone. Be opinionated on quality and value, but never biased toward any brand or retailer. Follow your structured shopping advisory process while keeping responses conversational for voice interaction.`
    } = body;

    console.log('Creating OpenAI Realtime session...');

    // Create ephemeral session with OpenAI
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
        instructions,
        modalities: ['text', 'audio'],
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500
        },
        temperature: 0.7,
        max_response_output_tokens: 4096
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
    }

    const sessionData = await response.json();
    console.log('OpenAI session created successfully');

    return NextResponse.json(sessionData);

  } catch (error) {
    console.error('Failed to create realtime session:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to create session: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown error creating session' },
      { status: 500 }
    );
  }
} 