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

// Define strict type parameters for our single-page application router view states
type ActiveActiveScreen = "auth" | "home" | "sports" | "movie-details" | "community" | "ai-guide" | "profile" | "admin" | "movies";

export default function App() {
  // Navigation State Control - Setting default screen state clearly
  const [currentScreen, setCurrentScreen] = useState<ActiveActiveScreen>("movies");
  
  // Global Mock Session State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Administrative Privilege Gate state 
  const [userRole, setUserRole] = useState<"User" | "FOUNDER / ADMIN">("FOUNDER / ADMIN");

  // Authentication Guard Router Routing Check
  if (!isAuthenticated) {
    return <Auth />;
  }

  // 🛡️ Catch-All Router Function to safely render views without 404 drops
  const renderCurrentScreen = () => {
    switch (currentScreen) {
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
        return <AiChat />;
      case "profile":
        return <ProfileSettings />;
      case "admin":
        return <AdminConsole />;
      default:
        // Absolute safety fallback fallback to protect against empty states
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
              setCurrentScreen(tab as ActiveActiveScreen);
            }} 
            isAdmin={userRole === "FOUNDER / ADMIN"}
          />
        </div>
      )}

    </div>
  );
}
