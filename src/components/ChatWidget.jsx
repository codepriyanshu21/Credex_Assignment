import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?', id: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll and focus input when chat opens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (showChat) {
      inputRef.current?.focus();
    }
  }, [messages, showChat]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { sender: 'user', text: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      
      // Current working models in order of preference
      const MODEL_VARIANTS = [
        "gemini-1.5-flash",        // Best balance of speed/cost
        "gemini-1.5-pro",         // For complex queries
        "gemini-pro"              // Fallback
      ];

      let lastError = null;
      
      for (const modelName of MODEL_VARIANTS) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
              maxOutputTokens: 1000
            }
          });
          
          const result = await model.generateContent({
            contents: [{ 
              role: "user",
              parts: [{ text: input }]
            }]
          });
          
          const response = await result.response;
          const text = response.text();
          
          setMessages(prev => [...prev, { 
            sender: "bot", 
            text: text,
            id: Date.now() 
          }]);
          return; // Success - exit the loop
        } catch (error) {
          lastError = error;
          console.warn(`Model ${modelName} failed:`, error);
        }
      }
      
      throw lastError || new Error('All model attempts failed');

    } catch (error) {
      console.error("Gemini error:", error);
      
      let errorMessage = "Sorry, I'm having trouble responding.";
      
      if (error.message.includes('API key')) {
        errorMessage = "Configuration error. Please check your API key.";
      } 
      else if (error.message.includes('quota')) {
        errorMessage = "Rate limit exceeded. Please wait a minute or check your Google Cloud quota.";
      }
      else if (error.message.includes('404')) {
        errorMessage = "Service unavailable. Please try again later.";
      }

      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: errorMessage,
        id: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!showChat && (
        <button 
          className="fixed bottom-4 right-4 flex items-center space-x-2 cursor-pointer z-50 focus:outline-none"
          onClick={() => setShowChat(true)}
          aria-label="Open chat"
        >
          <img
            src="https://media.istockphoto.com/id/1445426863/vector/chat-bot-vector-logo-design-concept.jpg?s=612x612&w=0&k=20&c=XDdfzS4lNW9yxQ0BQGZq9KMLL4bJ8ywXlYdAhBSuoCA="
            alt="ChatBot"
            className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-blue-500 hover:border-blue-600 transition-all"
          />
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-blue-700 transition-colors">
            Need Help?
          </span>
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 shadow-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col z-50">
          <div className="p-4 border-b dark:border-gray-600 font-bold text-gray-800 dark:text-white flex justify-between items-center bg-blue-600 text-white">
            <span>Chat Support</span>
            <button
              className="text-xl font-bold hover:text-red-300 transition-colors focus:outline-none"
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
              title="Close"
            >
              ×
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto text-sm space-y-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span className={`inline-block px-3 py-1 rounded-lg max-w-xs break-words ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                }`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="inline-block px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700">
                  <span className="flex space-x-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t dark:border-gray-600">
            <input
              ref={inputRef}
              className="flex-1 p-2 text-sm border-none outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white disabled:opacity-70"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              aria-label="Type your message"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none"
              aria-label="Send message"
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending
                </span>
              ) : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;