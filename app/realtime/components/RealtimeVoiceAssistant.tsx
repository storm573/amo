'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, Settings } from 'lucide-react';

interface ConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error?: string;
}

interface AudioVisualizerProps {
  stream: MediaStream | null;
  color: string;
  label: string;
}

function AudioVisualizer({ stream, color, label }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up audio analysis
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 256;
    source.connect(analyser);
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      // Clear canvas
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw waveform
      ctx.fillStyle = color;
      const barWidth = canvas.width / bufferLength;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stream, color]);

  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        className="w-full border border-gray-200 rounded-lg bg-gray-50"
      />
    </div>
  );
}

export default function RealtimeVoiceAssistant() {
  const [connectionState, setConnectionState] = useState<ConnectionState>({ status: 'disconnected' });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [inputStream, setInputStream] = useState<MediaStream | null>(null);
  const [outputStream, setOutputStream] = useState<MediaStream | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioElementRef.current = document.createElement('audio');
    audioElementRef.current.autoplay = true;
    audioElementRef.current.volume = 1.0;
    document.body.appendChild(audioElementRef.current);

    return () => {
      if (audioElementRef.current) {
        document.body.removeChild(audioElementRef.current);
      }
    };
  }, []);

  const createSession = useCallback(async () => {
    try {
      setConnectionState({ status: 'connecting' });

      const response = await fetch('/api/voice/realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voice: 'coral',
          instructions: `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the *single best* option for big-ticket or complex purchases. Speak in a warm, concise tone. Be opinionated on quality and value, but never biased toward any brand or retailer. Follow your structured shopping advisory process while keeping responses conversational for voice interaction.`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create session');
      }

      const data = await response.json();
      setSessionData(data);
      return data;
    } catch (error) {
      console.error('Failed to create session:', error);
      setConnectionState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }, []);

  const startWebRTCConnection = useCallback(async () => {
    try {
      // Create session first
      const session = await createSession();
      const ephemeralKey = session.client_secret.value;

      // Create peer connection
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      // Set up remote audio playback
      pc.ontrack = (event) => {
        console.log('Received remote track:', event.track.kind);
        if (event.streams && event.streams[0] && audioElementRef.current) {
          audioElementRef.current.srcObject = event.streams[0];
          setOutputStream(event.streams[0]);
        }
      };

      // Get microphone stream
      const micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 24000
        } 
      });
      
      setInputStream(micStream);
      pc.addTrack(micStream.getTracks()[0]);

      // Set up data channel for events
      const dataChannel = pc.createDataChannel('oai-events');
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => {
        console.log('Data channel opened');
        // Send initial session configuration
                 dataChannel.send(JSON.stringify({
           type: 'session.update',
           session: {
             modalities: ['text', 'audio'],
             instructions: `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the *single best* option for big-ticket or complex purchases. Speak in a warm, concise tone. Be opinionated on quality and value, but never biased toward any brand or retailer. Follow your structured shopping advisory process while keeping responses conversational for voice interaction.`,
             voice: 'coral',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500
            }
          }
        }));
      };

      dataChannel.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Received message:', message.type, message);
          
          // Handle different message types
          if (message.type === 'session.created') {
            console.log('Session created successfully');
            setIsSessionActive(true);
            setConnectionState({ status: 'connected' });
          } else if (message.type === 'error') {
            console.error('OpenAI error:', message.error);
            setConnectionState({ status: 'error', error: message.error.message });
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      dataChannel.onerror = (error) => {
        console.error('Data channel error:', error);
        setConnectionState({ status: 'error', error: 'Data channel error' });
      };

      // Create SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to OpenAI
      const sdpResponse = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01`,
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            'Content-Type': 'application/sdp'
          }
        }
      );

      if (!sdpResponse.ok) {
        throw new Error(`SDP exchange failed: ${sdpResponse.status}`);
      }

      const answerSDP = await sdpResponse.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answerSDP
      });

      console.log('WebRTC connection established');

    } catch (error) {
      console.error('WebRTC connection failed:', error);
      setConnectionState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Connection failed' 
      });
    }
  }, [createSession]);

  const disconnect = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (inputStream) {
      inputStream.getTracks().forEach(track => track.stop());
      setInputStream(null);
    }

    setOutputStream(null);
    setIsSessionActive(false);
    setConnectionState({ status: 'disconnected' });
    setSessionData(null);
  }, [inputStream]);

  const sendTextMessage = useCallback((text: string) => {
    if (!dataChannelRef.current || !isSessionActive) return;

    const message = {
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text }]
      }
    };

    dataChannelRef.current.send(JSON.stringify(message));
    dataChannelRef.current.send(JSON.stringify({ type: 'response.create' }));
  }, [isSessionActive]);

  const getStatusColor = () => {
    switch (connectionState.status) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionState.status) {
      case 'connected': return 'Connected - Voice session active';
      case 'connecting': return 'Connecting to OpenAI...';
      case 'error': return `Error: ${connectionState.error}`;
      default: return 'Disconnected';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Real-time Voice Assistant
        </h1>
        <p className="text-gray-600">
          Experience natural conversations with AI using OpenAI's Realtime API
        </p>
      </div>

      {/* Landing Image */}
      {!isSessionActive && (
        <div className="bg-white rounded-lg border p-6">
          <div className="aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src="/buying_landing.png" 
              alt="Real-time Voice Shopping Assistant" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      )}

      {/* Status */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionState.status === 'connected' ? 'bg-green-500' :
              connectionState.status === 'connecting' ? 'bg-yellow-500' :
              connectionState.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
            }`} />
            <span className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          
          {/* Connection Controls */}
          <div className="flex space-x-2">
                       {connectionState.status === 'disconnected' || connectionState.status === 'error' ? (
             <button
               onClick={startWebRTCConnection}
               disabled={false}
               className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
             >
               <Phone className="h-4 w-4" />
               <span>Start Session</span>
             </button>
           ) : connectionState.status === 'connecting' ? (
             <button
               disabled={true}
               className="flex items-center space-x-2 px-4 py-2 bg-gray-400 text-white rounded-lg font-medium transition-colors opacity-50"
             >
               <Phone className="h-4 w-4" />
               <span>Connecting...</span>
             </button>
           ) : (
             <button
               onClick={disconnect}
               className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
             >
               <PhoneOff className="h-4 w-4" />
               <span>End Session</span>
             </button>
           )}
          </div>
        </div>
      </div>

      {/* Audio Visualizers */}
      {(inputStream || outputStream) && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Audio Activity</h3>
          
          {inputStream && (
            <AudioVisualizer
              stream={inputStream}
              color="#3b82f6"
              label="Your Voice (Input)"
            />
          )}
          
          {outputStream && (
            <AudioVisualizer
              stream={outputStream}
              color="#ef4444"
              label="AI Assistant (Output)"
            />
          )}
        </div>
      )}

      {/* Quick Test Messages */}
      {isSessionActive && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Test Messages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Hello, I'm looking for a new laptop",
              "Can you help me find running shoes?",
              "What's the best smartphone under $500?",
              "I need a gift for my mom's birthday"
            ].map((message, index) => (
              <button
                key={index}
                onClick={() => sendTextMessage(message)}
                className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
              >
                "{message}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-medium mr-2">1.</span>
            Click "Start Session" to connect to the AI assistant
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">2.</span>
            Allow microphone access when prompted
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">3.</span>
            Start speaking naturally - the AI will respond with voice
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">4.</span>
            You can interrupt the AI naturally, just like a real conversation
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">5.</span>
            Use the test buttons to try text-based interactions
          </li>
        </ul>
      </div>
    </div>
  );
} 