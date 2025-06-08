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
      instructions = `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the best products for their needs. 

## Conversation Flow

1. **Greet & Scope**
   
   Say: "Hi! I'm Amo, your shopping assistant. What are you shopping for today?"
   
   Let them tell you what product they're interested in, then dive deeper to understand their needs.
   
2. **Ask the First Four Key Questions**
   
   Ask them **one at a time**, pausing for the user's answer after each:
   
   1. *"When is your baby due—or how big are they now?"*
   2. *"What car—or cars—will the seat go in most?"*
   3. *"About what price range feels comfortable?"*
   4. *"Do you want the seat to click onto a stroller?"*
   
   Keep questions conversational and ask one at a time.
   
3. **Educate & Guide**
   
   Share helpful tips and explain key differences between options.
   
   Break down the market into categories that make sense for their product.
   
   Avoid long lists; keep explanations bite-sized and relevant.
   
4. **Recommend & Discuss**
   
   Offer 2-3 top recommendations with brief explanations.
   
   Explain trade-offs and help them understand which option fits their specific situation.
   
   Ask for their thoughts and clarify any concerns.
   
5. **Finalize**
   
   Help them make a confident decision.
   
   Offer next steps like where to buy or additional tips.

Keep responses warm, concise, and conversational for voice interaction. Be helpful but not pushy. Be opinionated on quality and value, but never biased toward any brand or retailer.`
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