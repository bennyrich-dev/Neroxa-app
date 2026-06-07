import React, { useState, useRef, useEffect } from "react";
import { Users, Shield, Send, Plus, MessageCircle, ChevronRight, ArrowLeft, CornerUpLeft, Smile, Sparkles, X, LogIn, Pin, ChevronDown, BarChart2, Vote } from "lucide-react";

interface Poll {
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

export default function CommunityBoard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null);
  const [showFloatingEmotes, setShowFloatingEmotes] = useState(false);
  const [floatingEffects, setFloatingEffects] = useState<{ id: number; char: string }[]>([]);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ userName: "User", email: "" });

  const [activePoll, setActivePoll] = useState<Poll | null>({
    question: "Which live stream match event layout are we focusing on tonight?",
    options: [
      { text: "WWE SmackDown Premium Broadcast", votes: 0 },
      { text: "La Liga Live: Real Madrid vs Barcelona", votes: 0 }
    ],
    totalVotes: 0,
    userVotedIndex: null
  });

  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestionInput, setPollQuestionInput] = useState("");
  const [pollOpt1, setPollOpt1] = useState("");
  const [pollOpt2, setPollOpt2] = useState("");

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [groups, setGroups] = useState<Group[]>([
    { id: "g1", name: "WWE Live Zone", description: "SmackDown, RAW, and PPV breakdown room.", members: 1, unreadCount: 0 },
    { id: "g2", name: "Horror Addicts", description: "Discussing late-night jumpscares on Neroxa.", members: 1, unreadCount: 0 },
    { id: "g3", name: "Football Arena", description: "Matchday discussions, goals, and live scores.", members: 1, unreadCount: 0 }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const activeSession = localStorage.getItem("userSession");
    if (activeSession) {
      const parsed = JSON.parse(activeSession);
      setCurrentUser(parsed);
      if (parsed.email.includes("admin") || parsed.userName.toLowerCase().includes("founder")) {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!activeGroupId) return;

    const fetchGroupMessages = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://neroxa-app.onrender.com";
        const res = await fetch(`${backendUrl}/api/messages?room=${activeGroupId}`);
        const data = await res.json();
        if (data && data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Pipeline query block error:", err);
      }
    };

    fetchGroupMessages();
    const subInterval = setInterval(fetchGroupMessages, 4000);
    return () => clearInterval(subInterval);
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

  const joinGroupArena = (groupId: string) => {
    setJoinedGroupIds([...joinedGroupIds, groupId]);
  };

  const togglePinMessage = (msgId: string) => {
    if (!isAdmin) return;
    setMessages(messages.map((m) => {
      if (m.id === msgId) return { ...m, isPinned: !m.isPinned };
      return { ...m, isPinned: false };
    }));
  };

  const castPollVote = (optIdx: number) => {
    if (!activePoll || activePoll.userVotedIndex !== null) return;
    const updatedOptions = activePoll.options.map((opt, idx) => 
      idx === optIdx ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setActivePoll({
      ...activePoll,
      options: updatedOptions,
      totalVotes: activePoll.totalVotes + 1,
      userVotedIndex: optIdx
    });
  };

  const handleDeployPoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestionInput.trim() || !pollOpt1.trim() || !pollOpt2.trim()) return;
    setActivePoll({
      question: pollQuestionInput,
      options: [
        { text: pollOpt1, votes: 0 },
        { text: pollOpt2, votes: 0 }
      ],
      totalVotes: 0,
      userVotedIndex: null
    });
    setPollQuestionInput("");
    setPollOpt1("");
    setPollOpt2("");
    setShowPollCreator(false);
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

    const outMsg: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.email,
      user: currentUser.userName,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      role: isAdmin ? "FOUNDER / ADMIN" : "MEMBER",
      content: messageInput,
      bubbleColor: "#00b4d8",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyTo: replyTarget ? { user: replyTarget.user, content: replyTarget.content } : undefined,
      isPinned: false
    };

    setMessages((prev) => [...prev, outMsg]);
    const savedText = messageInput;
    setMessageInput("");
    setReplyTarget(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://neroxa-app.onrender.com";
      await fetch(`${backendUrl}/api/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: activeGroupId, ...outMsg, content: savedText })
      });
    } catch (err) {
      console.error("Local bridge transmission bypass:", err);
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newRoom: Group = {
      id: `g${Date.now()}`,
      name: newGroupName,
      description: newGroupDesc || "Custom room terminal layout.",
      members: 1,
      unreadCount: 0
    };

    setGroups([...groups, newRoom]);
    setJoinedGroupIds([...joinedGroupIds, newRoom.id]);
    setNewGroupName("");
    setNewGroupDesc("");
    setShowCreateGroupModal(false);
  };

  const currentGroup = groups.find(g => g.id === activeGroupId);
  const hasUserJoinedActiveGroup = activeGroupId ? joinedGroupIds.includes(activeGroupId) : false;

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative flex flex-col overflow-hidden">
      
      <div className="absolute inset-x-0 bottom-24 top-16 pointer-events-none z-40 overflow-hidden">
        {floatingEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute text-3xl bottom-0 opacity-0 text-center"
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
                <p className="text-[10px] text-gray-400 font-medium">Select an Active Group Channel</p>
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
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider">Joined</span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{group.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1 h-full relative">
          <div className="bg-[#0b1424]/95 border-b border-gray-800/80 p-3.5 sticky top-0 z-30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <button onClick={() => { setActiveGroupId(null); setReplyTarget(null); }} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="overflow-hidden">
                <h2 className="text-xs font-black uppercase tracking-wider text-white truncate">{currentGroup?.name}</h2>
                <p className="text-[9px] text-gray-400 truncate font-medium">{currentGroup?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isAdmin && (
                <button 
                  onClick={() => setShowPollCreator(!showPollCreator)}
                  className="p-2 bg-[#111c30] border border-gray-800 text-gray-400 hover:text-white rounded-xl transition-all"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button 
                onClick={() => setShowFloatingEmotes(!showFloatingEmotes)}
                className={`p-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${
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
                <Pin className="w-3.5 h-3.5 text-[#00b4d8] fill-[#00b4d8] rotate-45" />
                <div className="text-[11px] truncate">
                  <span className="font-black text-gray-400 text-[9px] block">PINNED MESSAGE</span>
                  <p className="text-gray-200 truncate font-sans">{pinnedMessage.content}</p>
                </div>
              </div>
              <button onClick={() => togglePinMessage(pinnedMessage.id)} className="p-1 bg-gray-900 text-gray-500 rounded-lg text-[9px]">Dismiss</button>
            </div>
          )}

          {!hasUserJoinedActiveGroup ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-[#040509]">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#00b4d8] to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-sm font-black uppercase">Channel Corridor Locked</h2>
              <button
                onClick={() => joinGroupArena(currentGroup!.id)}
                className="w-full max-w-xs bg-[#00b4d8] text-white text-xs font-black py-3 rounded-xl shadow-lg"
              >
                Join Channel Stream
              </button>
            </div>
          ) : (
            <>
              <div 
                ref={chatContainerRef} 
                onScroll={handleScrollDetection}
                className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#040509] pb-40"
              >
                {activePoll && (
                  <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3 shadow-xl">
                    <p className="text-xs font-bold text-white font-sans">{activePoll.question}</p>
                    <div className="space-y-2">
                      {activePoll.options.map((opt, idx) => {
                        const percent = activePoll.totalVotes > 0 ? Math.round((opt.votes / activePoll.totalVotes) * 100) : 0;
                        return (
                          <button
                            key={idx}
                            disabled={activePoll.userVotedIndex !== null}
                            onClick={() => castPollVote(idx)}
                            className="w-full relative p-2.5 rounded-xl border border-gray-800 bg-gray-900/40 flex items-center justify-between"
                          >
                            <span className="relative z-10 text-gray-200 truncate font-sans">{opt.text}</span>
                            <span className="relative z-10 font-black text-[10px] text-gray-400 font-sans">{percent}%</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {messages.map((msg) => {
                  const isMe = msg.userId === currentUser.email;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} group relative`}>
                      <div className={`flex gap-2 max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <img src={msg.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-gray-800 mt-1" />
                        <div>
                          <div className={`flex items-center gap-1.5 mb-1 text-[10px] ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="font-black text-gray-400">@{msg.user}</span>
                            <span className="bg-gray-800 px-1 rounded text-[7px] text-gray-500">{msg.role}</span>
                          </div>
                          <div
                            className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${isMe ? "rounded-tr-none text-white bg-[#00b4d8]" : "rounded-tl-none text-gray-200 bg-[#111c30]"}`}
                          >
                            {msg.replyTo && (
                              <div className="bg-black/20 border-l-2 border-white/40 rounded px-2 py-0.5 mb-1 text-[10px] opacity-80">
                                <p className="font-black">@{msg.replyTo.user}</p>
                                <p className="truncate">{msg.replyTo.content}</p>
                              </div>
                            )}
                            <p className="font-medium font-sans">{msg.content}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setReplyTarget(msg)} className="text-[9px] text-gray-500 font-bold flex items-center gap-1"><CornerUpLeft className="w-2.5 h-2.5" /> Reply</button>
                            {isAdmin && (
                              <button onClick={() => togglePinMessage(msg.id)} className="text-[9px] text-gray-500 font-bold"><Pin className="w-2.5 h-2.5" /> Pin</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {showScrollBottomBtn && (
                <button onClick={jumpToBottomCoordinates} className="fixed bottom-28 right-4 z-40 bg-[#00b4d8] text-white p-2.5 rounded-full border border-white/10">
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {showFloatingEmotes && (
                <div className="fixed bottom-28 inset-x-0 max-w-md mx-auto px-4 z-30">
                  <div className="bg-[#0b1424]/95 border border-gray-800 backdrop-blur-md rounded-2xl p-2.5 flex justify-between gap-2 shadow-2xl">
                    {["🔥", "😂", "😮", "👑", "👍", "🎬", "🍿"].map((emoji) => (
                      <button key={emoji} onClick={() => triggerFloatingEmote(emoji)} className="text-lg hover:scale-125 transition-transform">{emoji}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto z-20 bg-[#06070d] p-3 border-t border-gray-900/40 space-y-2">
                {replyTarget && (
                  <div className="bg-[#111c30] border border-gray-800 rounded-xl p-2 flex items-center justify-between text-[11px]">
                    <div className="truncate pr-4 border-l-2 border-[#00b4d8] pl-2">
                      <span className="font-black text-white block">Replying to @{replyTarget.user}</span>
                      <span className="text-gray-400 truncate block">{replyTarget.content}</span>
                    </div>
                    <button onClick={() => setReplyTarget(null)} className="p-1 text-gray-400"><X className="w-3.5 h-3.5" /></button>
                  </div
