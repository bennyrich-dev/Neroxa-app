const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so your Vercel frontend can talk to this Render backend server
app.use(cors());
app.use(express.json());

// Fake database in memory to hold your profile updates so they don't vanish on refresh
let userProfile = {
  userName: "FOUNDER / ADMIN",
  streamQuality: "Ultra HD 4K",
  emailNotification: true,
  profileImage: null
};

// 👤 Profile API Endpoints
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

app.post('/api/profile/save', (req, res) => {
  userProfile = { ...userProfile, ...req.body };
  res.json({ success: true, message: "Profile saved to backend storage!", profile: userProfile });
});

// 🎬 Real Movie Proxy Endpoint (Protects your TMDB access safely)
app.get('/api/movies/trending', async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ca8c2c77d48d6174a742f9b8841da367");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to pull data from TMDB matrix nodes." });
  }
});

// Start Server Listen
app.listen(PORT, () => {
  console.log(`Nexora Core Backend Engine running live on port ${PORT}`);
});

