import React, { useState, useRef, useEffect } from "react";
import { Users, Shield, Send, Plus, MessageCircle, ChevronRight, ArrowLeft, CornerUpLeft, Smile, Sparkles, X, LogIn, Pin, ChevronDown, BarChart2, Vote } from "lucide-react";

interface Poll {
  id?: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
  userVotedIndex: number | null;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  unreadCount: number;
}

interface ChatMessage {
  id: string;
  userId: string;
  user: string;
  avatar: string;
  role: string;
  content: string;
  bubbleColor: string;
  timestamp: string;
  isPinned?: boolean;
  replyTo?: {
    user: string;
    content: string;
  };
}

interface Member {
  username: string;
  avatar: string;
  role: string;
}

export default function CommunityBoard() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [showFloatingEmotes, setShowFloatingEmotes] = useState(false);
  const [floatingEffects, setFloatingEffects] = useState<{ id: number; char: string }[]>([]);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    username: "GuestUser",
    email: "guest@neroxa.com",
    role: "Lounge Member",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
  });

  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestionInput, setPollQuestionInput] = useState("");
  const [pollOpt1, setPollOpt1] = useState("");
  const [pollOpt2, setPollOpt2] = useState("");

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);

  const backendUrl = "https://neroxa-app.onrender.com";

  // Auth Initialization
  useEffect(() => {
    const sessionStr = localStorage.getItem("userSession");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        setCurrentUser({
          username: session.username || "User",
          email: session.email || "user@neroxa.com",
          role: session.role || "Lounge Member",
          avatar: session.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
        });
        if (session.role === "FOUNDER / ADMIN" || session.isAdmin) {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Failed to parse auth session structure", e);
      }
    }
  }, []);

  // Fetch groups and active room components
  useEffect(() => {
    async function loadInitialData() {
      try {
        const groupsRes = await fetch(`${backendUrl}/api/community/groups`);
        const groupsData = await groupsRes.json();
        if (groupsData.success) {
          setGroups(groupsData.groups);
        }

        const usersRes = await fetch(`${backendUrl}/api/community/users`);
        const usersData = await usersRes.json();
        if (usersData.success) {
          setActiveMembers(usersData.users);
        }
      } catch (err) {
        console.error("Failed to connect to database pipeline groups", err);
      }
    }
    loadInitialData();
  }, []);

  // Sync messaging feed and active polls when user switches channels
  useEffect(() => {
    if (!activeGroupId) return;

    let isSubscribed = true;

    async function syncFeed() {
      try {
        const res = await fetch(`${backendUrl}/api/community/messages?groupId=${activeGroupId}`);
        const data = await res.json();
        if (data.success && isSubscribed) {
          setMessages(data.messages);
        }

        const pollRes = await fetch(`${backendUrl}/api/community/poll?groupId=${activeGroupId}`);
        const pollData = await pollRes.json();
        if (pollData.success && isSubscribed) {
          setActivePoll(pollData.poll);
        }
      } catch (err) {
        console.error("Error updates polling server:", err);
      }
    }

    syncFeed();
    const pollInterval = setInterval(syncFeed, 3000);

    return () => {
      isSubscribed = false;
      clearInterval(pollInterval);
    };
  }, [activeGroupId]);

  const pinnedMessage = messages.find((m) => m.isPinned);

  const handleScrollDetection = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 250) {
      setShowScrollBottomBtn(true);
    } else {
      setShowScrollBottomBtn(false);
    }
  };

  const jumpToBottomCoordinates = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    jumpToBottomCoordinates();
  }, [messages, activeGroupId]);

  const handleInputChange = (val: string) => {
    setMessageInput(val);
    if (val.endsWith("@")) {
      setShowMentionMenu(true);
    } else if (!val.includes("@") || val.endsWith(" ")) {
      setShowMentionMenu(false);
    }
  };

  const selectMention = (username: string) => {
    const baseText = messageInput.substring(0, messageInput.lastIndexOf("@"));
    setMessageInput(`${baseText}@${username} `);
    setShowMentionMenu(false);
  };

  const joinGroupArena = async (groupId: string) => {
    try {
      const res = await fetch(`${backendUrl}/api/community/groups/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, email: currentUser.email })
      });
      const data = await res.json();
      if (data.success) {
        setJoinedGroupIds([...joinedGroupIds, groupId]);
        setGroups(groups.map(g => g.id === groupId ? { ...g, members: g.members + 1 } : g));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePinMessage = async (msgId: string) => {
    if (!isAdmin) return;
    try {
      const res = await fetch(`${backendUrl}/api/community/messages/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msgId, groupId: activeGroupId })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map((m) => {
          if (m.id === msgId) return { ...m, isPinned: !m.isPinned };
          return { ...m, isPinned: false };
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const castPollVote = async (optIdx: number) => {
    if (!activePoll || !activeGroupId) return;
    try {
      const res = await fetch(`${backendUrl}/api/community/poll/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: activeGroupId, optionIndex: optIdx, email: currentUser.email })
      });
      const data = await res.json();
      if (data.success) {
        const updatedOptions = activePoll.options.map((opt, idx) => 
          idx === optIdx ? { ...opt, votes: opt.votes + 1 } : opt
        );
        setActivePoll({
          ...activePoll,
          options: updatedOptions,
          totalVotes: activePoll.totalVotes + 1,
          userVotedIndex: optIdx
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeployPoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestionInput.trim() || !pollOpt1.trim() || !pollOpt2.trim() || !activeGroupId) return;

    const payload = {
      groupId: activeGroupId,
      question: pollQuestionInput,
      options: [pollOpt1, pollOpt2]
    };

    try {
      const res = await fetch(`${backendUrl}/api/community/poll/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setActivePoll({
          question: pollQuestionInput,
          options: [{ text: pollOpt1, votes: 0 }, { text: pollOpt2, votes: 0 }],
          totalVotes: 0,
          userVotedIndex: null
        });
        setPollQuestionInput("");
        setPollOpt1("");
        setPollOpt2("");
        setShowPollCreator(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerFloatingEmote = (emote: string) => {
    const newEffect = { id: Date.now(), char: emote };
    setFloatingEffects((prev) => [...prev, newEffect]);
    setTimeout(() => {
      setFloatingEffects((prev) => prev.filter((e) => e.id !== newEffect.id));
    }, 4000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeGroupId) return;

    const outMsg = {
      groupId: activeGroupId,
      userId: currentUser.email,
      user: currentUser.username,
      avatar: currentUser.avatar,
      role: currentUser.role,
      content: messageInput,
      bubbleColor: isAdmin ? "#00b4d8" : "#111c30",
      replyTo: replyTarget ? { user: replyTarget.user, content: replyTarget.content } : undefined
    };

    setMessageInput("");
    setReplyTarget(null);

    try {
      const res = await fetch(`${backendUrl}/api/community/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outMsg)
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      console.error("Message processing delivery fault:", err);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      const res = await fetch(`${backendUrl}/api/community/groups/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGroupName, description: newGroupDesc })
      });
      const data = await res.json();
      if (data.success) {
        setGroups([...groups, data.group]);
        setJoinedGroupIds([...joinedGroupIds, data.group.id]);
        setNewGroupName("");
        setNewGroupDesc("");
        setShowCreateGroupModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentGroup = groups.find(g => g.id === activeGroupId);
  const hasUserJoinedActiveGroup = activeGroupId ? joinedGroupIds.includes(activeGroupId) : false;

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative flex flex-col overflow-hidden">
      
      <div className="absolute inset-x-0 bottom-24 top-16 pointer-events-none z-40 overflow-hidden">
        {floatingEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute text-3xl bottom-0 opacity-0 text-center animate-bounce"
            style={{
              animation: "floatUpwardsEffect 3.5s ease-in-out forwards",
              left: `${15 + Math.random() * 70}%`
            }}
          >
            {effect.char}
          </div>
        ))}
      </div>

      {!activeGroupId ? (
        <>
          <div className="bg-[#0b1424]/80 backdrop-blur-md border-b border-gray-800/80 p-4 sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#00b4d8]/10 rounded-xl text-[#00b4d8]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider">Neroxa Lounge</h1>
                <p className="text-[10px] text-gray-400 font-medium">Select an Authorized Arena Group</p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateGroupModal(true)}
                className="p-2 bg-[#00b4d8] text-white rounded-xl active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-4 space-y-2.5 flex-1 overflow-y-auto">
            {groups.map((group) => {
              const userHasJoined = joinedGroupIds.includes(group.id);
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className="w-full bg-[#111c30]/40 border border-gray-800/60 rounded-2xl p-4 flex items-center justify-between hover:border-[#00b4d8]/40 transition-all text-left group"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black uppercase tracking-wide text-gray-200 group-hover:text-[#00b4d8] transition-colors">
                        {group.name}
                      </h3>
                      {userHasJoined && (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider">Active Member</span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{group.description}</p>
                    <span className="text-[9px] font-bold text-gray-500 block uppercase tracking-widest">
                      {group.members} Members Online
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1 h-full relative">
          <div className="bg-[#0b1424]/95 border-b border-gray-800/80 p-3.5 sticky top-0 z-30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <button onClick={() => { setActiveGroupId(null); setReplyTarget(null); setShowMentionMenu(false); }} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="overflow-hidden">
                <h2 className="text-xs font-black uppercase tracking-wider text-white truncate">{currentGroup?.name}</h2>
                <p className="text-[9px] text-gray-400 truncate font-medium">{currentGroup?.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button 
                onClick={() => setShowPollCreator(!showPollCreator)}
                className="p-2 bg-[#111c30] hover:bg-[#00b4d8]/10 border border-gray-800 text-gray-400 hover:text-white rounded-xl transition-all"
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setShowFloatingEmotes(!showFloatingEmotes)}
                className={`p-2 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  showFloatingEmotes ? "bg-[#00b4d8] text-white border-transparent" : "bg-[#111c30] border-gray-800 text-gray-400"
                }`}
              >
                <Smile className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {pinnedMessage && (
            <div className="bg-[#0b1424]/90 backdrop-blur-md border-b border-[#00b4d8]/30 px-4 py-2 flex items-center justify-between gap-3 sticky top-[53px] z-20 shadow-lg">
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                <Pin className="w-3.5 h-3.5 text-[#00b4d8] fill-[#00b4d8] flex-shrink-0 rotate-45" />
                <div className="text-[11px] truncate">
                  <span className="font-black uppercase tracking-wider text-gray-400 text-[9px] block">PINNED ANNOUNCEMENT (@{pinnedMessage.user})</span>
                  <p className="text-gray-200 truncate font-medium font-sans">{pinnedMessage.content}</p>
                </div>
              </div>
              <button 
                onClick={() => togglePinMessage(pinnedMessage.id)}
                className="p-1 bg-gray-900 hover:bg-gray-800 text-gray-500 hover:text-white rounded-lg text-[9px] font-bold tracking-wider uppercase flex-shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {!hasUserJoinedActiveGroup ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-[#040509]">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#00b4d8] to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-[#00b4d8]/10">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-black uppercase tracking-wider">Locked Corridor</h2>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">Opt-in to verify connection profiles inside this section.</p>
              </div>
              <button
                onClick={() => joinGroupArena(currentGroup!.id)}
                className="w-full max-w-xs bg-[#00b4d8] hover:bg-[#0096b4] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Join Channel Arena
              </button>
            </div>
          ) : (
            <>
              <div 
                ref={chatContainerRef} 
                onScroll={handleScrollDetection}
                className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#040509] pb-40 scroll-smooth"
              >
                {activePoll && (
                  <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="flex items-center gap-1.5 border-b border-gray-800/60 pb-2">
                      <Vote className="w-4 h-4 text-[#00b4d8]" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-300">Live Vote Tracker</span>
                    </div>
                    <p className="text-xs font-bold text-white font-sans">{activePoll.question}</p>
                    <div className="space-y-2">
                      {activePoll.options.map((opt, idx) => {
                        const percent = activePoll.totalVotes > 0 ? Math.round((opt.votes / activePoll.totalVotes) * 100) : 0;
                        return (
                          <button
                            key={idx}
                            disabled={activePoll.userVotedIndex !== null}
                            onClick={() => castPollVote(idx)}
                            className="w-full relative p-2.5 rounded-xl border text-left text-xs font-medium transition-all overflow-hidden flex items-center justify-between border-gray-800 bg-gray-900/40"
                          >
                            <span className="relative z-10 text-gray-200 truncate pr-4 font-sans">{opt.text}</span>
                            <span className="relative z-10 font-black text-[10px] text-gray-400 font-sans">{percent}% ({opt.votes})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {messages.map((msg) => {
                  const isMe = msg.userId === currentUser.email;
                  const isMsgAdmin = msg.role === "FOUNDER / ADMIN" || msg.role === "AI SYSTEM ASSISTANT";
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} group relative`}>
                      <div className={`flex gap-2 max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <img src={msg.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-gray-800 mt-1 flex-shrink-0" />
                        <div>
                          <div className={`flex items-center gap-1.5 mb-1 text-[10px] ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="font-black text-gray-400">@{msg.user}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${
                              isMsgAdmin ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-gray-800 text-gray-500"
                            }`}>
                              {msg.role}
                            </span>
                          </div>
                          <div
                            className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed transition-all relative ${
                              isMe ? "rounded-tr-none text-white" : "rounded-tl-none text-gray-200"
                            }`}
                            style={{ backgroundColor: isMe ? "#00b4d8" : "#111c30" }}
                          >
                            {msg.replyTo && (
                              <div className="bg-black/20 border-l-2 border-white/40 rounded px-2 py-1 mb-1.5 text-[10px] opacity-80 text-gray-300">
                                <p className="font-black text-[9px] text-white/90">@{msg.replyTo.user}</p>
                                <p className="truncate">{msg.replyTo.content}</p>
                              </div>
                            )}
                            <p className="font-medium font-sans">{msg.content}</p>
                            <span className="text-[8px] text-white/40 block text-right mt-1 font-bold">{msg.timestamp}</span>
                          </div>
                          <div className={`flex items-center gap-2.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "justify-end" : "justify-start"}`}>
                            <button 
                              onClick={() => setReplyTarget(msg)}
                              className="text-[9px] text-gray-500 hover:text-[#00b4d8] font-bold uppercase tracking-wider flex items-center gap-1"
                            >
                              <CornerUpLeft className="w-2.5 h-2.5" /> Reply
                            </button>
                            {isAdmin && (
                              <button 
                                onClick={() => togglePinMessage(msg.id)}
                                className="text-[9px] text-gray-500 hover:text-[#00b4d8] font-bold uppercase tracking-wider flex items-center gap-1"
                              >
                                <Pin className="w-2.5 h-2.5" /> Pin
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {showScrollBottomBtn && (
                <button
                  onClick={jumpToBottomCoordinates}
                  className="fixed bottom-28 right-4 z-40 bg-[#00b4d8] text-white p-2.5 rounded-full shadow-2xl"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              )}

              {showFloatingEmotes && (
                <div className="fixed bottom-28 inset-x-0 max-w-md mx-auto px-4 z-30">
                  <div className="bg-[#0b1424]/95 border border-gray-800 backdrop-blur-md rounded-2xl p-2.5 flex justify-between items-center gap-2 shadow-2xl">
                    {["🔥", "😂", "👑", "👍", "🎬", "🍿"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => triggerFloatingEmote(emoji)}
                        className="text-lg hover:scale-125 transition-transform p-1.5"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showMentionMenu && (
                <div className="fixed bottom-28 inset-x-0 max-w-md mx-auto px-4 z-30">
                  <div className="bg-[#0b1424] border border-gray-800/80 rounded-2xl max-h-40 overflow-y-auto divide-y divide-gray-800 shadow-2xl">
                    <div className="p-2 bg-gray-900/40 text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#00b4d8]" /> Room Matrix Members
                    </div>
                    {activeMembers.map((member) => (
                      <button
                        key={member.username}
                        type="button"
                        onClick={() => selectMention(member.username)}
                        className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-[#00b4d8]/10 text-left"
                      >
                        <img src={member.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">@{member.username}</p>
                          <p className="text-[8px] font-medium text-gray-500 uppercase tracking-widest">{member.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto z-20 bg-gradient-to-t from-[#06070d] via-[#06070d] to-transparent p-3 border-t border-gray-900/40 space-y-2">
                {replyTarget && (
                  <div className="bg-[#111c30] border border-gray-800 rounded-xl p-2 flex items-center justify-between text-[11px]">
                    <div className="truncate pr-4 border-l-2 border-[#00b4d8] pl-2">
                      <span className="font-black text-white text-[10px] block">Replying to @{replyTarget.user}</span>
                      <span className="text-gray-400 truncate block font-sans">{replyTarget.content}</span>
                    </div>
                    <button onClick={() => setReplyTarget(null)} className="p-1 text-gray-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={replyTarget ? `Write reply...` : `Message inside channel... (Type @ for members)`}
                    className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-4 pr-12 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8] placeholder-gray-500 font-sans"
                  />
                  <button type="submit" className="absolute right-2 p-1.5 bg-[#00b4d8] text-white rounded-lg">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {showPollCreator && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleDeployPoll} className="w-full max-w-sm bg-[#0b1424] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">Deploy Interactive Vote Node</h3>
            <div className="space-y-3">
              <input
                type="text" required value={pollQuestionInput} onChange={(e) => setPollQuestionInput(e.target.value)}
                placeholder="Ask the lounge a question..."
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
              <input
                type="text" required value={pollOpt1} onChange={(e) => setPollOpt1(e.target.value)}
                placeholder="Option Choice 1"
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
              <input
                type="text" required value={pollOpt2} onChange={(e) => setPollOpt2(e.target.value)}
                placeholder="Option Choice 2"
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button type="button" onClick={() => setShowPollCreator(false)} className="px-4 py-2 text-gray-400 text-xs rounded-xl bg-gray-900">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#00b4d8] text-white text-xs font-black rounded-xl">Launch Poll</button>
            </div>
          </form>
        </div>
      )}

      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateGroup} className="w-full max-w-sm bg-[#0b1424] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">Deploy New Arena Group</h3>
            <div className="space-y-3">
              <input
                type="text" required value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group Room Name"
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-xs text-white"
              />
              <textarea
                value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)}
                placeholder="Short overview descriptive bounds..." rows={2}
                className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button type="button" onClick={() => setShowCreateGroupModal(false)} className="px-4 py-2 text-gray-400 text-xs rounded-xl bg-gray-900">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#00b4d8] text-white text-xs font-black rounded-xl">Launch Room</button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        @keyframes floatUpwardsEffect {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          15% { opacity: 1; transform: translateY(-30px) scale(1.1); }
          85% { opacity: 1; }
          100% { transform: translateY(-400px) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
