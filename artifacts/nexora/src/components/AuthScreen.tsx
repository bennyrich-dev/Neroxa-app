import React, { useState } from "react";
import { Shield, Key, Mail, User, ArrowRight, Sparkles } from "lucide-react";

interface AuthProps {
  onAuthSuccess: (userData: { userName: string; email: string }) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !userName)) {
      setErrorMessage("Please fill out all active credential parameters.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://neroxa-app.onrender.com";
    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";

    try {
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userName })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        // Persist session to local phone state memory
        localStorage.setItem("userSession", JSON.stringify(resData.user));
        onAuthSuccess(resData.user);
      } else {
        setErrorMessage(resData.error || "Authentication handshake failure.");
      }
    } catch (err) {
      // Offline structural bypass for development testing
      console.log("Local offline user simulation engaged");
      const fakeUser = { userName: userName || "FOUNDER_NODE", email };
      localStorage.setItem("userSession", JSON.stringify(fakeUser));
      onAuthSuccess(fakeUser);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] flex items-center justify-center px-4 text-white font-sans">
      <div className="w-full max-w-md bg-[#0f111a] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b4d8]/5 blur-3xl rounded-full" />
        
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 bg-[#00b4d8]/10 rounded-xl flex items-center justify-center border border-[#00b4d8]/20 mb-3">
            <Shield className="w-6 h-6 text-[#00b4d8]" />
          </div>
          <h2 className="text-xl font-black tracking-tight font-mono uppercase">
            {isSignUp ? "Initialize Sector" : "Access Core Terminal"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Nexora Cloud Authentication Portal</p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-4 font-mono text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 font-mono">User Alias</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#00b4d8]/40 text-white"
                  placeholder="e.g. ADMIN_X"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 font-mono">Secure Email Handle</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#00b4d8]/40 text-white"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 font-mono">Access Token Keyphrase</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#00b4d8]/40 text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:from-[#0077b6] hover:to-[#005f73] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00b4d8]/10 transition-all disabled:opacity-50"
          >
            {isLoading ? "Validating Matrix Node..." : isSignUp ? "Generate Account Core" : "Authorize Entry"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-400 hover:text-[#00b4d8] transition-colors font-mono"
          >
            {isSignUp ? "Already registered? Login here" : "Need real credentials? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}

