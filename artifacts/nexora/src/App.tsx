import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import CommunityBoard from "./components/CommunityBoard";
import ProfileSettings from "./components/ProfileSettings";
import AuthScreen from "./components/AuthScreen";
import { Home as HomeIcon, MessageSquare, User } from "lucide-react";

interface UserProfile {
  userName: string;
  email: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

  // Check if a user session exists in local storage
  useEffect(() => {
    try {
      const activeSession = localStorage.getItem("userSession");
      if (activeSession) {
        setUser(JSON.parse(activeSession));
      }
    } catch (error) {
      console.error("Session verification failure:", error);
    } finally {
      setIsCheckingSession(false);
    }
  }, []);

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Force login view overlay if no user profile is active
  if (!user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#06070d] text-white">
      {/* Active Screen Context Router */}
      <main className="w-full h-full">
        {activeTab === "home" && <Home />}
        {activeTab === "chat" && <CommunityBoard />}
        {activeTab === "profile" && <ProfileSettings />}
      </main>

      {/* PERSISTENT BOTTOM NAVIGATION BAR DOCK */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#070913]/90 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-md mx-auto flex items-center justify-around py-3 px-2">
          <button 
            onClick={() => setActiveTab("home")} 
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "home" ? "text-[#00b4d8]" : "text-gray-500"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono tracking-wider">HOME</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "chat" ? "text-[#00b4d8]" : "text-gray-500"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono tracking-wider">BOARD</span>
          </button>

          <button 
            onClick={() => setActiveTab("profile")} 
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "profile" ? "text-[#00b4d8]" : "text-gray-500"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold font-mono tracking-wider">PROFILE</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
