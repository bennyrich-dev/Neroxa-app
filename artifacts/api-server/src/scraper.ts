import fetch from "node-fetch";
import { db, contentTable } from "@workspace/db";
import { ilike, eq } from "drizzle-orm";

// Replace 'YOUR_TMDB_API_KEY_HERE' with your actual v3 API Key from TMDB settings page
const TMDB_API_KEY = process.env.TMDB_API_KEY || "YOUR_TMDB_API_KEY_HERE";
const BACKEND_API_URL = "http://localhost:5000/api/content/auto-scrape";

export async function syncTrendingAndUpcomingFromTMDB() {
  if (TMDB_API_KEY === "YOUR_TMDB_API_KEY_HERE" || !TMDB_API_KEY) {
    console.log("⚠️ TMDB API Key not configured yet. Skipping automatic background scraping routine.");
    return;
  }

  console.log("🚀 Starting automatic background sync from TMDB libraries...");

  try {
    const payload: any[] = [];

    // 1. Fetch Today's Globally Trending Movies
    const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`);
    const trendingData = await trendingRes.json();
    
    // 2. Fetch Highly Anticipated Unreleased / Upcoming Movies (Coming Soon)
    const upcomingRes = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const upcomingData = await upcomingRes.json();

    // Process Trending Collections
    if (trendingData.results) {
      for (const movie of trendingData.results.slice(0, 15)) {
        payload.push({
          title: movie.title,
          description: movie.overview,
          type: "movie",
          genre: "Trending", 
          year: movie.release_date ? parseInt(movie.release_date.split("-")[0]) : 2026,
          rating: Math.round(movie.vote_average * 10), // Converts 7.5 rating scale to 75% Match
          thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          isTrending: true,
          isNewRelease: true,
          status: "released"
        });
      }
    }

    // Process Coming Soon Collections
    if (upcomingData.results) {
      for (const movie of upcomingData.results.slice(0, 10)) {
        payload.push({
          title: movie.title,
          description: movie.overview,
          type: "movie",
          genre: "Upcoming Release",
          year: movie.release_date ? parseInt(movie.release_date.split("-")[0]) : 2026,
          rating: 0, 
          thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          isTrending: false,
          isNewRelease: false,
          status: "coming-soon" // Automatically routes items straight to your frontend 'Coming Soon' rows!
        });
      }
    }

    // 3. Fire payload package directly to our API Dual-Ingestion Route
    if (payload.length > 0) {
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const outcome = await response.json();
      console.log(`✅ Auto-Scraper Sync Loop Finished. Ingestion Engine status:`, outcome);
    }

  } catch (error) {
    console.error("❌ Auto-Scraper Background Loop Operational Crash:", error);
  }
}

// Automatically execute this script once every 24 hours to keep Neroxa updated entirely hands-off
setInterval(syncTrendingAndUpcomingFromTMDB, 1000 * 60 * 60 * 24);
