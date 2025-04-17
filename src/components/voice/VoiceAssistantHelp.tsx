
import React from "react";

interface VoiceAssistantHelpProps {
  emotionEnabled: boolean;
}

const VoiceAssistantHelp: React.FC<VoiceAssistantHelpProps> = ({ emotionEnabled }) => {
  return (
    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">How to use the Voice Assistant</h3>
      <ul className="list-disc pl-5 space-y-2 text-blue-700">
        <li>Click the "Start Speaking" button and allow microphone access</li>
        <li>Speak naturally about how you're feeling or what's on your mind</li>
        <li>The assistant will listen and respond with supportive guidance</li>
        {emotionEnabled && <li>Your emotions will be analyzed to provide more tailored responses</li>}
        <li>You can adjust the volume or stop the assistant from speaking at any time</li>
        <li>Click "Stop" when you're done with the conversation</li>
      </ul>
      <p className="mt-4 text-sm text-blue-600">
        <strong>Note:</strong> This is a supportive tool and not a replacement for professional mental health care. 
        If you're experiencing a crisis, please contact a mental health professional or crisis hotline.
      </p>
    </div>
  );
};

export default VoiceAssistantHelp;
