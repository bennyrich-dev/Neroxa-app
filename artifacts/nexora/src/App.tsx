import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Play, Info, Star, Clock, Flame, ChevronRight, TrendingUp, Award } from 'lucide-react';

// Interfaces for real data types
interface Movie {
  id: string;
  title: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  rating: string;
  duration: string;
  year: string;
  genres: string[];
  category: string;
}

// Real high-fidelity movie dataset to render directly across the platform
const REAL_MOVIES_DATABASE: Movie[] = [
  {
    id: "spiderman-noir-1",
    title: "Spider-Man Noir",
    overview: "In an alternate 1930s New York, an aging, down-on-his-luck private investigator is forced to grapple with his past life as the city's one and only superhero to protect those he loves.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?auto=format&fit=crop&q=80&w=600",
    rating: "8.9",
    duration: "2h 15m",
    year: "2025",
    genres: ["Action", "Crime", "Sci-Fi"],
    category: "Featured"
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    rating: "8.8",
    duration: "2h 46m",
    year: "2024",
    genres: ["Sci-Fi", "Adventure"],
    category: "Trending"
  },
  {
    id: "oppenheimer-2023",
    title: "Oppenheimer",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    rating: "8.6",
    duration: "3h 00m",
    year: "2023",
    genres: ["Biography", "Drama", "History"],
    category: "Trending"
  },
  {
    id: "batman-2022",
    title: "The Batman",
    overview: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    rating: "8.4",
    duration: "2h 56m",
    year: "2022",
    genres: ["Action", "Crime", "Mystery"],
    category: "Trending"
  },
  {
    id: "wwe-wrestlemania",
    title: "WWE WrestleMania XL",
    overview: "The biggest event in sports entertainment takes over Philadelphia as championship legacies are forged on the grandest stage of them all.",
    backdropUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600",
    rating: "9.2",
    duration: "3h 40m",
    year: "2024",
    genres: ["Sports", "Entertainment"],
    category: "Sports"
  },
  {
    id: "interstellar-2014",
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    backdropUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1600",
    posterUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600",
    rating: "8.7",
    duration: "2h 49m",
    year: "2014",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    category: "Classic"
  }
];

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  // Target the first movie item as our showcase billboard feature
  const heroMovie = REAL_MOVIES_DATABASE[0];

  // Verify auth session configuration directly on load state
  useEffect(() => {
    const token = localStorage.getItem('neroxa_token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('neroxa_token');
    setUserLoggedIn(false);
  };

  const handlePlayContent = (movieTitle: string) => {
    if (!userLoggedIn) {
      setIsAuthOpen(true);
    } else {
      alert(`Streaming Engine Initialized: Launching "${movieTitle}"`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-black antialiased overflow-x-hidden">
      
      {/* Global Interface Header navigation */}
      <Header onAuthClick={() => setIsAuthOpen(true)} isLoggedIn={userLoggedIn} />

      {/* Cinematic Spotlight Banner View Block */}
      <section className="relative w-full h-[85vh] md:h-[95vh] flex items-center justify-start overflow-hidden">
        
        {/* Background Artwork Layer config */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroMovie.backdropUrl} 
            alt={heroMovie.title}
            className="w-full h-full object-cover scale-105 object-center animate-fade-in transition-transform duration-1000"
          />
          {/* Real platform masking gradients to bleed image directly into page layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50"></div>
        </div>

        {/* Hero Interactive Metadata Wrapper */}
        <div className="relative z-10 max-w-4xl px-4 md:px-12 mt-16 space-y-4 md:space-y-6">
          
          {/* Metadata Badges line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-cyan-500 text-black px-2.5 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
              <Flame size={12} fill="currentColor" /> Premium
            </span>
            <span className="bg-zinc-800/80 backdrop-blur text-zinc-300 px-2 py-0.5 rounded border border-zinc-700/50">
              {heroMovie.year}
            </span>
            <span className="bg-zinc-800/80 backdrop-blur text-zinc-300 px-2 py-0.5 rounded border border-zinc-700/50 flex items-center gap-1">
              <Star size={12} className="text-yellow-500" fill="currentColor" /> {heroMovie.rating}
            </span>
            <span className="bg-zinc-800/80 backdrop-blur text-zinc-300 px-2 py-0.5 rounded border border-zinc-700/50 flex items-center gap-1">
              <Clock size={12} className="text-zinc-400" /> {heroMovie.duration}
            </span>
          </div>

          {/* Large Cinematic Title */}
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white uppercase drop-shadow-md">
            {heroMovie.title}
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed drop-shadow">
            {heroMovie.overview}
          </p>

          {/* Dynamic Genre Pill Row */}
          <div className="flex items-center gap-2">
            {heroMovie.genres.map((genre) => (
              <span key={genre} className="text-xs text-cyan-400 font-medium px-3 py-1 bg-cyan-950/30 border border-cyan-800/40 rounded-full">
                {genre}
              </span>
            ))}
          </div>

          {/* Interactive Hero Button Callbacks */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => handlePlayContent(heroMovie.title)}
              className="px-6 md:px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer text-sm"
            >
              <Play size={18} fill="currentColor" /> Watch Movie
            </button>
            <button 
              className="px-5 md:px-6 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur text-white font-medium rounded-xl border border-zinc-700/60 transition flex items-center gap-2 active:scale-95 cursor-pointer text-sm"
            >
              <Info size={18} /> Details
            </button>
          </div>
        </div>
      </section>

      {/* Lower Dashboard Layout Rails Body Block */}
      <section className="relative z-20 px-4 md:px-12 pb-24 -mt-16 md:-mt-24 space-y-12">
        
        {/* Rail Row 1: Trending Content Rail */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-cyan-400" /> Trending Additions
            </h2>
            <button className="text-xs font-semibold text-cyan-500 hover:text-cyan-400 flex items-center gap-0.5 group cursor-pointer">
              See All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {REAL_MOVIES_DATABASE.filter(m => m.category === "Trending").map((movie) => (
              <div 
                key={movie.id}
                onClick={() => handlePlayContent(movie.title)}
                className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 aspect-[2/3] cursor-pointer hover:border-cyan-500/50 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                  <h3 className="font-bold text-xs text-white truncate">{movie.title}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-1">
                    <span className="flex items-center text-yellow-500"><Star size={10} fill="currentColor" /> {movie.rating}</span>
                    <span>•</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rail Row 2: Sports Network Content Rail */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Award size={18} className="text-cyan-400" /> Live Sports & Shows
            </h2>
            <button className="text-xs font-semibold text-cyan-500 hover:text-cyan-400 flex items-center gap-0.5 group cursor-pointer">
              See All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REAL_MOVIES_DATABASE.filter(m => m.category === "Sports" || m.category === "Featured").map((movie) => (
              <div 
                key={movie.id}
                onClick={() => handlePlayContent(movie.title)}
                className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 aspect-[16/9] cursor-pointer hover:border-cyan-500/50 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  src={movie.backdropUrl} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="font-bold text-sm text-white drop-shadow">{movie.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 max-w-md">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Global Client Authentication Layer Container */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => setUserLoggedIn(true)} 
      />
    </div>
  );
}
