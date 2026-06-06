import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Nexora Intel Core. I am your distributed network guide. How can I assist your operations today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<"online" | "offline" | "checking">("checking");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Cleanly read the environment variable with a safe local fallback
  const SERVER_URL = process.env.NEXT_PUBLIC_AI_SERVER_URL || "http://localhost:5000";

  // Silent health check to see if your local backend or live server is active
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/health`, { method: "GET" });
        if (res.ok) setServerStatus("online");
        else setServerStatus("offline");
      } catch (err) {
        // Silently catch the error so it does NOT generate annoying red popups on screen
        setServerStatus("offline");
      }
    };
    checkServer();
  }, [SERVER_URL]);

  // Handle auto-scroll to keep the latest chat bubbles visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // If server is offline, immediately fall back to simulation mode without throwing errors
    if (serverStatus === "offline") {
      setTimeout(() => {
        const simulatedResponse: Message = {
          id: Math.random().toString(),
          role: "assistant",
          content: `[Simulation Protocol Core]: Received message "${userMessage.content}". Connect your backend server at port 5000 or update NEXT_PUBLIC_AI_SERVER_URL to enable live neural network processing.`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, simulatedResponse]);
        setIsLoading(false);
      }, 800);
      return;
    }

    // Attempt actual live server connection safely
    try {
      const response = await fetch(`${SERVER_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content })
      });

      if (!response.ok) throw new Error("Server responded with error status");
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.reply || "No response token returned from backend processor module.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Graceful local failover handling instead of throwing a massive application toast notification error
      const failoverMessage: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: "System message: Connection timeout to primary AI gateway. Reverting to sandbox query mode. How else can I map your application matrix routes?",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, failoverMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] pt-6 pb-32 px-4 flex flex-col justify-between max-w-4xl mx-auto text-white">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00b4d8]/10 rounded-xl border border-[#00b4d8]/20 shadow-lg shadow-[#00b4d8]/5">
            <Bot className="w-5 h-5 text-[#00b4d8]" />
          </div>
          <div>
            <h2 className="text-md font-bold tracking-tight">Nexora Intelligence Guide</h2>
            <p className="text-[11px] text-gray-500 font-mono">CORE REVELATION FRAMEWORK v1.0</p>
          </div>
        </div>

        {/* STATUS HUBS */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${serverStatus === "online" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gray-400">
            {serverStatus === "online" ? "Live Gateway Connected" : "Local Sandbox Link"}
          </span>
        </div>
      </div>

      {/* CHAT INTERACTION VIEWPORT */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-1 min-h-[50vh] max-h-[60vh] custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`p-2.5 h-9 w-9 rounded-xl flex items-center justify-center border text-xs shrink-0 ${
              msg.role === "user" ? "bg-white/5 border-white/10 text-white" : "bg-[#00b4d8]/10 border-[#00b4d8]/20 text-[#00b4d8]"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-gradient-to-br from-[#00b4d8] to-[#0077b6] text-white shadow-md shadow-[#00b4d8]/10 rounded-tr-none" 
                : "bg-[#0f111a] border border-white/5 text-gray-200 rounded-tl-none"
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="block text-[9px] text-white/40 mt-2 font-mono text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="p-2.5 h-9 w-9 rounded-xl flex items-center justify-center border bg-[#00b4d8]/10 border-[#00b4d8]/20 text-[#00b4d8]">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#0f111a] border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00b4d8] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-[#00b4d8] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-[#00b4d8] rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM FIELD INTERACTION CONTROL PANEL */}
      <form onSubmit={handleSendMessage} className="relative mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={serverStatus === "offline" ? "Type to use local sandbox chat guide..." : "Query the live Nexora cloud matrix..."}
          className="w-full bg-[#0f111a] border border-white/5 focus:border-[#00b4d8]/40 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder-gray-500 outline-none transition-all focus:shadow-lg focus:shadow-[#00b4d8]/5"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#00b4d8] hover:bg-[#0077b6] disabled:bg-white/5 disabled:text-gray-600 text-white font-bold rounded-xl transition-all shadow-md shadow-[#00b4d8]/10"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
                                        }
                      
