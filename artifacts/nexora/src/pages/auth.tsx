import React, { useState } from "react";
import { Mail, Lock, User, ShieldCheck, ArrowRight, RefreshCw, KeyRound, ArrowLeft } from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signin");
  
  // Input fields form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // UI interaction loading states
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    // Mocking authorization pipelines (Supabase integration points next)
    setTimeout(() => {
      setLoading(false);
      if (mode === "forgot") {
        setNotification({
          text: "A secure verification link has been broadcasted to your email address. Please inspect your spam folder if it doesn't appear shortly.",
          type: "success"
        });
        setEmail("");
      } else if (mode === "signup") {
        setNotification({
          text: "Registration complete! Welcome to Neroxa. Please log in.",
          type: "success"
        });
        setMode("signin");
      } else {
        setNotification({
          text: "Login authorization passed. Syncing profile...",
          type: "success"
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white flex flex-col justify-center px-4 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/* Background Decorative Accent Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00b4d8]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        
        {/* Branding Logo Node */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#00b4d8] to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-[#00b4d8]/10">
            <KeyRound className="w-5 h-5 text-white stroke-[2.25]" />
          </div>
          <h1 className="text-xl font-black tracking-widest uppercase mt-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            NEROXA NETWORK
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {mode === "signin" && "Secure Global Streaming Portal"}
            {mode === "signup" && "Establish Premium Account Tier"}
            {mode === "forgot" && "Automated Account Recovery Access"}
          </p>
        </div>

        {/* Dynamic Action Notification Alert Banners */}
        {notification && (
          <div className={`p-3.5 rounded-xl text-xs font-medium leading-relaxed border ${
            notification.type === "success" 
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
              : "bg-rose-500/5 border-rose-500/20 text-rose-400"
          }`}>
            {notification.text}
          </div>
        )}

        {/* Core Submission Form Component */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Sign-Up Exclusive Field: Full Name input */}
          {mode === "signup" && (
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name Name"
                className="w-full bg-[#0b1424] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#00b4d8] transition-colors placeholder-gray-500"
              />
            </div>
          )}

          {/* Core Target Input: Registered Account Email Address */}
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-[#0b1424] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#00b4d8] transition-colors placeholder-gray-500"
            />
          </div>

          {/* Password Security Input (Hidden on Forgot Mode) */}
          {mode !== "forgot" && (
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Account Access Password"
                className="w-full bg-[#0b1424] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#00b4d8] transition-colors placeholder-gray-500"
              />
            </div>
          )}

          {/* Forgot Password Inline Redirect Link Label */}
          {mode === "signin" && (
            <div className="flex justify-end px-0.5">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#00b4d8] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Master Operational Process Button Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-[#00b4d8]/10 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : mode === "forgot" ? (
              <>Broadcast Reset Link <ArrowRight className="w-3.5 h-3.5" /></>
            ) : mode === "signup" ? (
              "Initialize Account Configuration"
            ) : (
              <>Authorize Secure Sign In <ArrowRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        </form>

        {/* Bottom Interactive Workflow Toggles */}
        <div className="text-center pt-2">
          {mode === "forgot" ? (
            <button
              onClick={() => setMode("signin")}
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Account Login
            </button>
          ) : mode === "signin" ? (
            <p className="text-[11px] text-gray-500 font-medium">
              Don't possess an account key?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#00b4d8] font-bold uppercase tracking-wide ml-0.5 hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p className="text-[11px] text-gray-500 font-medium">
              Already possess an established key?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-[#00b4d8] font-bold uppercase tracking-wide ml-0.5 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
