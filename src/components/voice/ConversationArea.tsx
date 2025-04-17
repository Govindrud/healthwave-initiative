
import React from "react";
import { VoiceMessageType } from "@/hooks/use-voice-assistant";

interface ConversationAreaProps {
  messages: VoiceMessageType[];
}

const ConversationArea: React.FC<ConversationAreaProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-md bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-meant-600 text-white rounded-tr-none"
                : "bg-gray-200 text-gray-800 rounded-tl-none"
            }`}
          >
            <div className="mb-1 text-xs font-semibold">
              {msg.role === "user" ? "You" : "AI Assistant"}
            </div>
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationArea;
