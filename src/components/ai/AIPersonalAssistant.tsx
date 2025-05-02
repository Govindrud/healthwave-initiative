
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, ArrowRight } from 'lucide-react';
import { useAIChat } from '@/hooks/use-ai-chat';
import AIMessageItem from './AIMessageItem';
import AIPersonaSelector from './AIPersonaSelector';

const AIPersonalAssistant: React.FC = () => {
  const { 
    personaId,
    selectedPersona,
    messages,
    userInput,
    setUserInput,
    isProcessing,
    isListening,
    handleSendMessage,
    startListening,
    changePersona
  } = useAIChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <img 
              src={selectedPersona.avatar} 
              alt={selectedPersona.name} 
              className="w-10 h-10 rounded-full" 
            />
            <div>
              <span>{selectedPersona.name}</span>
              <span className="text-sm text-gray-500 block">{selectedPersona.role}</span>
            </div>
          </CardTitle>
          <CardDescription>
            {selectedPersona.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AIPersonaSelector activePersonaId={personaId} onPersonaChange={changePersona} />
          
          <div className="bg-slate-50 rounded-md border h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <AIMessageItem 
                key={index}
                text={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
              />
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => startListening()} 
              disabled={isListening}
            >
              {isListening ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Input 
              placeholder="Type your message..." 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              onKeyDown={handleKeyPress}
              disabled={isListening}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!userInput.trim() || isProcessing}
            >
              {isProcessing ? <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          <div className="w-full mt-4">
            <Button variant="outline" className="w-full" onClick={() => window.location.href="/ai-voice-agent"}>
              Try Voice Assistant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIPersonalAssistant;
