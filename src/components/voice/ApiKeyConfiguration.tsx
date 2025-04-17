
import React from "react";
import APIKeyInput from "./APIKeyInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiKeyConfigurationProps {
  elevenLabsApiKey: string;
  elevenLabsAgentId: string;
  setElevenLabsApiKey: (key: string) => void;
  setElevenLabsAgentId: (id: string) => void;
  onSave: () => void;
  apiKeyConfigured: boolean;
  setApiKeyConfigured: (configured: boolean) => void;
  agentMode?: boolean;
}

const ApiKeyConfiguration: React.FC<ApiKeyConfigurationProps> = ({
  elevenLabsApiKey,
  elevenLabsAgentId,
  setElevenLabsApiKey,
  setElevenLabsAgentId,
  onSave,
  apiKeyConfigured,
  setApiKeyConfigured,
  agentMode,
}) => {
  if (!apiKeyConfigured) {
    return (
      <div className="mb-6 space-y-4">
        <APIKeyInput
          value={elevenLabsApiKey}
          onChange={setElevenLabsApiKey}
          onSave={onSave}
        />
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
          <label htmlFor="agent-id" className="block text-gray-700 font-medium mb-2">
            ElevenLabs Agent ID
          </label>
          <input
            id="agent-id"
            type="text"
            value={elevenLabsAgentId}
            onChange={(e) => setElevenLabsAgentId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-meant-500"
            placeholder="Enter your ElevenLabs Agent ID"
          />
          <p className="text-xs text-gray-500 mt-2">
            Using ElevenLabs Agents enables more advanced conversation capabilities.
            Default: 0iVgYogaiePekeUt2C1h
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="text-sm text-green-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        ElevenLabs API Key configured
        {agentMode && <span className="ml-2 text-amber-600">(Agent Mode)</span>}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setApiKeyConfigured(false);
        }}
      >
        Change API Keys
      </Button>
    </div>
  );
};

export default ApiKeyConfiguration;
