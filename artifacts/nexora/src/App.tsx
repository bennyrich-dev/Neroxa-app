import React, { useState } from "react";
import BottomNav from "./components/BottomNav";

// 📂 Only home.tsx lives in the pages folder
import Home from "./pages/home";

// 📂 All these files live inside the components folder based on your file tree
import SportsHub from "./components/SportsHub";
import MovieDetails from "./components/MovieDetails";
import CommunityBoard from "./components/CommunityBoard";
import AiChat from "./components/AIChat"; // Fixed lowercase 'c' to capital 'C' to match your AIChat.tsx file exactly
import ProfileSettings from "./components/ProfileSettings";
import AdminConsole from "./components/AdminConsole";
import Auth from "./components/Auth";

// Define strict type parameters for our single-page application router view states
type ActiveActiveScreen = "auth" | "home" | "sports" | "movie-details" | "community" | "ai-guide" | "profile" | "admin";

export default function App() {
  // Navigation State Control
  const [currentScreen, setCurrentScreen] = useState<ActiveActiveScreen>("home");
  
  // Global Mock Session State
  // Toggle this true/false to preview the login suite vs the actual running application dashboard
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
        {currentScreen === "home" && <Home />}
        {currentScreen === "sports" && <SportsHub />}
        {currentScreen === "movie-details" && <MovieDetails />}
        {currentScreen === "community" && <CommunityBoard />}
        {currentScreen === "ai-guide" && <AiChat />}
        {currentScreen === "profile" && <ProfileSettings />}
        {currentScreen === "admin" && <AdminConsole />}
      </main>

      {/* 🧭 PREMIUM HUD NAVIGATION CONTROL PANEL */}
      {/* Hidden during active movie detail streams to ensure distraction-free immersive full-screen cinematic playback */}
      {currentScreen !== "movie-details" && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNav 
            activeTab={currentScreen} 
            setActiveTab={(tab: string) => setCurrentScreen(tab as ActiveActiveScreen)} 
            isAdmin={userRole === "FOUNDER / ADMIN"}
          />
        </div>
      )}

    </div>
  );
}
