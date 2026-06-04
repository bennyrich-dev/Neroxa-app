import React, { useState } from "react";

export default function SettingsPage() {
  // Account Form State
  const [profile, setProfile] = useState({
    name: "Benny Richy",
    email: "benny@neroxa.stream",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  });

  // Playback & System Preferences State
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("Changes saved successfully!");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-24 px-4 sm:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
          <p className="text-gray-400 text-sm">Manage your Nexora streaming configurations, video resolution targets, and profile metadata.</p>
        </div>

        {/* Dynamic Success Prompt banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl animate-fade-in">
            ✨ {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT INTERACTIVE COLUMN: QUICK ACTIONS */}
          <div className="space-y-6">
            <div className="bg-[#121216] border border-[#222226] rounded-2xl p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <img 
                  src={profile.avatarUrl} 
                  alt="User Avatar" 
                  className="w-full h-full rounded-full object-cover border-2 border-purple-500/50"
                />
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <span className="text-xs text-purple-300 font-medium">Edit Pic</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold truncate">{profile.name}</h3>
              <p className="text-xs text-gray-500 truncate mb-4">{profile.email}</p>
              <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                Premium Tier
              </div>
            </div>

            <div className="bg-[#121216] border border-[#222226] rounded-2xl p-4 text-xs text-gray-400 space-y-2">
              <div className="flex justify-between py-1 border-b border-gray-800/40">
                <span>Streaming Engine:</span>
                <span className="text-white font-medium">Benny Richy Core</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800/40">
                <span>Adaptive Quality:</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
              <div className="flex justify-between py-1">
                <span>App Build Version:</span>
                <span className="text-gray-500">v2.4.1-alpha</span>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN FORMS DECK */}
          <div className="md:col-span-2 space-y-8">
            
            {/* COMPONENT MODULE 1: PROFILE MANAGEMENT */}
            <form onSubmit={handleProfileSave} className="bg-[#121216] border border-[#222226] rounded-2xl p-6 space-y-5">
              <h2 className="text-xl font-semibold border-b border-gray-800/60 pb-3">User Profile Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wide font-medium">Display Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wide font-medium">Email Workspace</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/10 active:scale-[0.98] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* COMPONENT MODULE 2: RE-MEDIATED VIDEO PLAYER RESOLUTIONS */}
            <div className="bg-[#121216] border border-[#222226] rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold border-b border-gray-800/60 pb-3">Playback Preferences</h2>
                <p className="text-xs text-gray-400 mt-1">Configure your default streaming experience when executing the stream resolvers.</p>
              </div>

              {/* Resolution selection targeting your custom api types */}
              <div className="space-y-3">
                <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block">Target Video Quality Pixel</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "360p", label: "360p (SD)" },
                    { value: "480p", label: "480p (HQ)" },
                    { value: "720p", label: "720p (HD)" },
                    { value: "1080p", label: "1080p (FHD)" }
                  ].map((quality) => (
                    <button
                      key={quality.value}
                      type="button"
                      onClick={() => setVideoQuality(quality.value)}
                      className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                        videoQuality === quality.value
                          ? "bg-purple-600/10 border-purple-500 text-purple-400 shadow-md shadow-purple-500/5"
                          : "bg-[#1c1c24] border-[#2e2e38] text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Toggle Option Toggles */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 bg-[#1c1c24]/50 border border-[#222226] rounded-xl">
                  <div>
                    <h4 className="text-sm font-medium">Autoplay Next Episode</h4>
                    <p className="text-xs text-gray-500">Automatically spin up the next file index in sequence once current stream ends.</p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={autoplayNext}
                    onChange={(e) => setAutoplayNext(e.target.checked)}
                    className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1c1c24]/50 border border-[#222226] rounded-xl">
                  <div>
                    <h4 className="text-sm font-medium">Data Saver Stream Compression</h4>
                    <p className="text-xs text-gray-500">Optimize data distribution layers to reduce cellular bandwidth load.</p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={dataSaver}
                    onChange={(e) => setDataSaver(e.target.checked)}
                    className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
