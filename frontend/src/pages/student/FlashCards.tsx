import { useState, useRef, useEffect } from 'react';
import StudentLayout from '@/components/layouts/StudentLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Flashcards = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to generate flashcards using AI
  const generateFlashcards = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Using the same Flowise API as in chat.tsx
      const response = await fetch(
        "https://cloud.flowiseai.com/api/v1/prediction/5aeff95e-9800-4f0b-adc1-247a04f1eb2e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": import.meta.env.VITE_FLOWISE_API_KEY // Add the API key
          },
          body: JSON.stringify({
            question: `Generate 5 flashcards about "${topic}". Format your response as a JSON array with each object having "question" and "answer" fields. Keep the answers concise.`
          })
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
  
      const result = await response.json();
      
      // Parse the JSON from the AI response
      try {
        // Find JSON in the response text
        console.log(result);
        const jsonMatch = result.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedCards = JSON.parse(jsonMatch[0]);
          setFlashcards(parsedCards);
          setCurrentIndex(0);
          setFlipped(false);
          setIsLoaded(true);
        } else {
          throw new Error("Could not find valid JSON in the response");
        }
      } catch (parseError) {
        console.error("Failed to parse flashcards JSON:", parseError);
        alert("There was an issue generating flashcards. Please try a different topic.");
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert("There was an error connecting to the AI service. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isGenerating) {
      e.preventDefault();
      generateFlashcards();
    }
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <StudentLayout title="Flashcards">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4 bg-muted/10">
        {!isLoaded ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-xl space-y-6"
          >
            <div className="text-center space-y-3">
              <motion.h2 
                className="text-3xl font-bold tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Generate Flashcards
              </motion.h2>
              <motion.p 
                className="text-muted-foreground"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Enter a topic and our AI will create custom flashcards to help you study.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex space-x-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                placeholder="Enter a topic (e.g., 'Sorting Algorithm', 'Human Anatomy')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isGenerating}
              />
              <Button 
                onClick={generateFlashcards} 
                disabled={isGenerating || !topic.trim()}
                className="bg-primary"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-8">
            <div className="flex items-center justify-between w-full max-w-md px-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsLoaded(false);
                  setFlashcards([]);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <h3 className="font-medium">{topic}</h3>
                <p className="text-sm text-muted-foreground">
                  Card {currentIndex + 1} of {flashcards.length}
                </p>
              </div>
              
              <div className="w-8 h-8" /> {/* Empty div for spacing */}
            </div>

            <div className="w-full flex justify-center px-4">
              <div className="relative w-full max-w-md aspect-[3/2] perspective-1000">
                <motion.div
                  className={cn(
                    "w-full h-full cursor-pointer",
                    "preserve-3d transition-all duration-500"
                  )}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  onClick={toggleFlip}
                >
                  {/* Front of card (Question) */}
                  <div className="absolute w-full h-full backface-hidden">
                    <Card className="w-full h-full flex items-center justify-center p-8 border-2 shadow-lg bg-card">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">QUESTION</div>
                        <div className="text-xl font-medium">{flashcards[currentIndex]?.question}</div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Back of card (Answer) */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <Card className="w-full h-full flex items-center justify-center p-8 border-2 border-primary shadow-lg bg-primary/5">
                      <div className="text-center">
                        <div className="text-sm text-primary mb-2">ANSWER</div>
                        <div className="text-xl font-medium">{flashcards[currentIndex]?.answer}</div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevCard}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                onClick={toggleFlip}
              >
                {flipped ? "Show Question" : "Show Answer"}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextCard}
                disabled={currentIndex === flashcards.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Flashcards;