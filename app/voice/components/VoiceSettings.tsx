'use client';

import { useState } from 'react';
import { Settings, Volume2, Mic } from 'lucide-react';

interface VoiceSettingsProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  autoPlay: boolean;
  onAutoPlayChange: (autoPlay: boolean) => void;
}

const VOICE_OPTIONS = [
  { value: 'alloy', label: 'Alloy', description: 'Neutral, balanced voice' },
  { value: 'echo', label: 'Echo', description: 'Clear, articulate voice' },
  { value: 'fable', label: 'Fable', description: 'Warm, storytelling voice' },
  { value: 'onyx', label: 'Onyx', description: 'Deep, authoritative voice' },
  { value: 'nova', label: 'Nova', description: 'Bright, energetic voice' },
  { value: 'shimmer', label: 'Shimmer', description: 'Soft, gentle voice' },
];

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x', description: 'Very slow' },
  { value: 0.75, label: '0.75x', description: 'Slow' },
  { value: 1.0, label: '1x', description: 'Normal' },
  { value: 1.25, label: '1.25x', description: 'Fast' },
  { value: 1.5, label: '1.5x', description: 'Very fast' },
];

export default function VoiceSettings({
  selectedVoice,
  onVoiceChange,
  playbackSpeed,
  onSpeedChange,
  autoPlay,
  onAutoPlayChange,
}: VoiceSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const testVoice = async (voice: string) => {
    try {
      const response = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Hello! This is how the ${voice} voice sounds. I'm your shopping assistant, ready to help you find the perfect products.`,
          voice: voice,
          speed: playbackSpeed,
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.play().catch(console.error);
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Voice test failed:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Settings Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Settings className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Voice Settings</span>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </button>

      {/* Settings Panel */}
      {isExpanded && (
        <div className="border-t p-4 space-y-6">
          {/* Voice Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Mic className="h-4 w-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Voice</label>
            </div>
            <div className="grid gap-2">
              {VOICE_OPTIONS.map((voice) => (
                <div
                  key={voice.value}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedVoice === voice.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onVoiceChange(voice.value)}
                >
                  <div>
                    <div className="font-medium text-sm">{voice.label}</div>
                    <div className="text-xs text-gray-500">{voice.description}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        testVoice(voice.value);
                      }}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      Test
                    </button>
                    {selectedVoice === voice.value && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playback Speed */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Playback Speed</label>
            </div>
            <div className="flex space-x-2">
              {SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed.value}
                  onClick={() => onSpeedChange(speed.value)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    playbackSpeed === speed.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{speed.label}</div>
                  <div className="text-xs text-gray-500">{speed.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-play Toggle */}
          <div>
            <label className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700">Auto-play responses</div>
                <div className="text-xs text-gray-500">Automatically play voice responses</div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(e) => onAutoPlayChange(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => onAutoPlayChange(!autoPlay)}
                  className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${
                    autoPlay ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      autoPlay ? 'translate-x-5' : 'translate-x-0'
                    } mt-0.5 ml-0.5`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Quick Test */}
          <div className="pt-4 border-t">
            <button
              onClick={() => testVoice(selectedVoice)}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
            >
              Test Current Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 