import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import CommunityHub from "./components/CommunityHub";
import ProfileSettings from "./components/ProfileSettings";
import AuthScreen from "./components/AuthScreen";
import { Home as HomeIcon, MessageSquare, User, Radio } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<{ userName: string; email: string } | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check if user is already logged into this physical device
  useEffect(() => {
    const activeSession = localStorage.getItem("userSession");
    if (activeSession) {
      setUser(JSON.parse(activeSession));
    }
    setIsCheckingSession(false);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userSession");
    setUser(null);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Force login view overlay if no active database profile is signed in
  if (!user) {
    return <AuthScreen onAuthSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-[#06070d] text-white">
      {/* Dynamic Screen View Controller Switches */}
      <main>
        {activeTab === "home" && <Home />}
        {activeTab === "chat" && <CommunityHub />}
        {activeTab === "profile" && <ProfileSettings />}
      </main>

      {/* FIXED BASE FOOTER DOCK NAV BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#070913]/90 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around py-3 px-2">
          <button 
            onClick={() => setActiveTab("home")} 
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "home" ? "text-[#00b4d8]" : "text-gray-500"}`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono">HOME</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "chat" ? "text-[#00b4d8]" : "text-gray-500"}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono">CHAT</span>
          </button>

          <button 
            onClick={() => setActiveTab("profile")} 
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "profile" ? "text-[#00b4d8]" : "text-gray-500"}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono">PROFILE</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
