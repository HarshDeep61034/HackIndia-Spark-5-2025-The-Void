import { useState, useRef, useEffect } from 'react';
import StudentLayout from '@/components/layouts/StudentLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [];

// Flowise chatbot configuration - Using the specific chatflow ID
const CHATFLOW_ID = "5aeff95e-9800-4f0b-adc1-247a04f1eb2e";

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string, content: string }>>([]);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendFlowiseRequest = async (userQuery: string) => {
    try {
      // Using the exact format from the provided example
      const queryData = {
        question: userQuery,
        history: chatHistory.length > 0 ? chatHistory : undefined
      };

      const response = await fetch(
        "https://cloud.flowiseai.com/api/v1/prediction/5aeff95e-9800-4f0b-adc1-247a04f1eb2e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(queryData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      
      // Update chat history with the new exchange
      setChatHistory([
        ...chatHistory, 
        { role: 'user', content: userQuery },
        { role: 'assistant', content: result.text || '' }
      ]);

      return result.text || "I couldn't generate a response. Please try again.";
    } catch (error: any) {
      console.error('Error calling Flowise API:', error);
      return `Sorry, I encountered an error: ${error.message}. Please try again later.`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const responseContent = await sendFlowiseRequest(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StudentLayout title="Chat with Athena">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div 
          className="flex-1 p-4 overflow-y-auto bg-muted/30" 
          ref={chatContainerRef}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center h-96 text-center"
                >
                  <div className="mb-6 opacity-20 select-none">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 5,
                        ease: "easeInOut"
                      }}
                    >
                      <img 
                        src="/chitkara-logo.png" 
                        alt="Chitkara University" 
                        className="w-32 h-32 rounded-lg mx-auto"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          
                          // Create and append text alternative
                          const parent = target.parentElement;
                          if (parent) {
                            const div = document.createElement('div');
                            div.className = 'text-6xl font-bold';
                            div.textContent = 'CU';
                            parent.appendChild(div);
                          }
                        }}
                      />
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-xl font-medium mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome to Your AI Study Assistant
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ delay: 0.3 }}
                  >
                    Ask any question about your studies and get instant help with your assignments, exam preparation, or learning concepts.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn("flex", {
                    "justify-end": message.sender === "user",
                    "justify-start": message.sender === "assistant",
                  })}
                >
                  {message.sender === "assistant" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/avatars/bot.png" />
                        <AvatarFallback><MessageSquare className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={cn("rounded-lg p-3 max-w-[80%] prose prose-sm dark:prose-invert shadow-sm", {
                      "bg-primary text-primary-foreground": message.sender === "user",
                      "bg-muted": message.sender === "assistant",
                    })}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </motion.div>

                  {message.sender === "user" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/avatars/bot.png" />
                    <AvatarFallback><MessageSquare className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <Card className="p-3 bg-muted shadow-sm">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-accent" 
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-accent" 
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.15 }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-accent" 
                        animate={{ y: ["0%", "-50%", "0%"] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
                      />
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        <motion.div 
          className="p-6 border-t bg-background"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-3xl mx-auto">
            <div 
              className={cn(
                "flex items-center space-x-2 rounded-full border bg-background p-1.5 pr-3 shadow-sm transition-all",
                isFocused ? "shadow-md border-primary/50 ring-1 ring-primary/20" : ""
              )}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary ml-1">
                <Sparkles className="h-4 w-4" />
              </div>
              <Input
                placeholder="Ask me anything about your studies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isTyping || !input.trim()}
                className={cn(
                  "rounded-full transition-all",
                  input.trim() ? "bg-primary hover:bg-primary/90" : "bg-primary/70"
                )}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </StudentLayout>
  );
};

export default Chat;