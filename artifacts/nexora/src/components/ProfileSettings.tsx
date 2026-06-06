import React, { useState, useRef } from "react";
import { 
  User, 
  Shield, 
  Sliders, 
  Bell, 
  Activity, 
  CheckCircle,
  Database,
  Key,
  Camera
} from "lucide-react";

export default function ProfileSettings() {
  // Interactive UI State Controllers
  const [userName, setUserName] = useState("FOUNDER / ADMIN");
  const [emailNotification, setEmailNotification] = useState(true);
  const [streamQuality, setStreamQuality] = useState("Ultra HD 4K");
  const [isSaved, setIsSaved] = useState(false);
  
  // Local Profile Image Asset State (Defaults to null to show icon)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Reference hook to tap into the hidden device file uploader link
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Triggers your native phone or computer photo browser viewport
  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  // Reads the picked image from your device and maps it into frontend memory
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      // Generate a temporary local browser URL link pointing directly to the file data
      const temporaryImageUrl = URL.createObjectURL(selectedFile);
      setProfileImage(temporaryImageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] pt-6 pb-32 px-4 max-w-2xl mx-auto text-white">
      
      {/* PROFILE HEADER MATRIX CARD */}
      <div className="bg-[#0f111a] border border-white/5 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b4d8]/5 blur-3xl rounded-full" />
        
        <div className="flex items-center gap-4 relative z-10">
          
          {/* INTERACTIVE AVATAR UPLOADER CONTROLLER CONTAINER */}
          <div 
            onClick={triggerFileBrowser}
            className="h-16 w-16 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center border border-[#00b4d8]/20 shadow-xl shadow-[#00b4d8]/10 relative group cursor-pointer overflow-hidden shrink-0"
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-white group-hover:opacity-40 transition-opacity" />
            )}
            
            {/* Immersive overlay prompt on hover or active mobile tap */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* HIDDEN NATIVE DEVICE FILE INPUT LINK */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-black tracking-tight">{userName}</h2>
              <span className="bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Root Admin
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">NODE ID: NX-2026-99X7</p>
          </div>
        </div>
      </div>

      {/* CORE INTERACTIVE SETTINGS FORM */}
      <form onSubmit={handleSaveChanges} className="space-y-5">
        
        {/* SECTION 1: ACCOUNT CONTROL */}
        <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase tracking-wider pb-2 border-b border-white/5">
            <Shield className="w-3.5 h-3.5 text-[#00b4d8]" /> Account Parameters
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5 font-mono">
              Display Alias Label
            </label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#00b4d8]/40 transition-all"
            />
          </div>
        </div>

        {/* SECTION 2: STREAM CONFIGURATIONS */}
        <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase tracking-wider pb-2 border-b border-white/5">
            <Sliders className="w-3.5 h-3.5 text-[#00b4d8]" /> Streaming Presets
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5 font-mono">
              Target Resolution Delivery
            </label>
            <select 
              value={streamQuality} 
              onChange={(e) => setStreamQuality(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#00b4d8]/40 transition-all appearance-none"
            >
              <option value="Ultra HD 4K">Ultra HD 4K (High Bandwidth)</option>
              <option value="Full HD 1080p">Full HD 1080p (Standard)</option>
              <option value="Data Saver 720p">Data Saver 720p (Mobile Optimization)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-gray-400" /> Network Notifications
              </span>
              <span className="text-[10px] text-gray-500">Receive stream optimization alerts</span>
            </div>
            <input 
              type="checkbox" 
              checked={emailNotification}
              onChange={(e) => setEmailNotification(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-black/40 text-[#00b4d8] focus:ring-0 focus:ring-offset-0"
            />
          </div>
        </div>

        {/* SECTION 3: BACKEND INFRASTRUCTURE DIAGNOSTICS */}
        <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase tracking-wider pb-2 border-b border-white/5">
            <Database className="w-3.5 h-3.5 text-amber-500" /> System Integration Core
          </div>

          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
              <span className="text-gray-500 flex items-center gap-1"><Key className="w-3 h-3" /> TMDB LINK STATUS</span>
              <span className="text-[#00b4d8] font-bold">PUBLIC FALLBACK PROXY</span>
            </div>
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
              <span className="text-gray-500 flex items-center gap-1"><Activity className="w-3 h-3" /> NODE BACKEND</span>
              <span className="text-amber-500 font-bold animate-pulse">DISCONNECTED (SANDBOX)</span>
            </div>
          </div>
        </div>

        {/* ACTION SUBMIT CONTAINER BUTTON */}
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold py-3.5 rounded-xl text-xs transition-all hover:opacity-90 shadow-lg shadow-[#00b4d8]/10 flex items-center justify-center gap-2"
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4" /> Parameters Committed Successfully
            </>
          ) : (
            "Save Profile Configuration"
          )}
        </button>

      </form>
    </div>
  );
            }
