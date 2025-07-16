import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const InteractiveChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salut ! Je suis votre assistant IA spécialisé dans les festivals de musique 🎵 Comment puis-je vous aider à trouver votre prochaine aventure musicale ?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Recommande-moi un festival EDM',
        'Quel budget pour Tomorrowland ?',
        'Festivals en été 2025',
        'Destinations pour débutants'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('edm') || lowerMessage.includes('électronique')) {
      response = '🎧 Parfait ! Pour l\'EDM, je recommande Tomorrowland (Belgique) ou Ultra Music Festival (Miami). Quel est votre budget approximatif ?';
      suggestions = ['Budget 1000-2000€', 'Budget 2000€+', 'Dates disponibles', 'Hébergement VIP'];
    } else if (lowerMessage.includes('budget')) {
      response = '💰 Les budgets varient selon la destination :\n• Festivals européens: 800-2500€\n• Festivals US: 1500-4000€\n• Festivals exotiques: 2000-5000€\n\nQuel type de festival vous intéresse ?';
      suggestions = ['Festivals Europe', 'Festivals USA', 'Festivals exotiques', 'Comparer les prix'];
    } else if (lowerMessage.includes('été') || lowerMessage.includes('2025')) {
      response = '☀️ Été 2025, excellente période ! Voici mes tops :\n• Tomorrowland (Juillet)\n• Sziget Festival (Août)\n• Creamfields (Août)\n• Burning Man (Août)\n\nLequel vous tente ?';
      suggestions = ['Plus d\'infos Tomorrowland', 'Découvrir Sziget', 'Burning Man expérience', 'Tous les festivals été'];
    } else if (lowerMessage.includes('débutant') || lowerMessage.includes('premier')) {
      response = '🌟 Pour une première expérience, je recommande :\n• Des festivals européens (plus accessibles)\n• Durée 2-3 jours max\n• Bonne infrastructure\n• Ambiance bienveillante\n\nQuel style musical préférez-vous ?';
      suggestions = ['EDM pour débutants', 'Rock festivals', 'Festivals multi-genres', 'Conseils pratiques'];
    } else {
      response = '🤔 Intéressant ! Pour mieux vous conseiller, pouvez-vous me dire :\n• Votre style musical préféré\n• Votre budget approximatif\n• Vos dates de disponibilité\n• Votre niveau d\'expérience festival';
      suggestions = ['Mes goûts musicaux', 'Mon budget', 'Mes disponibilités', 'Je suis débutant'];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl w-96 h-[500px] mb-4 border border-white/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Assistant IA Festival</h3>
                <p className="text-xs text-white/80">En ligne • Répond en quelques secondes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                    : 'bg-white/10 text-white'
                } rounded-2xl px-4 py-2`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-1 text-orange-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-orange-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Décrivez votre festival de rêve..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-400 text-white placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg relative"
      >
        <MessageCircle className="h-8 w-8 text-white" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
        )}
      </button>
    </div>
  );
};

export default InteractiveChatbot;