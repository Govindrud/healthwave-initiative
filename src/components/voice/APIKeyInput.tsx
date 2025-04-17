
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface APIKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const APIKeyInput: React.FC<APIKeyInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <Label htmlFor="elevenlabs-api-key">ElevenLabs API Key</Label>
      <div className="flex items-center space-x-2 mt-2">
        <Input 
          id="elevenlabs-api-key"
          type="password"
          placeholder="Enter your ElevenLabs API key"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button variant="default" onClick={() => toast.success('API Key saved')}>
          Save
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You can get your API key from the ElevenLabs dashboard
      </p>
    </div>
  );
};

export default APIKeyInput;
