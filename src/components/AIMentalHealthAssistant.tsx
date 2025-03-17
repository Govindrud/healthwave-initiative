
import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Brain, AlertCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AIMentalHealthAssistant = () => {
  const [messages, setMessages] = useState<{role: "user" | "assistant"; content: string}[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI mental health assistant. How are you feeling today? You can share your thoughts, ask for wellness tips, or just chat about your day."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mock responses - in a real app, this would connect to an AI API
  const mockResponses = [
    "I understand that can be challenging. Have you tried any relaxation techniques like deep breathing or progressive muscle relaxation?",
    "It sounds like you're going through a lot right now. Remember that it's okay to take things one step at a time.",
    "That's a common feeling. Many people experience similar thoughts. Would you like to talk more about specific situations that trigger this?",
    "I hear you. Sometimes writing down your thoughts in a journal can help process these emotions. Have you tried journaling?",
    "Taking care of your mental health is just as important as physical health. Small steps like regular sleep schedules and short walks can make a difference.",
    "It might help to practice mindfulness - focusing on the present moment without judgment. Would you like me to suggest a simple mindfulness exercise?",
    "Remember that seeking professional help is always an option. Would you like information about finding a therapist or counselor?",
    "That's a great question. Research suggests that regular physical activity can help reduce anxiety and improve mood through the release of endorphins."
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages([...newMessages, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Hi there! I'm your AI mental health assistant. How are you feeling today? You can share your thoughts, ask for wellness tips, or just chat about your day."
    }]);
  };

  return (
    <section id="ai-assistant" className="section-container bg-gradient-to-b from-meant-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            AI Support
          </span>
          <h2 className="font-bold mb-6 text-balance">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
              Your Personal Mental Health Assistant
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI assistant for immediate emotional support, wellness tips, and mental health resources. 
            While not a replacement for professional care, it's here to listen and guide you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-meant-100"
            >
              <div className="flex items-center mb-4">
                <Brain className="text-meant-600 mr-2" size={24} />
                <h3 className="text-lg font-medium">How It Works</h3>
              </div>
              
              <ul className="space-y-4 text-sm">
                <li className="flex">
                  <span className="bg-meant-100 text-meant-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>Share how you're feeling or ask questions about mental wellness</span>
                </li>
                <li className="flex">
                  <span className="bg-meant-100 text-meant-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>Receive thoughtful responses based on evidence-based approaches</span>
                </li>
                <li className="flex">
                  <span className="bg-meant-100 text-meant-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>Get suggestions for helpful resources and techniques to try</span>
                </li>
              </ul>
              
              <Alert className="mt-6 bg-meant-50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This AI assistant is not a substitute for professional mental health care. If you're in crisis, please contact emergency services or a crisis hotline immediately.
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-meant-100 flex flex-col h-[500px]"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-meant-600 flex items-center justify-center mr-2">
                  <Bot className="text-white" size={18} />
                </div>
                <h3 className="font-medium">Mental Health Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearChat}
                className="text-muted-foreground"
              >
                <Trash size={16} className="mr-1" />
                Clear
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" 
                        ? "bg-meant-600 text-white" 
                        : "bg-meant-100 text-meant-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-meant-100 text-meant-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="resize-none"
                rows={2}
              />
              <Button 
                onClick={handleSendMessage} 
                className="ml-2 bg-meant-600 hover:bg-meant-700 text-white"
                disabled={isTyping || !input.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIMentalHealthAssistant;
