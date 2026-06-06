import React, { useState, useRef, useEffect } from "react";
import { User, Shield, Sliders, Bell, CheckCircle, Camera } from "lucide-react";

export default function ProfileSettings() {
  const [userName, setUserName] = useState("FOUNDER / ADMIN");
  const [emailNotification, setEmailNotification] = useState(true);
  const [streamQuality, setStreamQuality] = useState("Ultra HD 4K");
  const [isSaved, setIsSaved] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically fetch your saved settings from the backend when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUserName(data.userName);
          setStreamQuality(data.streamQuality);
          setEmailNotification(data.emailNotification);
          if (data.profileImage) setProfileImage(data.profileImage);
        }
      })
      .catch(() => console.log("Running in local offline preview mode"));
  }, []);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);

    // Send data to the backend server so it survives page refrshes!
    try {
      await fetch("http://localhost:5000/api/profile/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, streamQuality, emailNotification, profileImage })
      });
    } catch (err) {
      console.log("Saved locally in frontend memory");
    }

    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert gallery file into an un-wipeable base64 image string asset
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] pt-6 pb-32 px-4 max-w-2xl mx-auto text-white">
      <div className="bg-[#0f111a] border border-white/5 rounded-2xl p-6 mb-6 relative">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="h-16 w-16 bg-gradient-to-tr from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center border border-[#00b4d8]/20 relative group cursor-pointer overflow-hidden"
          >
            {profileImage ? (
              <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          <div>
            <h2 className="text-xl font-black tracking-tight">{userName}</h2>
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
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs" />
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2">
          {isSaved ? <CheckCircle className="w-4 h-4" /> : "Save Profile Settings"}
        </button>
      </form>
    </div>
  );
}
