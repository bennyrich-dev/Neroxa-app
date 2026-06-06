import React, { useState } from "react";
import BottomNav from "./components/BottomNav";

// 📂 Only home.tsx lives in the pages folder
import Home from "./pages/home";

// 📂 All these files live inside the components folder based on your file tree
import SportsHub from "./components/SportsHub";
import MovieDetails from "./components/MovieDetails";
import CommunityBoard from "./components/CommunityBoard";
import AiChat from "./components/AIChat"; 
import ProfileSettings from "./components/ProfileSettings";
import AdminConsole from "./components/AdminConsole";

// 📂 Located in the pages directory with a lowercase 'a'
import Auth from "./pages/auth"; 

export default function App() {
  // Navigation State Control - Tracks the active view screen
  const [currentScreen, setCurrentScreen] = useState<string>("movies");
  
  // Global Mock Session State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Administrative Privilege Gate state 
  const [userRole, setUserRole] = useState<"User" | "FOUNDER / ADMIN">("FOUNDER / ADMIN");

  // Authentication Guard Router Routing Check
  if (!isAuthenticated) {
    return <Auth />;
  }

  // 🛡️ Safe Router Function that translates Nav clicks to active components
  const renderCurrentScreen = () => {
    // Standardizing the input names to match your BottomNav component strings perfectly
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
        // Safe fall-back so the screen never goes pitch black
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white selection:bg-[#00b4d8]/30 selection:text-white antialiased font-sans">
      
      {/* 📱 ACTIVE VIEW PORT INTERACTION ROUTER */}
      <main className="w-full transition-all duration-300 ease-in-out">
        {renderCurrentScreen()}
      </main>

      {/* 🧭 PREMIUM HUD NAVIGATION CONTROL PANEL */}
      {currentScreen !== "movie-details" && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNav 
            activeTab={currentScreen} 
            setActiveTab={(tab: string) => {
              // Direct synchronization with whatever string your BottomNav triggers on click
              setCurrentScreen(tab);
            }} 
            isAdmin={userRole === "FOUNDER / ADMIN"}
          />
        </div>
      )}

    </div>
  );
}
