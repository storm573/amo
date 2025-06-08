# Voice Shopping Assistant Implementations

This application provides three different approaches to AI-powered shopping assistance, each with unique capabilities and use cases.

## 1. Text Shopping (`/search`)
- **Technology**: Traditional chat interface with ChatGPT
- **Best for**: Detailed product research, visual exploration
- **Features**:
  - Text-based conversation
  - Visual product canvas with images/videos
  - Product recommendations with detailed comparisons
  - Price tier analysis
  - Full conversation history

## 2. Voice Shopping (`/voice`)
- **Technology**: OpenAI Whisper (speech-to-text) + ChatGPT + TTS (text-to-speech)
- **Best for**: Hands-free interaction with full control
- **Features**:
  - Record voice messages
  - Manual start/stop recording
  - Voice settings (6 different voices, speed control)
  - Text transcription visible
  - Audio playback controls
  - Both voice and text conversation history

### Voice Settings Options:
- **Voices**: alloy, echo, fable, onyx, nova, shimmer
- **Speed**: 0.5x to 1.5x playback speeds
- **Auto-play**: Toggle automatic response playback

## 3. Real-time Voice (`/realtime`) ⚡
- **Technology**: OpenAI Realtime API with WebRTC
- **Best for**: Natural, conversational experience
- **Features**:
  - **True real-time conversation** - no recording delays
  - **Natural interruptions** - can interrupt AI mid-sentence
  - **Voice Activity Detection** - automatically detects when you're speaking
  - **Lower latency** - near-instantaneous responses
  - **Audio visualizers** - see voice activity in real-time
  - **WebRTC direct connection** - streams directly to OpenAI

### Real-time Advantages:
- **Natural flow**: Conversation flows like talking to a human
- **Interruption handling**: Can naturally interrupt and be interrupted
- **Emotional nuance**: Preserves tone, emotion, and speaking style
- **Simultaneous communication**: Can process speech while generating response
- **No transcription step**: Direct speech-to-speech processing

## Technical Differences

### Voice Shopping Architecture:
```
User Speech → Whisper API → Text → ChatGPT → Text → TTS API → Audio
```

### Real-time Voice Architecture:
```
User Speech ←→ OpenAI Realtime API (WebRTC) ←→ AI Response Audio
```

## When to Use Each

### Use Text Shopping when:
- Researching complex purchases
- Need to see detailed product comparisons
- Want to save conversation history
- Prefer reading over listening

### Use Voice Shopping when:
- Want hands-free interaction
- Need control over recording timing
- Want to see transcriptions
- Prefer traditional voice messaging style

### Use Real-time Voice when:
- Want the most natural conversation experience
- Need quick, interactive responses
- Value emotional nuance in conversation
- Want to interrupt and redirect the conversation naturally

## Browser Requirements

### All Implementations:
- Modern browser (Chrome, Firefox, Safari, Edge)
- Microphone access permission

### Real-time Voice Additional Requirements:
- **HTTPS connection** (required for WebRTC)
- **Stable internet connection** for real-time streaming
- **Modern WebRTC support** (available in all current browsers)

## Getting Started

1. **Set up environment variables**:
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Choose your interaction mode** from the homepage

4. **Allow microphone access** when prompted (for voice features)

## API Costs Comparison

- **Text Shopping**: Standard ChatGPT API pricing
- **Voice Shopping**: ChatGPT + Whisper + TTS API pricing
- **Real-time Voice**: Realtime API pricing (typically higher per minute but more efficient overall)

The Real-time API provides the best user experience for voice interactions, while the traditional voice approach gives more control and transparency over the process. 