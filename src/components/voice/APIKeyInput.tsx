
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface APIKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

const APIKeyInput: React.FC<APIKeyInputProps> = ({ value, onChange, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleSave = () => {
    if (value.trim().length > 0) {
      // Save to localStorage for persistence
      localStorage.setItem("elevenlabs-api-key", value);
      toast.success('API Key saved successfully');
      onSave(); // Notify parent component
    } else {
      toast.error('Please enter a valid API key');
    }
  };
  
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <Label htmlFor="elevenlabs-api-key">ElevenLabs API Key</Label>
      <div className="flex items-center space-x-2 mt-2">
        <div className="relative flex-1">
          <Input 
            id="elevenlabs-api-key"
            type={isVisible ? "text" : "password"}
            placeholder="Enter your ElevenLabs API key"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        </div>
        <Button variant="default" onClick={handleSave}>
          Save
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You can get your API key from the <a href="https://elevenlabs.io/app" target="_blank" rel="noopener noreferrer" className="text-meant-600 hover:underline">ElevenLabs dashboard</a>
      </p>
    </div>
  );
};

export default APIKeyInput;
