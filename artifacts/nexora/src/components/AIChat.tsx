import React, { useState, useEffect, useRef } from "react";
import { Send, Cpu, Bot, User } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: "ai-welcome", sender: "ai", text: "Nexora Core operational. I am your direct companion interface. Ask me anything about upcoming live streams, premium room controls, or theater configurations.", timestamp: "ONLINE" }
    ]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Query logged. Checking system metrics and video index archives.";
      
      if (query.includes("movie") || query.includes("stream") || query.includes("show")) {
        reply = "TMDB cluster synchronization verified. The home interface dashboard is pulling official cinematic catalogs directly from live servers.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        reply = "Greetings. Connection matrix is secure. How can I assist with your streaming workflow requirements today?";
      } else if (query.includes("admin") || query.includes("owner")) {
        reply = "Founder access permissions detected. Group configuration headers and community voting widgets are ready in the Lounge corridor panel.";
      }

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white flex flex-col h-[85vh] p-4 max-w-md mx-auto font-sans">
      <div className="bg-[#0f111a] border border-white/5 rounded-2xl p-4 flex items-center gap-3 mb-4 flex-shrink-0">
        <div className="h-10 w-10 bg-[#00b4d8]/10 rounded-xl flex items-center justify-center border border-[#00b4d8]/20">
          <Cpu className="w-5 h-5 text-[#00b4d8]" />
        </div>
        <div>
          <h2 className="text-xs font-black uppercase font-mono tracking-wider">NexaAI Assistant</h2>
          <p className="text-[9px] text-emerald-400 font-mono">Operations Engine Secure</p>
        </div>
      </div>

      <div className="flex-1 bg-[#0f111a]/40 border border-white/5 rounded-2xl p-4 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 text-xs ${
              msg.sender === "user" ? "bg-[#00b4d8]/10 border-[#00b4d8]/20 text-[#00b4d8]" : "bg-purple-500/10 border-purple-500/20 text-purple-400"
            }`}>
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className={`rounded-2xl p-3 max-w-[80%] text-xs leading-relaxed ${
              msg.sender === "user" ? "bg-[#00b4d8] text-white rounded-tr-none" : "bg-[#111c30] text-gray-200 rounded-tl-none border border-white/5"
            }`}>
              <p className="font-sans font-medium">{msg.text}</p>
              <span className="text-[8px] text-white/30 block text-right mt-1 font-bold">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center text-gray-500 text-[10px] font-mono pl-1">
            <span className="animate-pulse">Processing mainframe nodes...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="relative flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask NexaAI intelligence framework..."
          className="w-full bg-[#111c30] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-xs text-white outline-none focus:border-[#00b4d8]/40 font-sans"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00b4d8] p-2 rounded-lg text-white">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
                  }
      
