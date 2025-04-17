
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  toggleListening: () => void;
  stopSpeaking: () => void;
  adjustVolume: (volume: number) => void;
  disabled?: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  volume,
  toggleListening,
  stopSpeaking,
  adjustVolume,
  disabled = false,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md">
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          className={isListening ? "bg-red-500" : "bg-meant-600"}
          size="lg"
          disabled={disabled}
        >
          {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isListening ? "Stop" : "Start"} Speaking
        </Button>
        
        {isListening && (
          <div className="animate-pulse text-sm text-red-500">
            Listening...
          </div>
        )}
        
        {disabled && (
          <div className="text-sm text-amber-600">
            Please configure API key first
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button 
            onClick={() => adjustVolume(0)}
            className="p-2 hover:bg-gray-200 rounded-full"
            disabled={disabled}
          >
            <VolumeX size={18} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => adjustVolume(parseFloat(e.target.value))}
            className={`w-24 h-2 mx-2 ${disabled ? "opacity-50" : ""}`}
            disabled={disabled}
          />
          <button 
            onClick={() => adjustVolume(1)}
            className="p-2 hover:bg-gray-200 rounded-full"
            disabled={disabled}
          >
            <Volume2 size={18} />
          </button>
        </div>
        
        {isSpeaking && (
          <Button 
            onClick={stopSpeaking} 
            variant="outline" 
            size="sm"
            disabled={disabled}
          >
            <VolumeX className="mr-2 h-4 w-4" />
            Stop Audio
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceControls;
