import React, { useState } from "react";
import { User, Mail, Shield, Video, Camera, LogOut, Check, Sliders, Palette, Image } from "lucide-react";

export default function ProfileSettings() {
  // Account core information states
  const [name, setName] = useState("Benny Richy");
  const [email, setEmail] = useState("benny@neroxa.app");
  
  // Custom self-tag flair (e.g., [WWE Fan], [Movie Buff])
  const [userFlair, setUserFlair] = useState("WWE Fan");
  
  // Chat bubble theme color picker state (Defaults to Neroxa Cyan)
  const [chatColor, setChatColor] = useState("#00b4d8");
  
  // Chat window wallpaper style preference
  const [chatWallpaper, setChatWallpaper] = useState("Dark Arena");

  const [videoQuality, setVideoQuality] = useState("Ultra HD");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80");
  const [isSaved, setIsSaved] = useState(false);

  // Profile icon presets
  const avatarPresets = [
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80"
  ];

  // 🎨 EXPANDED 15 PREMIUM CHAT BUBBLE COLOR PRESETS
  const bubbleColorPresets = [
    // ⚡ NEROXA NEON COLLECTION
    { name: "Neroxa Cyan", hex: "#00b4d8" },
    { name: "Electric Violet", hex: "#8b5cf6" },
    { name: "Neon Lime", hex: "#10b981" },
    { name: "Laser Magenta", hex: "#d946ef" },
    { name: "Cyberpunk Orange", hex: "#f97316" },

    // 🏟️ SPORTS HUB TRADITIONAL
    { name: "Championship Gold", hex: "#eab308" },
    { name: "Stadium Crimson", hex: "#ef4444" },
    { name: "Ultra Marine Blue", hex: "#3b82f6" },
    { name: "Pitch Side Emerald", hex: "#059669" },
    { name: "Asphalt Charcoal", hex: "#475569" },

    // 🌌 DEEP SPACE LUXE
    { name: "Phantom Rose", hex: "#fda4af" },
    { name: "Cosmic Lavender", hex: "#c084fc" },
    { name: "Supernova Amber", hex: "#fbbf24" },
    { name: "Glacier Mint", hex: "#2dd4bf" },
    { name: "Nebula Sage", hex: "#94a3b8" }
  ];

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    // When integrated, this triggers an UPDATE request to your Supabase public.profiles row
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/* Header Banner */}
      <div className="bg-[#0b1424]/80 backdrop-blur-md border-b border-gray-800/80 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#00b4d8]/10 rounded-xl text-[#00b4d8]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider">Account Settings</h1>
            <p className="text-[10px] text-gray-400 font-medium">Personalize Your Identity & Layout Themes</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveChanges} className="p-4 space-y-6">
        
        {/* 📸 AVATAR SELECTION COMPONENT */}
        <div className="flex flex-col items-center gap-3 bg-[#0b1424] p-4 rounded-2xl border border-gray-800/80">
          <div className="relative group">
            <img src={avatar} alt="Profile Avatar" className="w-20 h-20 rounded-full object-cover ring-4 ring-[#00b4d8]/30" />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Choose Profile Icon</span>
            <div className="flex gap-2.5 pt-1">
              {avatarPresets.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(imgUrl)}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                    avatar === imgUrl ? "border-[#00b4d8] scale-110" : "border-transparent opacity-60"
                  }`}
                >
                  <img src={imgUrl} alt="Preset Options" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 📝 CREDENTIALS & SERVICE TAG FLUID BLOCKS */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 px-1">Account Credentials</span>
          
          <div className="space-y-2">
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* 🏷️ Custom Community Tag Field Input */}
            <div className="relative flex items-center">
              <Shield className="absolute left-3.5 w-4 h-4 text-[#00b4d8]" />
              <input
                type="text"
                value={userFlair}
                onChange={(e) => setUserFlair(e.target.value)}
                placeholder="Your Lounge Tag (e.g., Horror Buff, WWE Fan)"
                maxLength={18}
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>
            <p className="text-[9px] text-gray-500 font-medium px-1">This badge displays next to your username inside all community groups.</p>
          </div>
        </div>

        {/* 🎨 WHATSAPP CHAT THEME CUSTOMIZATION CONTROLS */}
        <div className="space-y-4 bg-[#0b1424] p-4 rounded-2xl border border-gray-800/80">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#00b4d8]" /> Premium Custom Chat Styling
            </span>
            <p className="text-[9px] text-gray-500 font-medium">Select a color. Other lounge members will see your message bubbles in this style.</p>
          </div>

          {/* Expanded Bubble Palette Container with wrap styling */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Message Bubble Color</label>
            <div className="flex flex-wrap gap-2.5 pt-1 max-h-36 overflow-y-auto pr-1">
              {bubbleColorPresets.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setChatColor(color.hex)}
                  className="w-7 h-7 rounded-full relative transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-white/5 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {chatColor === color.hex && (
                    <span className="text-black font-black text-xs mix-blend-difference">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Background Wallpaper Selector */}
          <div className="space-y-1.5 pt-2 border-t border-gray-800/60">
            <label className="text-[10px] font-bold text-gray-400 block flex items-center gap-1 uppercase tracking-wider">
              <Image className="w-3 h-3 text-gray-400" /> Chat Room Wallpaper
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {["Dark Arena", "Deep Nebula", "Solid Midnight"].map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setChatWallpaper(bg)}
                  className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition-all ${
                    chatWallpaper === bg
                      ? "bg-[#111c30] text-[#00b4d8] border-[#00b4d8]"
                      : "bg-[#06070d] text-gray-500 border-gray-800 hover:text-gray-300"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🎬 VIDEO QUALITY PREFERENCES */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 px-1 flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-[#00b4d8]" /> Playback Preferences
          </span>
          
          <div className="bg-[#111c30]/50 border border-gray-800 rounded-xl p-1.5 grid grid-cols-3 gap-1">
            {["Data Saver", "HD", "Ultra HD"].map((quality) => (
              <button
                key={quality}
                type="button"
                onClick={() => setVideoQuality(quality)}
                className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  videoQuality === quality
                    ? "bg-[#00b4d8] text-white shadow-md shadow-[#00b4d8]/10"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        {/* Action Save Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-[#00b4d8]/20"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-white" /> Settings applied successfully
              </>
            ) : (
              "Save Settings"
            )}
          </button>

          <button
            type="button"
            className="w-full bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Terminate Session (Sign Out)
          </button>
        </div>

      </form>
    </div>
  );
}
