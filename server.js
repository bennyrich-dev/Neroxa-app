const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Temporary Server Storage Matrices (Wipes fake hardcoded files)
let registeredUsers = [];
let savedMessages = [];

// Base Network Route Test
app.get('/', (req, res) => {
  res.json({ success: true, message: "Nexora Production Engine Operational" });
});

// 🔐 SIGNUP ENDPOINT
app.post('/api/auth/signup', (req, res) => {
  const { email, password, userName } = req.body;
  if (!email || !password || !userName) {
    return res.status(400).json({ success: false, error: "Missing required account parameters." });
  }

  const userExists = registeredUsers.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ success: false, error: "Identity profile already registered." });
  }

  const newUser = { userName, email, id: `NX-${Date.now()}` };
  registeredUsers.push({ ...newUser, password });

  return res.status(201).json({ success: true, user: newUser });
});

// 🔓 LOGIN ENDPOINT
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = registeredUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, error: "Invalid access keyphrase credentials." });
  }

  return res.json({ success: true, user: { userName: user.userName, email: user.email, id: user.id } });
});

// 💬 COMMUNITY REAL MESSAGES ENDPOINTS
app.get('/api/messages', (req, res) => {
  res.json({ success: true, messages: savedMessages });
});

app.post('/api/messages/send', (req, res) => {
  const { user, text, timestamp } = req.body;
  const msgObj = { id: `MSG-${Date.now()}`, user, text, timestamp };
  savedMessages.push(msgObj);
  
  // Cap history queue to avoid memory overload leaks
  if (savedMessages.length > 50) savedMessages.shift();
  
  res.json({ success: true, message: msgObj });
});

app.listen(PORT, () => {
  console.log(`Live system deployment reading parameters on port ${PORT}`);
});
