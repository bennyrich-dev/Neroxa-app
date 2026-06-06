const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Render sets up ports automatically using an environment variable
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Server Volatile State Memory Storage (Replaces hardcoded mocks with live application states)
let registeredUsers = [];
let savedMessages = [];

// Base Root Route to Verify Server Diagnostics
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    status: "ONLINE", 
    system: "NEXORA PRODUCTION MATRIX RUNNING NATIVELY" 
  });
});

// 🔐 REAL ACCOUNT REGISTRATION ENDPOINT
app.post('/api/auth/signup', (req, res) => {
  const { email, password, userName } = req.body;
  
  if (!email || !password || !userName) {
    return res.status(400).json({ success: false, error: "Missing identity credentials parameters." });
  }

  const existingUser = registeredUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, error: "This email layout is already registered." });
  }

  const identityProfile = { id: `NX-${Date.now()}`, userName, email };
  registeredUsers.push({ ...identityProfile, password });

  return res.status(201).json({ success: true, user: identityProfile });
});

// 🔓 REAL ACCOUNT LOGIN ENDPOINT
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const verifiedProfile = registeredUsers.find(user => user.email === email && user.password === password);
  if (!verifiedProfile) {
    return res.status(401).json({ success: false, error: "Invalid registration access credentials." });
  }

  return res.json({ 
    success: true, 
    user: { 
      id: verifiedProfile.id, 
      userName: verifiedProfile.userName, 
      email: verifiedProfile.email 
    } 
  });
});

// 💬 ACTIVE MESSAGING TERMINAL LINK ROUTES
app.get('/api/messages', (req, res) => {
  res.json({ success: true, messages: savedMessages });
});

app.post('/api/messages/send', (req, res) => {
  const { user, text, timestamp } = req.body;
  
  if (!user || !text) {
    return res.status(400).json({ success: false, error: "Cannot dispatch empty messages down line." });
  }

  const structuralMessage = { id: `MSG-${Date.now()}`, user, text, timestamp: timestamp || "Just Now" };
  savedMessages.push(structuralMessage);
  
  // Prevent stack overflow memory leaks on server instances
  if (savedMessages.length > 100) {
    savedMessages.shift();
  }

  res.json({ success: true, message: structuralMessage });
});

// 🎬 DYNAMIC REAL MOVIE TMDB PROXY PROXY TUNNEL ENDPOINT
app.get('/api/movies/trending', async (req, res) => {
  try {
    const key = process.env.TMDB_API_KEY || "ca8c2c77d48d6174a742f9b8841da367";
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`);
    
    if (!tmdbResponse.ok) {
      throw new Error(`TMDB connection response error: ${tmdbResponse.status}`);
    }

    const data = await tmdbResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy database pipeline error:", error);
    res.status(500).json({ success: false, error: "Failed to connect to cinema streaming clusters." });
  }
});

app.listen(PORT, () => {
  console.log(`Server executing live production processes on port ${PORT}`);
});
