import React, { useState, useEffect } from "react";
import { User, Shield, Sliders, Bell, LogOut, Camera } from "lucide-react";

export default function ProfileSettings() {
  const [userName, setUserName] = useState("ADMIN");
  const [email, setEmail] = useState("admin@nexora.com");
  const [streamQuality, setStreamQuality] = useState("Ultra HD 4K");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const activeSession = localStorage.getItem("userSession");
    if (activeSession) {
      const parsed = JSON.parse(activeSession);
      setUserName(parsed.userName || "FOUNDER USER");
      setEmail(parsed.email || "no-email@nexora.com");
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userSession");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#06070d] pt-6 pb-32 px-4 max-w-2xl mx-auto text-white font-sans">
      <div className="bg-[#0f111a] border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center border border-[#00b4d8]/20 relative overflow-hidden">
            {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User className="w-8 h-8 text-white" />}
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">{userName}</h2>
            <p className="text-xs text-gray-500 font-mono">{email}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-4 mb-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase pb-2 border-b border-white/5">
          <Sliders className="w-3.5 h-3.5 text-[#00b4d8]" /> Playback Engine State
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Target Video Resolution</span>
          <span className="text-[#00b4d8] font-bold font-mono">{streamQuality}</span>
        </div>
      </div>

      <button onClick={handleLogOut} className="w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all">
        <LogOut className="w-4 h-4" /> Disconnect User Session
      </button>
    </div>
  );
}
