'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Mic, MessageSquare, AlertCircle, Phone, PhoneOff, Pause, Play } from 'lucide-react';
import VisualCanvas from '../search/components/VisualCanvas';
import BabyCarSeatsBuyingGuide from '../search/data/babyCarSeats';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
}

interface ConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error?: string;
}

interface VisualContent {
  type: 'image' | 'video' | 'comparison' | 'example' | 'search' | 'showcase';
  title: string;
  description: string;
  category?: string;
  src?: string;
  searchQuery?: string;
  items?: Array<{
    name: string;
    image: string;
    features: string[];
    priceRange: string;
  }>;
  images?: Array<{
    url: string;
    title: string;
    description?: string;
  }>;
}



export default function VoicePage() {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    isLoading: false,
    sessionId: uuidv4()
  });

  const [connectionState, setConnectionState] = useState<ConnectionState>({ status: 'disconnected' });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<{ user?: string; assistant?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [visualContent, setVisualContent] = useState<VisualContent>({
    type: 'image',
    title: 'Meet Amo, Your Personal Shopping Assistant',
    description: 'Hi! I\'m Amo, your shopping assistant. I can help you find the perfect product for your needs. Just tell me what you\'re shopping for and I\'ll guide you through the process!',
    src: '/buying_landing.png'
  });
  const [showBabyCarSeatsGuide, setShowBabyCarSeatsGuide] = useState(false);
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState<any[]>([]);
  
  // Track when baby car seat is mentioned to trigger demo
  const [carSeatMentioned, setCarSeatMentioned] = useState(false);
  const [guideTimer, setGuideTimer] = useState<NodeJS.Timeout | null>(null);

  // Memoize recommendations to prevent unnecessary re-renders
  const memoizedRecommendations = useMemo(() => currentRecommendations, [currentRecommendations]);

  // Function to detect baby car seat mentions and trigger demo
  const detectCarSeatMention = useCallback((message: string) => {
    const lowerMessage = message.toLowerCase();
    return lowerMessage.includes('car seat') || 
           lowerMessage.includes('baby seat') ||
           lowerMessage.includes('infant seat') ||
           lowerMessage.includes('carseat') ||
           (lowerMessage.includes('baby') && lowerMessage.includes('seat'));
  }, []);

  // Function to trigger the car seat guide after delay
  const triggerCarSeatGuide = useCallback(() => {
    console.log('Baby car seat mentioned - starting 10 second timer');
    
    // Clear any existing timer
    if (guideTimer) {
      clearTimeout(guideTimer);
    }
    
    // Set a 10-second timer to show loading, then guide
    const timer = setTimeout(() => {
      console.log('10 seconds elapsed - showing loading');
      setIsLoadingGuide(true);
      
      // After 2 seconds of loading, show the guide
      setTimeout(() => {
        setShowBabyCarSeatsGuide(true);
        setIsLoadingGuide(false);
      }, 2000);
    }, 10000); // 10 seconds
    
    setGuideTimer(timer);
  }, [guideTimer]);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

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

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const detectProductFromMessage = useCallback((content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Check for baby car seats specifically first
    if (lowerContent.includes('baby car seat') || lowerContent.includes('baby car seats')) {
      return {
        category: 'baby-carseat',
        title: 'Baby Car Seats Buying Guide',
        productName: 'baby car seat'
      };
    }
    
    // Common product categories and their keywords
    const productKeywords = [
      { names: ['car seat', 'infant car seat', 'convertible car seat', 'booster seat'], category: 'carseat', title: 'Car Seat Safety Guide' },
      { names: ['laptop', 'computer', 'notebook', 'macbook', 'pc'], category: 'laptop', title: 'Laptop Shopping Guide' },
      { names: ['phone', 'smartphone', 'iphone', 'android', 'mobile'], category: 'smartphone', title: 'Smartphone Selection' },
      { names: ['car', 'vehicle', 'auto', 'sedan', 'suv', 'truck'], category: 'car', title: 'Car Buying Guide' },
      { names: ['couch', 'sofa', 'sectional', 'furniture', 'loveseat'], category: 'couch', title: 'Couch Selection Guide' },
      { names: ['stroller', 'baby stroller', 'pram', 'pushchair'], category: 'stroller', title: 'Stroller Buying Guide' },
      { names: ['camera', 'dslr', 'mirrorless', 'photography'], category: 'camera', title: 'Camera Selection Guide' },
      { names: ['mattress', 'bed', 'sleep', 'memory foam'], category: 'mattress', title: 'Mattress Buying Guide' },
      { names: ['bike', 'bicycle', 'cycling', 'road bike', 'mountain bike'], category: 'bike', title: 'Bike Selection Guide' },
      { names: ['headphones', 'earbuds', 'audio', 'speakers'], category: 'audio', title: 'Audio Equipment Guide' },
      { names: ['tv', 'television', 'monitor', 'display', '4k', 'smart tv'], category: 'tv', title: 'TV Selection Guide' },
      { names: ['tablet', 'ipad', 'android tablet'], category: 'tablet', title: 'Tablet Buying Guide' },
      { names: ['watch', 'smartwatch', 'apple watch', 'fitness tracker'], category: 'watch', title: 'Watch Selection Guide' },
      { names: ['shoes', 'sneakers', 'running shoes', 'boots'], category: 'shoes', title: 'Shoe Selection Guide' },
      { names: ['refrigerator', 'fridge', 'appliance', 'kitchen'], category: 'appliance', title: 'Appliance Buying Guide' }
    ];

    for (const product of productKeywords) {
      for (const keyword of product.names) {
        if (lowerContent.includes(keyword)) {
          return {
            category: product.category,
            title: product.title,
            productName: keyword
          };
        }
      }
    }
    
    return null;
  }, []);

  const updateVisualContent = useCallback((productInfo: { category: string; title: string; productName: string }) => {
    // Handle baby car seats specifically - but don't show guide immediately
    if (productInfo.category === 'baby-carseat') {
      // Set car seat specific recommendations
      setCurrentRecommendations([
        {
          id: '1',
          name: 'Britax B-Safe Ultra Infant Car Seat',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
          price: '$249.99',
          rating: 4.8,
          keyFeature: 'Anti-Rebound Bar',
          matchReason: 'Top safety rating for newborns'
        },
        {
          id: '2',
          name: 'Chicco KeyFit 30 Infant Car Seat',
          image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&h=200&fit=crop',
          price: '$179.99',
          rating: 4.6,
          keyFeature: 'Easy Installation',
          matchReason: 'Great value with excellent safety'
        },
        {
          id: '3',
          name: 'Graco SnugRide SnugLock 35',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
          price: '$149.99',
          rating: 4.4,
          keyFeature: 'One-Second Install',
          matchReason: 'Budget-friendly with key features'
        }
      ]);
      // Don't automatically show the guide - wait for 5 questions to be answered
      return;
    }

    // Set category-specific recommendations
    const getRecommendations = () => {
      switch (productInfo.category) {
        case 'laptop':
          return [
            {
              id: '1',
              name: 'MacBook Air M2',
              image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
              price: '$1,199',
              rating: 4.8,
              keyFeature: 'M2 Chip Performance',
              matchReason: 'Perfect for productivity'
            },
            {
              id: '2',
              name: 'Dell XPS 13',
              image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop',
              price: '$999',
              rating: 4.6,
              keyFeature: 'InfinityEdge Display',
              matchReason: 'Great Windows alternative'
            },
            {
              id: '3',
              name: 'Lenovo ThinkPad X1',
              image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200&h=200&fit=crop',
              price: '$1,299',
              rating: 4.7,
              keyFeature: 'Business Grade Build',
              matchReason: 'Professional reliability'
            }
          ];
        case 'stroller':
          return [
            {
              id: '1',
              name: 'UPPAbaby Vista V2',
              image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
              price: '$929',
              rating: 4.8,
              keyFeature: 'Expandable Design',
              matchReason: 'Grows with your family'
            },
            {
              id: '2',
              name: 'Baby Jogger City Select',
              image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&h=200&fit=crop',
              price: '$499',
              rating: 4.5,
              keyFeature: 'Multiple Configurations',
              matchReason: 'Versatile and reliable'
            },
            {
              id: '3',
              name: 'Chicco Bravo Quick-Fold',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
              price: '$199',
              rating: 4.3,
              keyFeature: 'One-Hand Fold',
              matchReason: 'Budget-friendly choice'
            }
          ];
        default:
          return [
            {
              id: '1',
              name: `Best ${productInfo.productName}`,
              image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
              price: 'From $199',
              rating: 4.6,
              keyFeature: 'Top Rated',
              matchReason: 'Most popular choice'
            },
            {
              id: '2',
              name: `Premium ${productInfo.productName}`,
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
              price: 'From $399',
              rating: 4.8,
              keyFeature: 'Premium Quality',
              matchReason: 'Best performance'
            },
            {
              id: '3',
              name: `Budget ${productInfo.productName}`,
              image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
              price: 'From $99',
              rating: 4.2,
              keyFeature: 'Great Value',
              matchReason: 'Affordable option'
            }
          ];
      }
    };

    setCurrentRecommendations(getRecommendations());

    // Create category-specific visual content
    const getProductContent = () => {
      switch (productInfo.category) {
        case 'carseat':
          return {
            type: 'example' as const,
            title: productInfo.title,
            description: `Perfect! Car seat safety is crucial. I'll help you choose the best option for your child's age, weight, and your vehicle. Here are the main types:`,
            category: productInfo.category,
            items: [
              {
                name: 'Infant Car Seat',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
                features: ['Rear-facing only', 'Newborn to 12 months', 'Detachable carrier', '4-35 lbs typically'],
                priceRange: '$100-$400'
              },
              {
                name: 'Convertible Car Seat',
                image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop',
                features: ['Rear & forward-facing', 'Birth to 4+ years', 'Grows with child', 'Higher weight limits'],
                priceRange: '$150-$500'
              },
              {
                name: 'Booster Seat',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                features: ['Uses car seat belt', '4-12 years old', 'Lightweight & portable', 'Easy installation'],
                priceRange: '$50-$200'
              }
            ]
          };
        
        case 'stroller':
          return {
            type: 'example' as const,
            title: productInfo.title,
            description: `Excellent choice! The right stroller makes daily life so much easier. Let me show you the main categories:`,
            category: productInfo.category,
            items: [
              {
                name: 'Lightweight Umbrella',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
                features: ['Under 15 lbs', 'Compact fold', 'Easy maneuverability', 'Travel-friendly'],
                priceRange: '$50-$200'
              },
              {
                name: 'Full-Size Standard',
                image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop',
                features: ['Large storage basket', 'Smooth ride', 'Multiple recline positions', 'Cup holders & accessories'],
                priceRange: '$150-$600'
              },
              {
                name: 'Jogging Stroller',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                features: ['Fixed front wheel', 'Air-filled tires', 'Hand brake', 'Suspension system'],
                priceRange: '$200-$800'
              }
            ]
          };

        case 'laptop':
          return {
            type: 'example' as const,
            title: productInfo.title,
            description: `Great! I'll help you find the perfect laptop for your needs. Here are the main categories to consider:`,
            category: productInfo.category,
            items: [
              {
                name: 'Ultrabook',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                features: ['Thin & lightweight', 'Long battery life', 'SSD storage', 'Premium build'],
                priceRange: '$800-$2000'
              },
              {
                name: 'Gaming Laptop',
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
                features: ['Dedicated GPU', 'High refresh display', 'Powerful CPU', 'RGB lighting'],
                priceRange: '$1000-$3000'
              },
              {
                name: 'Budget Laptop',
                image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop',
                features: ['Basic computing', 'Good value', 'Decent performance', 'Essential features'],
                priceRange: '$300-$800'
              }
            ]
          };

        default:
          return {
            type: 'image' as const,
            title: productInfo.title,
            description: `Perfect! I'll help you find the ideal ${productInfo.productName} that matches your needs and budget. Let me ask you a few questions to understand what you're looking for.`,
            category: productInfo.category,
            src: '/buying_landing.png'
          };
      }
    };

    setVisualContent(getProductContent());
  }, []);

  const addMessage = useCallback((message: Message) => {
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));

    // Check if baby car seat is mentioned to trigger demo
    const messageContent = message.content.toLowerCase();
    if (detectCarSeatMention(message.content) && !carSeatMentioned && !showBabyCarSeatsGuide && !isLoadingGuide) {
      console.log('Car seat mentioned in message:', message.content);
      setCarSeatMentioned(true);
      triggerCarSeatGuide();
    }

    // Check if user mentioned a product (original logic)
    if (message.role === 'user') {
      const productInfo = detectProductFromMessage(message.content);
      if (productInfo) {
        updateVisualContent(productInfo);
      }
    }
  }, [detectProductFromMessage, updateVisualContent, detectCarSeatMention, triggerCarSeatGuide, carSeatMentioned, showBabyCarSeatsGuide, isLoadingGuide]);

  const createSession = useCallback(async () => {
    try {
      setConnectionState({ status: 'connecting' });

      const response = await fetch('/api/voice/realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voice: 'coral',
          instructions: `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the best products for their needs. 

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

Keep responses warm, concise, and conversational for voice interaction. Be helpful but not pushy.`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create session');
      }

      const data = await response.json();
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

  const startRealtimeConnection = useCallback(async () => {
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
       
       micStreamRef.current = micStream;
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
             instructions: `You are **Amo**, an experienced yet brand-agnostic shopping advisor who helps people choose the best products for their needs. 

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

Keep responses warm, concise, and conversational for voice interaction. Be helpful but not pushy.`,
             voice: 'coral',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1'
            },
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
          } else if (message.type === 'conversation.item.input_audio_transcription.completed') {
            // User speech transcription
            const userText = message.transcript;
            if (userText && userText.trim()) {
              const userMessage: Message = {
                id: uuidv4(),
                role: 'user',
                content: userText.trim(),
                timestamp: new Date()
              };
              addMessage(userMessage);
            }
          } else if (message.type === 'response.audio_transcript.delta') {
            // AI response transcription (streaming)
            const delta = message.delta;
            if (delta) {
              setCurrentMessage(prev => ({
                ...prev,
                assistant: (prev.assistant || '') + delta
              }));
            }
          } else if (message.type === 'response.audio_transcript.done') {
            // AI response transcription complete
            const transcript = message.transcript;
            if (transcript && transcript.trim()) {
              const assistantMessage: Message = {
                id: uuidv4(),
                role: 'assistant',
                content: transcript.trim(),
                timestamp: new Date()
              };
              addMessage(assistantMessage);
              setCurrentMessage({});
            }
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
      setError(error instanceof Error ? error.message : 'Connection failed');
    }
  }, [createSession, addMessage]);

     const pauseSession = useCallback(() => {
     if (micStreamRef.current) {
       // Disable microphone track
       micStreamRef.current.getTracks().forEach(track => {
         track.enabled = false;
       });
       setIsPaused(true);
     }
   }, []);

   const resumeSession = useCallback(() => {
     if (micStreamRef.current) {
       // Re-enable microphone track
       micStreamRef.current.getTracks().forEach(track => {
         track.enabled = true;
       });
       setIsPaused(false);
     }
   }, []);

   const disconnect = useCallback(() => {
     if (peerConnectionRef.current) {
       peerConnectionRef.current.close();
       peerConnectionRef.current = null;
     }

     if (dataChannelRef.current) {
       dataChannelRef.current.close();
       dataChannelRef.current = null;
     }

     if (micStreamRef.current) {
       micStreamRef.current.getTracks().forEach(track => track.stop());
       micStreamRef.current = null;
     }

     setIsSessionActive(false);
     setIsPaused(false);
     setConnectionState({ status: 'disconnected' });
     setCurrentMessage({});
   }, []);

     const startNewConversation = () => {
     setConversation({
       messages: [],
       isLoading: false,
       sessionId: uuidv4()
     });
     setCurrentMessage({});
     setError(null);
     setIsPaused(false);
     setShowBabyCarSeatsGuide(false);
     setIsLoadingGuide(false);
     setCarSeatMentioned(false);
     if (guideTimer) {
       clearTimeout(guideTimer);
       setGuideTimer(null);
     }
     setCurrentRecommendations([]);
     // Reset visual content to default
     setVisualContent({
       type: 'image',
       title: 'Meet Amo, Your Personal Shopping Assistant',
       description: 'Hi! I\'m Amo, your shopping assistant. I can help you find the perfect product for your needs. Just tell me what you\'re shopping for and I\'ll guide you through the process!',
       src: '/buying_landing.png'
     });
   };

   const forceShowCarSeatGuide = () => {
     console.log('Manually triggering car seat guide demo');
     setIsLoadingGuide(true);
     setTimeout(() => {
       setShowBabyCarSeatsGuide(true);
       setIsLoadingGuide(false);
     }, 1000);
   };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
       case 'connected': 
         return isPaused ? 'Connected - Session paused (microphone disabled)' : 'Connected - Speak naturally to the assistant';
       case 'connecting': return 'Connecting to OpenAI...';
       case 'error': return `Error: ${connectionState.error}`;
       default: return 'Disconnected';
     }
   };

  // Loading component for baby car seats guide
  const loadingGuide = useMemo(() => {
    if (!isLoadingGuide) return null;
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading Car Seat Guide Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing an interactive baby car seat buying guide for you...
          </p>
          <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
            ✅ Car seat demo triggered: {carSeatMentioned ? 'Yes' : 'Waiting...'}
          </div>
        </div>
      </div>
    );
  }, [isLoadingGuide, carSeatMentioned]);

  // Memoize the baby car seats guide to prevent re-renders
  const babyCarSeatsGuide = useMemo(() => {
    if (!showBabyCarSeatsGuide) return null;
    return <BabyCarSeatsBuyingGuide recommendations={memoizedRecommendations} />;
  }, [showBabyCarSeatsGuide, memoizedRecommendations]);

  // Memoize visual canvas to prevent re-renders
  const visualCanvas = useMemo(() => {
    if (showBabyCarSeatsGuide || isLoadingGuide) return null;
    return (
      <VisualCanvas 
        content={visualContent} 
        isLoading={conversation.isLoading}
        recommendations={memoizedRecommendations} 
      />
    );
  }, [showBabyCarSeatsGuide, isLoadingGuide, visualContent, conversation.isLoading, memoizedRecommendations]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Product Canvas (2/3 width) */}
      <div className="w-2/3 h-full">
        {isLoadingGuide ? loadingGuide : showBabyCarSeatsGuide ? babyCarSeatsGuide : visualCanvas}
      </div>

      {/* Voice Interface (1/3 width) */}
      <div className="w-1/3 h-full flex flex-col bg-white">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                🎤
              </div>
              <div>
                <h1 className="text-lg font-semibold">Chat with Amo</h1>
                <p className="text-xs text-gray-500">Your shopping expert</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!showBabyCarSeatsGuide && !isLoadingGuide && conversation.messages.length > 4 && (
                <button
                  onClick={forceShowCarSeatGuide}
                  className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 border border-green-300 rounded"
                >
                  Demo Guide
                </button>
              )}
              <button
                onClick={startNewConversation}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                New Chat
              </button>
            </div>
          </div>
        </header>

        {/* Connection Status */}
                 <div className="px-4 py-3 bg-gray-50 border-b">
           <div className="flex items-center space-x-3">
             <div className={`w-3 h-3 rounded-full ${
               connectionState.status === 'connected' ? 
                 (isPaused ? 'bg-orange-500' : 'bg-green-500') :
               connectionState.status === 'connecting' ? 'bg-yellow-500' :
               connectionState.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
             }`} />
             <span className={`text-sm font-medium ${getStatusColor()}`}>
               {getStatusText()}
             </span>
           </div>
           {/* Debug: Show demo trigger status */}
           {carSeatMentioned && (
             <div className="mt-2 text-xs text-gray-600">
               Car seat demo: {carSeatMentioned ? 'Triggered' : 'Waiting'} {guideTimer ? '(Timer active)' : ''}
             </div>
           )}
         </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.length === 0 && !currentMessage.assistant ? (
            <div className="text-center text-gray-500 mt-8">
              <Mic className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">
                Click "Start Voice Session" below and tell me what you're shopping for!
              </p>
            </div>
          ) : (
            <>
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Current streaming message */}
              {currentMessage.assistant && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-gray-100 text-gray-900 rounded-lg p-3">
                    <div className="text-sm">{currentMessage.assistant}</div>
                    <div className="text-xs mt-1 text-gray-500">
                      <span className="animate-pulse">Speaking...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Voice Controls */}
        <div className="border-t p-4 space-y-4">
                     {/* Connection Controls */}
           <div className="flex justify-center gap-3">
             {connectionState.status === 'disconnected' || connectionState.status === 'error' ? (
               <button
                 onClick={startRealtimeConnection}
                 disabled={false}
                 className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
               >
                 <Phone className="h-5 w-5" />
                 <span>Start Voice Session</span>
               </button>
             ) : connectionState.status === 'connecting' ? (
               <button
                 disabled={true}
                 className="flex items-center space-x-2 px-6 py-3 bg-gray-400 text-white rounded-lg font-medium opacity-50"
               >
                 <Phone className="h-5 w-5" />
                 <span>Connecting...</span>
               </button>
             ) : (
               <>
                 {/* Pause/Resume Button */}
                 {isPaused ? (
                   <button
                     onClick={resumeSession}
                     className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                   >
                     <Play className="h-5 w-5" />
                     <span>Resume</span>
                   </button>
                 ) : (
                   <button
                     onClick={pauseSession}
                     className="flex items-center space-x-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                   >
                     <Pause className="h-5 w-5" />
                     <span>Pause</span>
                   </button>
                 )}
                 
                 {/* End Session Button */}
                 <button
                   onClick={disconnect}
                   className="flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                 >
                   <PhoneOff className="h-5 w-5" />
                   <span>End</span>
                 </button>
               </>
             )}
           </div>

          {/* Instructions */}
          {isSessionActive && (
                         <div className="bg-blue-50 rounded-lg p-4">
               <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 How Amo Works</h4>
               <ul className="text-xs text-blue-800 space-y-1">
                 <li>• Just tell me what you're shopping for</li>
                 <li>• I'll ask smart questions to understand your needs</li>
                 <li>• I'll break down the market and explain key features</li>
                 <li>• You'll get my top 3-5 personalized recommendations</li>
                 <li>• You can interrupt me anytime to clarify or ask questions</li>
                 <li>• Use "Pause" to temporarily mute your microphone</li>
               </ul>
             </div>
          )}
        </div>
      </div>
    </div>
  );
} 