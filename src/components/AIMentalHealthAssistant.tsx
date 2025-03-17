
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Bot, User } from "lucide-react";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

const AIMentalHealthAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "assistant",
      content: "Hi, I'm your mental health assistant. How are you feeling today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: MessageType = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Would you like to talk more about it?",
        "That sounds challenging. Remember that it's okay to take things one step at a time.",
        "Thank you for sharing. What strategies have helped you cope in the past?",
        "I hear you. Remember that your feelings are valid, and it's okay to ask for support.",
        "Would it help to practice a quick breathing exercise together?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage: MessageType = { 
        role: "assistant", 
        content: randomResponse 
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section id="ai-assistant" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Mental Health Assistant</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI assistant is here to provide immediate support and guidance. 
              While not a replacement for professional help, it can offer coping strategies 
              and a compassionate ear.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-meant-600" />
                Chat with MeantToHelp AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[400px]">
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
                        <div className="flex items-center mb-1">
                          {msg.role === "assistant" ? (
                            <Bot className="h-4 w-4 mr-1" />
                          ) : (
                            <User className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-xs font-semibold">
                            {msg.role === "user" ? "You" : "AI Assistant"}
                          </span>
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-tl-none max-w-[80%]">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-1" />
                          <span className="text-xs font-semibold">AI Assistant</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="dot-typing"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLoading) {
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !input.trim()}
                    className="bg-meant-600 hover:bg-meant-700"
                  >
                    <SendHorizonal className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              This AI assistant is designed to provide support but is not a substitute for professional help.
              If you're experiencing a crisis, please contact a mental health professional or
              call a crisis helpline immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMentalHealthAssistant;
