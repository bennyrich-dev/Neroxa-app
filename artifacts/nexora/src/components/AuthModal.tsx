import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Film } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
    const baseUrl = import.meta.env.VITE_API_URL || 'https://neroxa-app.onrender.com';

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, ...(isSignUp && { name }) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store tokens or session states smoothly
      localStorage.setItem('neroxa_token', data.token);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Network connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Glow Backdrop Rings mimicking the shared TikTok structure */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] -top-10 -left-10 pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -bottom-10 -right-10 pointer-events-none"></div>

      {/* Main Glassmorphism Form Container */}
      <div className="relative w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden">
        
        {/* Animated Neon Top Running Line border strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        {/* Close Button Trigger */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Top Header Identity Brand Header Block */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl mb-3 border border-cyan-500/20 shadow-inner">
            <Film size={24} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {isSignUp ? 'Join Neroxa Matrix streaming network' : 'Access your premium cinema ecosystem'}
          </p>
        </div>

        {/* Dynamic Error Status Alert Field container */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Application Core Auth Interactive Submission Form Block */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-zinc-500">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-zinc-950/40 border border-zinc-800 focus:border-cyan-500 text-zinc-200 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition shadow-inner placeholder-zinc-600"
              />
            </div>
          )}

          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-950/40 border border-zinc-800 focus:border-cyan-500 text-zinc-200 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition shadow-inner placeholder-zinc-600"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-950/40 border border-zinc-800 focus:border-cyan-500 text-zinc-200 text-sm rounded-xl pl-11 pr-12 py-3.5 outline-none transition shadow-inner placeholder-zinc-600"
            />
            {/* Interactive Eye Toggle Component Row for visibility state monitoring */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <a href="#forgot" className="text-xs text-cyan-500 hover:underline">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm rounded-xl transition shadow-lg shadow-cyan-500/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Lower Authentication toggle switcher row */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          {isSignUp ? "Already have an account? " : "New to Neroxa? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-cyan-500 font-medium hover:underline cursor-pointer"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
        
