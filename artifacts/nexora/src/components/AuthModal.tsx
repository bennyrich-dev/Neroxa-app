import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, AtSign, Film } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Single identifier captures email or alphanumeric username seamlessly
  const [authIdentifier, setAuthIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
    const baseUrl = import.meta.env.VITE_API_URL || 'https://neroxa-app.onrender.com';

    // Build adaptive payload based on big-tech standard authentication specifications
    const payload = isSignUp 
      ? { email: email.trim(), username: username.trim().toLowerCase(), name: fullName.trim(), password }
      : { identifier: authIdentifier.trim(), password };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const textData = await response.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch {
        throw new Error("System node routing mismatch. Verify VITE_API_URL handles JSON payloads.");
      }

      if (!response.ok) {
        throw new Error(data.message || 'Authentication sequence faulted.');
      }

      localStorage.setItem('neroxa_token', data.token);
      localStorage.setItem('neroxa_user', JSON.stringify(data.user || payload));
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition cursor-pointer bg-transparent border-none">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl mb-2 border border-cyan-500/20">
            <Film size={22} />
          </div>
          <h2 className="text-xl font-bold text-white">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Unified Matrix Authentication Gateway</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp ? (
            <>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-zinc-500"><User size={18} /></span>
                <input
                  type="text"
                  placeholder="Full Name (e.g. Yahya Richy)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition placeholder-zinc-600"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-zinc-500"><AtSign size={18} /></span>
                <input
                  type="text"
                  placeholder="Unique Username (Any characters/case)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition placeholder-zinc-600"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-zinc-500"><Mail size={18} /></span>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition placeholder-zinc-600"
                />
              </div>
            </>
          ) : (
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-zinc-500"><User size={18} /></span>
              <input
                type="text"
                placeholder="Username or Email Address"
                value={authIdentifier}
                onChange={(e) => setAuthIdentifier(e.target.value)}
                required
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition placeholder-zinc-600"
              />
            </div>
          )}

          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500"><Lock size={18} /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Secure Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-cyan-500 text-white text-sm rounded-xl pl-11 pr-12 py-3 outline-none transition placeholder-zinc-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer bg-transparent border-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-xl transition disabled:opacity-40 cursor-pointer"
          >
            {loading ? 'Executing Encryption...' : isSignUp ? 'Generate System Account' : 'Verify Mainframe Access'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-zinc-500">
          {isSignUp ? "Registered node user? " : "New terminal entity? "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-cyan-400 font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isSignUp ? 'Sign In Here' : 'Create System Credentials'}
          </button>
        </div>
      </div>
    </div>
  );
};
