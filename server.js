const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
// Render assigns a random port automatically using an environment variable
const PORT = process.env.PORT || 5000;

// Connect the CORS bridge layer so your Vercel frontend can talk to this server
app.use(cors({
  origin: "*" // Allows your Vercel deployment link to grab server data safely
}));
app.use(express.json());

// In-memory data store placeholder for mobile view syncs
let userProfile = {
  userName: "FOUNDER / ADMIN",
  streamQuality: "Ultra HD 4K",
  emailNotification: true,
  profileImage: null
};

// Test root endpoint to verify server is alive
app.get('/', (req, res) => {
  res.json({ status: "ONLINE", system: "NEXORA CORE MATRIX ENGAGED" });
});

// Profile endpoints
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

app.post('/api/profile/save', (req, res) => {
  userProfile = { ...userProfile, ...req.body };
  res.json({ success: true, profile: userProfile });
});

// Dynamic TMDB movie proxy tunnel
app.get('/api/movies/trending', async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ca8c2c77d48d6174a742f9b8841da367");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Pipeline failure connecting to streaming database nodes." });
  }
});

app.listen(PORT, () => {
  console.log(`Server executing live on active port ${PORT}`);
});
