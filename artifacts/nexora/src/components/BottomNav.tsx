import React from "react";
import { 
  Home, 
  Trophy, 
  MessageSquare, 
  Compass, 
  User, 
  ShieldAlert 
} from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin?: boolean;
}

export default function BottomNav({ activeTab, setActiveTab, isAdmin = false }: BottomNavProps) {
  
  // Normalizing tabs to lowercase for perfect matching with App.tsx router keys
  const normalizedActive = activeTab ? activeTab.toLowerCase() : "movies";

  const navItems = [
    { id: "movies", label: "HOME", icon: Home },
    { id: "sports", label: "SPORTS", icon: Trophy },
    { id: "ai", label: "AI GUIDE", icon: Compass },
    { id: "community", label: "COMMUNITY", icon: MessageSquare },
    { id: "profile", label: "PROFILE", icon: User },
  ];

  // Dynamically include admin options if privileges allow
  if (isAdmin) {
    navItems.push({ id: "admin", label: "ADMIN", icon: ShieldAlert });
  }

  return (
    <nav className="bg-[#0f111a]/95 border-t border-white/5 backdrop-blur-xl px-2 py-1.5 safe-bottom shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isSelected = normalizedActive === item.id || (item.id === "movies" && normalizedActive === "home");

          return (
            <button
              key={item.id}
              onClick={() => {
                // CRITICAL FIX: Explicitly forcing the parent App router state switch on click
                setActiveTab(item.id);
              }}
              className="flex flex-col items-center justify-center min-w-[64px] py-1 transition-all duration-200 relative group"
              type="button"
            >
              {/* Dynamic Active Indicator Bar top offset */}
              {isSelected && (
                <div className="absolute top-0 w-8 h-[2px] bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-full animate-pulse" />
              )}

              <IconComponent 
                className={`w-4.5 h-4.5 mb-0.5 transition-transform duration-200 group-active:scale-90 ${
                  isSelected 
                    ? "text-[#00b4d8] drop-shadow-[0_0_8px_rgba(0,180,216,0.4)]" 
                    : "text-gray-500 group-hover:text-gray-300"
                }`} 
              />
              
              <span 
                className={`text-[8px] font-bold tracking-wider font-mono uppercase transition-colors ${
                  isSelected ? "text-white" : "text-gray-500 group-hover:text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
                  }
