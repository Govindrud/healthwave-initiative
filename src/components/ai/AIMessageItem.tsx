
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isProcessing?: boolean;
}

const AIMessageItem: React.FC<MessageProps> = ({ text, sender, timestamp, isProcessing }) => {
  return (
    <div className={`flex ${sender === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          sender === 'assistant' 
            ? 'bg-white border border-slate-200' 
            : 'bg-meant-600 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        <span className="text-xs opacity-70 block text-right mt-1">
          {isProcessing 
            ? 'Processing...' 
            : formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default AIMessageItem;
