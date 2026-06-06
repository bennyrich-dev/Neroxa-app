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

// 📂 Fixed: Located in the pages directory with a lowercase 'a'
import Auth from "./pages/auth"; 

// Define strict type parameters for our single-page application router view states
type ActiveActiveScreen = "auth" | "home" | "sports" | "movie-details" | "community" | "ai-guide" | "profile" | "admin" | "movies";

export default function App() {
  // Navigation State Control - Updated to align with your bottom nav's starting position
  const [currentScreen, setCurrentScreen] = useState<ActiveActiveScreen>("home");
  
  // Global Mock Session State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Administrative Privilege Gate state 
  const [userRole, setUserRole] = useState<"User" | "FOUNDER / ADMIN">("FOUNDER / ADMIN");

  // Authentication Guard Router Routing Check
  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-[#06070d] text-white selection:bg-[#00b4d8]/30 selection:text-white antialiased font-sans">
      
      {/* 📱 ACTIVE VIEW PORT INTERACTION ROUTER */}
      <main className="w-full transition-all duration-300 ease-in-out">
        {/* Support both 'home' and 'movies' targets to guarantee your main feed displays */}
        {(currentScreen === "home" || currentScreen === "movies") && <Home />}
        {currentScreen === "sports" && <SportsHub />}
        {currentScreen === "movie-details" && <MovieDetails />}
        {currentScreen === "community" && <CommunityBoard />}
        {currentScreen === "ai-guide" && <AiChat />}
        {currentScreen === "profile" && <ProfileSettings />}
        {currentScreen === "admin" && <AdminConsole />}
      </main>

      {/* 🧭 PREMIUM HUD NAVIGATION CONTROL PANEL */}
      {currentScreen !== "movie-details" && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNav 
            activeTab={currentScreen} 
            setActiveTab={(tab: string) => {
              // Map incoming navigation identifiers to valid routing targets
              const target = tab === "movies" ? "movies" : (tab as ActiveActiveScreen);
              setCurrentScreen(target);
            }} 
            isAdmin={userRole === "FOUNDER / ADMIN"}
          />
        </div>
      )}

    </div>
  );
}
