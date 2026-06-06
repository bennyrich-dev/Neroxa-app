import React, { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";

// 📂 Sub-pages and views
import Home from "./pages/home";
import SportsHub from "./components/SportsHub";
import MovieDetails from "./components/MovieDetails";
import CommunityBoard from "./components/CommunityBoard";
import AiChat from "./components/AIChat"; 
import ProfileSettings from "./components/ProfileSettings";
import AdminConsole from "./components/AdminConsole";
import Auth from "./pages/auth"; 

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  
  // Navigation State Control
  const [currentScreen, setCurrentScreen] = useState<string>("movies");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<"User" | "FOUNDER / ADMIN">("FOUNDER / ADMIN");

  // Run the premium logo splash screen animation on application boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Plays for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#06070d] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Futuristic Background Glow Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00b4d8]/10 blur-[100px] rounded-full" />
        
        {/* Animated Brand Logo Container */}
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          <div className="h-16 w-16 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(0,180,216,0.3)] border border-[#00b4d8]/30 animate-pulse mb-4">
            <span className="text-white text-3xl font-black tracking-tighter font-sans">N</span>
          </div>
          <h1 className="text-2xl font-black tracking-[0.3em] text-white font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            NEXORA
          </h1>
          <p className="text-[9px] text-[#00b4d8] tracking-[0.5em] uppercase font-bold mt-2 font-mono">
            Intelligence Matrix
          </p>
        </div>

        {/* Premium Loading Bar */}
        <div className="absolute bottom-16 w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-full w-full animate-[loading_2.5s_ease-in-out_infinite]" />
        </div>

        {/* Global Styles for Keyframe Animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen.toLowerCase()) {
      case "home":
      case "movies":
        return <Home />;
      case "sports":
        return <SportsHub />;
      case "movie-details":
        return <MovieDetails />;
      case "community":
        return <CommunityBoard />;
      case "ai-guide":
      case "ai":
        return <AiChat />;
      case "profile":
      case "settings":
        return <ProfileSettings />;
      case "admin":
        return <AdminConsole />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white selection:bg-[#00b4d8]/30 selection:text-white antialiased font-sans">
      <main className="w-full transition-all duration-300 ease-in-out">
        {renderCurrentScreen()}
      </main>

      {currentScreen !== "movie-details" && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNav 
            activeTab={currentScreen} 
            setActiveTab={(tab: string) => setCurrentScreen(tab)} 
            isAdmin={userRole === "FOUNDER / ADMIN"}
          />
        </div>
      )}
    </div>
  );
}
