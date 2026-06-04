import React from "react";
import { useLocation } from "wouter";
import { Home, Trophy, MessageSquare, Users, User } from "lucide-react";

interface BottomNavProps {
  hasNotifications?: boolean;
}

export default function BottomNav({ hasNotifications = false }: BottomNavProps) {
  const [location, setLocation] = useLocation();

  // Updated navigation layout to include the Community Board tab
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/sports", label: "Sports", icon: Trophy },
    { path: "/ai-chat", label: "AI Guide", icon: MessageSquare },
    { path: "/community", label: "Community", icon: Users }, // 👈 New Community Icon added!
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0b1424]/95 backdrop-blur-md border-t border-gray-800/80 px-1 py-2.5 z-50 max-w-md mx-auto rounded-t-2xl shadow-2xl shadow-black/50">
      <div className="flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => setLocation(item.path)}
              className="flex flex-col items-center justify-center flex-1 relative py-1 group transition-transform active:scale-95"
            >
              {/* Icon Container with active glow ring styling */}
              <div
                className={`p-2 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-[#00b4d8]/10 text-[#00b4d8] scale-110"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.25]" />
                
                {/* Real-Time Interaction Alert Dot */}
                {item.path === "/profile" && hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#0b1424] animate-pulse" />
                )}
              </div>

              {/* Text label element */}
              <span
                className={`text-[9px] font-bold tracking-wide mt-0.5 transition-colors duration-300 uppercase ${
                  isActive ? "text-[#00b4d8]" : "text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {item.label}
              </span>

              {/* Slider underline active accent indicator */}
              {isActive && (
                <div className="absolute bottom-[-6px] w-5 h-0.5 bg-[#00b4d8] rounded-full shadow-lg shadow-[#00b4d8]/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
