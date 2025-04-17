// Create a new file: src/services/apiService.ts

/**
 * Service to handle API requests with CORS handling
 */
export const apiService = {
    /**
     * Send a request to the Flowise API with proper CORS handling
     * @param query The user's question
     * @param history Optional chat history
     * @returns The API response text
     */
    async sendFlowiseRequest(query: string, history?: Array<{ role: string, content: string }>) {
      try {
        const CHATFLOW_ID = "5aeff95e-9800-4f0b-adc1-247a04f1eb2e";
        const API_URL = `https://cloud.flowiseai.com/api/v1/prediction/${CHATFLOW_ID}`;
        
        // Check if we're in development mode
        // const isDevelopment = process.env.NODE_ENV === 'development' || 
                            //  window.location.hostname === 'localhost';
        const isDevelopment = true;
        
        // Use a proxy URL in development, direct URL in production
        const requestUrl = isDevelopment 
          ? `/api/flowise-proxy` // This will be handled by your proxy setup
          : API_URL;
        
        const queryData = {
          question: query,
          history: history && history.length > 0 ? history : undefined
        };
  
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(queryData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        }
  
        const result = await response.json();
        return result.text || "I couldn't generate a response. Please try again.";
      } catch (error: any) {
        console.error('Error calling Flowise API:', error);
        return `Sorry, I encountered an error: ${error.message}. Please try again later.`;
      }
    },
  
    /**
     * Generate flashcards on a specific topic
     * @param topic The topic to generate flashcards about
     * @returns An array of flashcard objects with questions and answers
     */
    async generateFlashcards(topic: string) {
      try {
        const response = await this.sendFlowiseRequest(
          `Generate 10 flashcards about "${topic}". Format your response as a JSON array with each object having "question" and "answer" fields. Keep the answers concise.`
        );
        
        // Parse the JSON from the AI response
        try {
          // Find JSON in the response text
          const jsonMatch = response.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          } else {
            // If JSON not found, create a fallback with error message
            return [
              {
                question: "Error Generating Flashcards",
                answer: "Could not generate flashcards. Try a different topic or check your connection."
              }
            ];
          }
        } catch (parseError) {
          console.error("Failed to parse flashcards JSON:", parseError);
          throw new Error("Could not parse the AI response as JSON");
        }
      } catch (error) {
        console.error('Error generating flashcards:', error);
        throw error;
      }
    }
  };