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
  const [userName, setUserName] = useState("FOUNDER / ADMIN");
  const [emailNotification, setEmailNotification] = useState(true);
  const [streamQuality, setStreamQuality] = useState("Ultra HD 4K");
  const [isSaved, setIsSaved] = useState(false);
  
  // Holds the image link selected from the device gallery
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      // Convert device image file into a viewable link
      const temporaryImageUrl = URL.createObjectURL(selectedFile);
      setProfileImage(temporaryImageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] pt-6 pb-32 px-4 max-w-2xl mx-auto text-white">
      
      {/* PROFILE HEADER CARD */}
      <div className="bg-[#0f111a] border border-white/5 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b4d8]/5 blur-3xl rounded-full" />
        
        <div className="flex items-center gap-4 relative z-10">
          
          {/* TAPPABLE PROFILE AVATAR */}
          <div 
            onClick={triggerFileBrowser}
            className="h-16 w-16 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center border border-[#00b4d8]/20 shadow-xl shadow-[#00b4d8]/10 relative group cursor-pointer overflow-hidden shrink-0"
          >
            {profileImage ? (
              <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-white group-hover:opacity-40 transition-opacity" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* HIDDEN PHOTO GALLERY INPUT */}
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
              <span className="bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/20 text-[9px] font-bold px-2 py-0.5 rounded-full font-mono">
                Root Admin
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">NODE ID: NX-2026-99X7</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-5">
        <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase pb-2 border-b border-white/5">
            <Shield className="w-3.5 h-3.5 text-[#00b4d8]" /> Account Parameters
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 font-mono">
              Display Alias Label
            </label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00b4d8]/40"
            />
          </div>
        </div>

        <div className="bg-[#0f111a] border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-mono uppercase pb-2 border-b border-white/5">
            <Database className="w-3.5 h-3.5 text-amber-500" /> Environment Diagnostics
          </div>
          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
              <span>TMDB CORE STATE</span>
              <span className="text-[#00b4d8] font-bold">FRONTEND MODE</span>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2">
          {isSaved ? <CheckCircle className="w-4 h-4" /> : "Save Profile Settings"}
        </button>
      </form>
    </div>
  );
}
