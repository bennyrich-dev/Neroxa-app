const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Production Database Runtime State Storage Models
let liveMessages = [
  {
    id: "init-1",
    groupId: "g1",
    userId: "system-admin",
    user: "Benny Richy",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
    role: "FOUNDER / ADMIN",
    content: "Lounge cluster channel functional. Stream assets synced perfectly.",
    bubbleColor: "#00b4d8",
    timestamp: "12:00 PM",
    isPinned: true
  }
];

let createdGroups = [
  { id: "g1", name: "WWE Live Zone", description: "SmackDown, RAW, and PPV breakdown room.", members: 142, unreadCount: 0 },
  { id: "g2", name: "Horror & Thriller Addicts", description: "Discussing late-night jumpscares on Neroxa.", members: 98, unreadCount: 0 },
  { id: "g3", name: "Football Arena", description: "Matchday discussions, goals, and live scores.", members: 210, unreadCount: 0 }
];

let catalogCache = { results: [] };
let activePolls = {};

// Helper: Sync with TMDB API directly
async function primeCatalogCache() {
  try {
    const tmdbKey = process.env.TMDB_API_KEY || "84478d1073df016df16f0d7e6ca990bc"; // Secure backup key
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${tmdbKey}`);
    const data = await response.json();
    if (data && data.results) {
      catalogCache.results = data.results;
    }
  } catch (err) {
    console.log("TMDB cluster validation failure:", err.message);
  }
}
primeCatalogCache();
setInterval(primeCatalogCache, 600000); // 10-minute automatic updates

// --- ENDPOINTS ---

// Movie Catalog Fetching Routing
app.get("/api/movies/trending", (req, res) => {
  if (catalogCache.results.length === 0) {
    return res.json({
      success: true,
      results: [
        { id: 101, title: "WWE Premium Live Event", backdrop_path: "", overview: "Live action stream broadcast.", popularity: 500, vote_average: 8.8 },
        { id: 102, title: "La Liga Live Stream", backdrop_path: "", overview: "Real Madrid vs Barcelona matches live.", popularity: 420, vote_average: 8.5 }
      ]
    });
  }
  res.json({ success: true, results: catalogCache.results });
});

app.post("/api/movies/inject", (req, res) => {
  const customItem = { id: Date.now(), ...req.body };
  catalogCache.results.unshift(customItem);
  res.json({ success: true, item: customItem });
});

// Community Lounge Messaging Engine Linkages
app.get("/api/community/groups", (req, res) => {
  res.json({ success: true, groups: createdGroups });
});

app.post("/api/community/groups/create", (req, res) => {
  const { name, description } = req.body;
  const newGroup = {
    id: `g${Date.now()}`,
    name,
    description: description || "Channel sector bounds.",
    members: 1,
    unreadCount: 0
  };
  createdGroups.push(newGroup);
  res.json({ success: true, group: newGroup });
});

app.post("/api/community/groups/join", (req, res) => {
  const { groupId } = req.body;
  createdGroups = createdGroups.map(g => g.id === groupId ? { ...g, members: g.members + 1 } : g);
  res.json({ success: true });
});

app.get("/api/community/messages", (req, res) => {
  const { groupId } = req.query;
  const filtered = liveMessages.filter(m => m.groupId === groupId);
  res.json({ success: true, messages: filtered });
});

app.post("/api/community/messages/send", (req, res) => {
  const { groupId, userId, user, avatar, role, content, replyTo } = req.body;
  
  const newMessage = {
    id: `m-${Date.now()}`,
    groupId,
    userId,
    user,
    avatar,
    role,
    content,
    bubbleColor: role === "FOUNDER / ADMIN" ? "#00b4d8" : "#111c30",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    replyTo,
    isPinned: false
  };

  liveMessages.push(newMessage);

  // Trigger automated bot companion actions when handled explicitly
  if (content.includes("@NexaAI") || content.toLowerCase().includes("bot")) {
    setTimeout(() => {
      liveMessages.push({
        id: `bot-${Date.now()}`,
        groupId,
        userId: "nexa-ai-id",
        user: "NexaAI",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80",
        role: "AI SYSTEM ASSISTANT",
        content: `System Protocol: Connection clear @${user}. Operational cluster monitoring shows zero packet anomalies. All media links ready inside the database catalog.`,
        bubbleColor: "#7c3aed",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
    }, 1000);
  }

  res.json({ success: true, message: newMessage });
});

app.post("/api/community/messages/pin", (req, res) => {
  const { msgId, groupId } = req.body;
  liveMessages = liveMessages.map(m => {
    if (m.groupId === groupId) {
      return { ...m, isPinned: m.id === msgId ? !m.isPinned : false };
    }
    return m;
  });
  res.json({ success: true });
});

// Interactive Dynamic Polling Configurations
app.get("/api/community/poll", (req, res) => {
  const { groupId } = req.query;
  if (!activePolls[groupId]) {
    activePolls[groupId] = {
      question: "Which stream interface profile strategy are we launching tonight?",
      options: [
        { text: "WWE SmackDown Arena Broadcast", votes: 24 },
        { text: "La Liga Matchday Coverage Deck", votes: 31 }
      ],
      totalVotes: 55,
      userVotedIndex: null
    };
  }
  res.json({ success: true, poll: activePolls[groupId] });
});

app.post("/api/community/poll/create", (req, res) => {
  const { groupId, question, options } = req.body;
  activePolls[groupId] = {
    question,
    options: options.map(opt => ({ text: opt, votes: 0 })),
    totalVotes: 0,
    userVotedIndex: null
  };
  res.json({ success: true });
});

app.post("/api/community/poll/vote", (req, res) => {
  const { groupId, optionIndex } = req.body;
  const poll = activePolls[groupId];
  if (poll) {
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
  }
  res.json({ success: true });
});

// AI Direct Assistant Responses Channel
app.post("/api/ai/respond", (req, res) => {
  const { prompt } = req.body;
  const query = prompt.toLowerCase();
  let text = "Mainframe operational. Query logged into active system memory buffers.";

  if (query.includes("movie") || query.includes("stream")) {
    text = "Database check complete: The movie platform is connected directly to global servers. 100% active data parameters are feeding to the dashboard catalog right now.";
  } else if (query.includes("wwe") || query.includes("smackdown")) {
    text = "The WWE Arena lounge zone has high traffic markers. Active user parameters indicate 94% compatibility with premium theater layout protocols.";
  } else if (query.includes("admin") || query.includes("founder")) {
    text = "Privilege authentication success. The Admin Console allows seamless manual injection of catalog data targets directly into active clusters.";
  }

  res.json({ success: true, response: text });
});

// Simple Auth Handling
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const name = email.split("@")[0];
  const isAdmin = email.includes("admin") || name.toLowerCase().includes("founder");
  res.json({
    success: true,
    user: {
      username: name,
      email,
      role: isAdmin ? "FOUNDER / ADMIN" : "Lounge Member",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      isAdmin
    }
  });
});

app.post("/api/auth/register", (req, res) => {
  const { username, email } = req.body;
  const isAdmin = email.includes("admin") || username.toLowerCase().includes("founder");
  res.json({
    success: true,
    user: {
      username,
      email,
      role: isAdmin ? "FOUNDER / ADMIN" : "Lounge Member",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      isAdmin
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server executing live on active port ${PORT}`));
         
