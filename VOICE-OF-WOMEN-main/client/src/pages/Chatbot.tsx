import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCK8Triaf6JNcSw1r8vIiR9g5dcBhCIyhk';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are VOW — Voice of Women, a compassionate and knowledgeable AI assistant dedicated to empowering girls and women. You have expertise in:
- India's women's safety laws and rights
- Government schemes: MUDRA, Beti Bachao Beti Padhao, PM Matru Vandana Yojana, Sukanya Samriddhi Yojana
- Scholarships and education opportunities for women
- Career guidance, mentorship, and skill development
- Microfinance and entrepreneurship for women
- Healthcare: PCOS, PCOD, menstrual health, maternal care, nutrition
- Emotional wellness and mental health support
- Self-defense tips and safety awareness

If someone is in danger, immediately provide: Women Helpline: 181, Police: 100, Domestic Violence: 1091, Cyber Crime: 1930. For mental health crisis: iCall: 9152987821.

Always respond with warmth, clarity, encouragement, and empowerment. Keep responses concise and helpful.`;

type Message = { role: 'user' | 'model'; text: string };

const INITIAL_MESSAGE: Message = {
  role: 'model',
  text: "Namaste! 🌸 I am VOW AI, your compassionate guide. I can help you with safety, health, education, career, and government schemes. What would you like to know today?"
};

const suggestedPrompts = [
  "What is PCOS and how to manage it?",
  "Government schemes for women entrepreneurs",
  "How to stay safe online?",
  "Tips for career growth for women",
  "What is Beti Bachao Beti Padhao?",
  "Help! I feel unsafe right now"
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for the API (exclude initial greeting)
      const history = updatedMessages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: history
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I could not generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [
        ...prev,
        { role: 'model', text: `⚠️ ${errMsg.includes('quota') ? 'Rate limit reached. Please wait a moment.' : errMsg}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto p-4 md:p-6 pb-0">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-accent rounded-t-2xl shadow-lg p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/30">
          <Bot size={26} />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-lg text-white font-heading flex items-center gap-2">
            VOW AI Assistant <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          </h2>
          <p className="text-xs text-white/80">Powered by Google Gemini • Always private & secure</p>
        </div>
        <Sparkles className="text-white/60" size={20} />
      </motion.div>

      {/* Messages */}
      <div className="flex-1 bg-white/60 dark:bg-dark-card/60 backdrop-blur overflow-y-auto p-4 space-y-4 border-x border-gray-100 dark:border-gray-800">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white flex-shrink-0 shadow">
                <Bot size={16} />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
              ? 'bg-gradient-to-br from-primary to-accent text-white rounded-br-sm'
              : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
              }`}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-500" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white flex-shrink-0 shadow">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-1.5">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="bg-gray-50/80 dark:bg-gray-900/50 border-x border-gray-100 dark:border-gray-800 px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt)}
            disabled={isLoading}
            className="whitespace-nowrap bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-b-2xl shadow-sm border border-t-0 border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <button
            type="button"
            title="Voice input (coming soon)"
            className="text-gray-400 hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/10"
          >
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "VOW AI is thinking..." : "Ask me anything about health, safety, education, or career..."}
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 transition-all"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-primary to-accent text-white w-10 h-10 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            <Send size={17} className="-ml-0.5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
