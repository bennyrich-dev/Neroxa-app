import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Code, Terminal, Zap, Trash2, Copy, Check } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isCode?: boolean;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Greetings! I am Nexa AI, the core system intelligence engine of the Neroxa ecosystem. Beyond calculating streaming analytics, movie matches, and sports metrics, my capabilities are completely unrestricted. I can write advanced code, debug scripts, analyze logical systems, and automate technical tasks. What are we building or exploring today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCode: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Utility logic to scan incoming streams for code blocks to toggle rich syntax UI wrappers
  const checkIsCode = (text: string) => {
    const codeKeywords = ["function", "const", "import", "<html>", "css", "class", "def ", "return", "void", "export", "let ", "var "];
    return codeKeywords.some(keyword => text.includes(keyword)) || text.trim().startsWith("//") || text.trim().startsWith("/*");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: timeString,
      isCode: checkIsCode(userText)
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Pulling your live Gemini API key securely from the environment variables
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!geminiKey || geminiKey.includes("PASTE_YOUR")) {
        throw new Error("API Key setup missing inside your .env file!");
      }

      // 🌐 Live direct pipeline request to the Google Gemini Flash Model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `System Instruction: You are Nexa AI, the absolute luxury core system intelligence engine of the Neroxa application ecosystem. You excel at programming, software development, advanced mathematical logic, sport data metrics, and film analytics. When a user asks a coding question, reply with production-ready, clean code blocks with sharp execution instructions. Always remember your name is Nexa AI, and you are the brain of Neroxa.\n\nUser Prompt: ${userText}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error("Network communication array encountered a terminal response glitch.");
      }

      const data = await response.json();
      
      // Extracting the text reply cleanly out of the Google response payload package
      const rawAiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚡ Core engine process completed with clean fallback loops.";

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: rawAiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCode: checkIsCode(rawAiText)
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      // Secure local safety array prevents the interface from breaking on mobile if your network cuts out
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `❌ Nexa AI Core Grid Connection Alert: ${error.message || "Unknown array interference detected."} Ensure your .env configuration flags match your live keys perfectly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCode: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "System cache flushed. Nexa AI registers clear operational parameters across all processing arrays. Ready for instructions.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative flex flex-col h-full">
      
      {/* 🚀 HIGH-AESTHETIC INTELLIGENCE STATUS HEADER */}
      <div className="bg-[#0b1424]/90 backdrop-blur-md border-b border-gray-800/80 p-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-[#00b4d8] flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-black uppercase tracking-wider text-white">Nexa AI</h1>
              <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 font-black tracking-widest px-1.5 py-0.5 rounded text-[7px] uppercase">Omni-Model</span>
            </div>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current animate-bounce" /> Live API Cluster Online
            </p>
          </div>
        </div>

        <button 
          onClick={clearChatHistory}
          className="p-2 bg-gray-900/60 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 border border-gray-800 rounded-xl transition-all active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 📥 DYNAMIC CHAT LOG VIEWPORT */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#040509] pb-44">
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div key={msg.id} className={`flex ${isAi ? "justify-start" : "justify-end"} animate-fade-in`}>
              <div className={`flex gap-2.5 max-w-[88%] ${isAi ? "flex-row" : "flex-row-reverse"}`}>
                
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border text-xs font-bold ${
                  isAi ? "bg-purple-600 border-purple-500 text-white" : "bg-[#00b4d8] border-[#0096b4] text-white"
                }`}>
                  {isAi ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1 w-full">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">
                    {isAi ? "Nexa AI Node" : "Authorized Operator"} • {msg.timestamp}
                  </span>

                  {msg.isCode ? (
                    /* 💻 INTEGRATED CODE INTERFACE COMPONENT */
                    <div className="bg-gray-950 border border-purple-500/30 rounded-2xl overflow-hidden font-mono text-[11px] text-purple-300 w-full shadow-2xl relative">
                      <div className="bg-gray-900/80 px-3 py-2 border-b border-gray-800/60 flex items-center justify-between text-gray-400 text-[9px] uppercase tracking-wider font-sans">
                        <span className="flex items-center gap-1 font-black"><Code className="w-3 h-3 text-[#00b4d8]" /> Code Workspace</span>
                        <button 
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="flex items-center gap-1 hover:text-white transition-colors bg-gray-950 px-2 py-0.5 rounded border border-gray-800"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" /> Copy Code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 overflow-x-auto whitespace-pre-wrap selection:bg-purple-500/30 font-mono leading-relaxed text-left">
                        <code>{msg.text}</code>
                      </pre>
                    </div>
                  ) : (
                    /* Standard Beautiful Speech Frame */
                    <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed font-sans ${
                      isAi ? "bg-[#111c30] text-gray-200 rounded-tl-none border border-gray-800/40" : "bg-[#00b4d8] text-white rounded-tr-none"
                    }`}>
                      <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start items-center gap-2.5 text-gray-500 text-[10px] uppercase font-black tracking-widest pl-2">
            <Terminal className="w-3.5 h-3.5 animate-spin text-purple-500" /> Nexa AI is processing neural blocks...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 📥 FOOTER CONTROL DOCK BAR */}
      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto z-20 bg-gradient-to-t from-[#06070d] via-[#06070d] to-transparent p-3 border-t border-gray-900/40">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Ask scripts, system logic, code blocks, or sports..."
            className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-4 pr-12 py-3 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-gray-500 disabled:opacity-50 font-sans"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputMessage.trim()}
            className="absolute right-2 p-1.5 bg-gradient-to-r from-purple-600 to-[#00b4d8] text-white rounded-lg transition-transform active:scale-95 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
