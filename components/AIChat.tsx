import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getAIRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useNavigate } from 'react-router-dom';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi! I'm the Replique Assistant. Tell me what you're looking for, and I'll find the best template for you!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { products } = useStore();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Call AI
    const response = await getAIRecommendation(userText, products);

    // Add AI Message
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: response.message,
      recommendedProductIds: response.recommendedProductIds,
      preferences: response.preferences
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-0 right-0 z-50 flex h-[600px] w-full max-w-[400px] flex-col rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 sm:bottom-6 sm:right-6 sm:h-[550px] sm:rounded-2xl border border-stone-200 ${
          isOpen ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-primary-800 p-4 text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Replique Assistant</h3>
              <p className="text-xs text-primary-200">Powered by Gemini AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-stone-50 p-4 scrollbar-hide">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'rounded-br-none bg-primary-600 text-white'
                      : 'rounded-bl-none bg-white text-stone-800 shadow-sm border border-stone-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Recommendations */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      <p className="text-xs font-semibold opacity-70">Suggested Items:</p>
                      {msg.recommendedProductIds.map(id => {
                        const product = products.find(p => p.id === id);
                        if (!product) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/product/${id}`, { 
                                state: { 
                                  preselectedColor: msg.preferences?.color,
                                  preselectedMaterial: msg.preferences?.material
                                } 
                              });
                            }}
                            className="flex items-center gap-2 rounded-lg bg-stone-100 p-2 text-left transition-colors hover:bg-stone-200"
                          >
                            <img src={product.imageUrl} alt="" className="h-8 w-8 rounded object-cover" />
                            <div className="overflow-hidden">
                              <p className="truncate text-xs font-bold text-stone-900">{product.name}</p>
                              <p className="text-xs text-primary-700">₦{product.basePrice.toLocaleString()}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-none bg-white px-4 py-3 text-stone-500 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="border-t border-stone-200 bg-white p-3">
          <div className="flex items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-4 py-2 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Suggest a wooden desk..."
              className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="text-primary-600 hover:text-primary-800 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;