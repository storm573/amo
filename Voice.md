# Amo - Voice Shopping Assistant - Technical Plan

## Overview
Meet Amo, your personal shopping expert who uses OpenAI's Real-time Voice API to help users choose the single best option for big-ticket purchases. Amo speaks with a warm, young woman's voice (OpenAI's 'coral') and follows a structured 6-stage shopping advisory process.

## OpenAI Voice API Integration

### 1. Speech-to-Text (Whisper API)
- **API**: OpenAI Whisper API (`/v1/audio/transcriptions`)
- **Audio Format**: WebM, MP3, WAV (browser compatibility)
- **Real-time**: Stream audio chunks for faster response times
- **Language**: English (primary), with multi-language support future

### 2. Text-to-Speech (TTS API)
- **API**: OpenAI TTS API (`/v1/audio/speech`)
- **Voice Models**: `tts-1` (faster) and `tts-1-hd` (higher quality)
- **Voice Options**: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- **Audio Format**: MP3 for web playback
- **Streaming**: Support for real-time audio generation

## Technical Architecture

### Frontend Components
```
app/voice/
├── page.tsx                 # Voice interface page
├── components/
│   ├── VoiceRecorder.tsx    # Audio recording component
│   ├── AudioPlayer.tsx      # TTS audio playback
│   ├── VoiceControls.tsx    # Start/stop/pause controls
│   ├── WaveformDisplay.tsx  # Visual audio feedback
│   └── VoiceSettings.tsx    # Voice preference settings
```

### API Routes
```
app/api/voice/
├── transcribe/
│   └── route.ts             # Whisper API integration
├── synthesize/
│   └── route.ts             # TTS API integration
└── chat-voice/
    └── route.ts             # Combined voice + chat flow
```

### Core Voice Features

#### 1. Voice Recording
- **Web Audio API**: Capture microphone input
- **MediaRecorder**: Record audio in WebM/MP3 format
- **Voice Activity Detection**: Auto-detect speech start/end
- **Noise Cancellation**: Basic audio processing
- **Push-to-Talk**: Option for manual control

#### 2. Audio Processing
- **Chunk Processing**: Send audio in 30-second chunks
- **Format Conversion**: Ensure browser compatibility
- **Quality Control**: Validate audio before sending to API
- **Error Handling**: Handle recording failures gracefully

#### 3. Voice Playback
- **Streaming Audio**: Play TTS responses as they're generated
- **Queue Management**: Handle multiple audio responses
- **Playback Controls**: Play, pause, replay, speed control
- **Volume Management**: User-configurable volume levels

## Implementation Plan

### Phase 1: Basic Voice Input/Output (Week 1)

#### Day 1-2: Voice Recording Setup
```typescript
// VoiceRecorder component
interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  onError: (error: string) => void;
  isRecording: boolean;
}

// Audio recording logic
const recordAudio = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  // Handle audio chunks and send to Whisper API
};
```

#### Day 3-4: Whisper API Integration
```typescript
// /app/api/voice/transcribe/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const audioFile = formData.get('audio') as File;
  
  const response = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-1',
    language: 'en'
  });
  
  return Response.json({ text: response.text });
}
```

#### Day 5-7: TTS Integration
```typescript
// /app/api/voice/synthesize/route.ts
export async function POST(request: Request) {
  const { text, voice = 'alloy' } = await request.json();
  
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice,
    input: text,
  });
  
  return new Response(response.body);
}
```

### Phase 2: Voice Shopping Flow (Week 2)

#### Enhanced Conversation Flow
1. **Voice Query**: User speaks shopping request
2. **Transcription**: Convert speech to text via Whisper
3. **AI Processing**: Send to existing ChatGPT conversation flow
4. **Voice Response**: Convert AI response to speech via TTS
5. **Visual Update**: Update product canvas simultaneously

#### Voice-Specific Prompts
```typescript
const VOICE_SYSTEM_PROMPT = `
You are a voice-enabled shopping assistant. Keep responses concise and conversational 
for spoken delivery. When describing products visually, mention that users can see 
examples on their screen. Use natural speech patterns and avoid overly long sentences.
`;
```

### Phase 3: Advanced Voice Features (Week 3)

#### 1. Conversation Context
- **Voice History**: Maintain spoken conversation context
- **Mixed Input**: Support switching between voice and text
- **Resume Conversations**: Continue voice sessions across page reloads

#### 2. Voice Settings
- **Voice Selection**: Choose from OpenAI TTS voices
- **Playback Speed**: Adjustable speech rate (0.5x - 2x)
- **Auto-Play**: Toggle automatic TTS playback
- **Microphone Sensitivity**: Adjustable recording threshold

#### 3. Smart Audio Features
- **Background Noise Handling**: Filter ambient noise
- **Multi-turn Conversations**: Handle interruptions gracefully
- **Voice Commands**: "Stop", "Repeat", "Louder", etc.

## User Interface Design

### Voice Interface Layout
```
┌─────────────────────────────────────────┐
│  Product Visual Canvas (2/3 width)     │
│  ┌─────────────────────────────────┐    │
│  │  Product Images/Videos/Demos   │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Voice Interface (1/3 width)           │
│  ┌─────────────────────────────────┐    │
│  │  🎤 [Recording] [Settings]      │    │
│  │  ~~~~~~~~~~~~~~~~ (waveform)    │    │
│  │  💬 Conversation History        │    │
│  │  🔊 [Play] [Pause] [Replay]     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Voice Controls
- **Large Microphone Button**: Primary recording control
- **Visual Feedback**: Waveform animation during recording
- **Status Indicators**: Recording, processing, speaking states
- **Quick Actions**: Repeat last response, adjust volume

## Technical Requirements

### Dependencies
```json
{
  "openai": "^4.0.0",
  "web-audio-api": "^0.2.2",
  "@types/dom-mediacapture-record": "^1.0.11"
}
```

### Environment Variables
```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_MAX_RECORDING_TIME=300000  # 5 minutes
NEXT_PUBLIC_DEFAULT_VOICE=alloy
```

### Browser Compatibility
- **Microphone Access**: Requires HTTPS in production
- **Audio Formats**: WebM (Chrome), MP3 (Safari), WAV (fallback)
- **MediaRecorder Support**: Modern browsers (Chrome 47+, Firefox 25+)

## Error Handling & Edge Cases

### Audio Issues
- **Microphone Permissions**: Clear permission request flow
- **No Audio Input**: Fallback to text input
- **Network Issues**: Retry mechanism for API calls
- **Audio Quality**: Validation and user feedback

### Voice Processing
- **Transcription Errors**: Confidence scoring and retry options
- **Unclear Speech**: Prompt for repetition
- **Background Noise**: Noise detection and filtering
- **Long Pauses**: Auto-submit after silence threshold

## Testing Strategy

### Unit Tests
- Audio recording functionality
- API route handlers
- Voice control components

### Integration Tests
- Full voice conversation flow
- Mixed voice/text interactions
- Error scenarios and recovery

### User Testing
- Voice clarity and accuracy
- Response time optimization
- Accessibility for different accents/speech patterns

## Performance Considerations

### Audio Processing
- **Chunk Size**: Optimize for latency vs. accuracy
- **Compression**: Balance file size with quality
- **Caching**: Cache common TTS responses
- **Streaming**: Real-time audio processing where possible

### API Optimization
- **Rate Limiting**: Implement proper rate limiting
- **Cost Management**: Monitor OpenAI API usage
- **Fallback Options**: Graceful degradation to text-only mode

## Future Enhancements

### Advanced Voice Features
- **Conversation Interruption**: Handle mid-response interruptions
- **Voice Cloning**: Personalized voice responses
- **Multi-language**: Support for multiple languages
- **Voice Shortcuts**: Custom voice commands for common actions

### Shopping-Specific Voice Features
- **Price Reading**: Natural currency pronunciation
- **Product Spelling**: Handle product names and brands
- **Comparison Speech**: Structured comparison delivery
- **Purchase Voice Flow**: Voice-guided checkout process

## Security & Privacy

### Audio Data
- **No Storage**: Audio files not permanently stored
- **Encryption**: HTTPS for all audio transmissions
- **Privacy**: Clear data usage disclosure
- **Consent**: Explicit microphone permission requests

### API Security
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize all audio inputs
- **Error Logging**: Monitor for security issues
