import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * LiveSessionPage.tsx
 * Rewritten frontend for a browser-native live class platform (React + TypeScript + Tailwind).
 *
 * Notes:
 * - This file focuses on frontend behavior and UI. Integration points for real-time media (Daily/Agora/Twilio)
 *   and signalling (Socket.IO / WebSocket) are clearly marked with comments where you should plug your SDKs.
 * - Recording, scheduling, notifications, and uploads require backend endpoints and provider keys.
 * - Keep this file as a single-file preview for now; split into smaller components/files when integrating.
 */

type Role = "instructor" | "co-instructor" | "student" | "admin";

type User = {
  id: string;
  name: string;
  role: Role;
  isOnline?: boolean;
  isSpeaking?: boolean;
};

type ChatMessage = {
  id: string | number;
  senderId?: string;
  senderName: string;
  text: string;
  time: string;
  isInstructor?: boolean;
};

type SessionMeta = {
  id: string;
  title: string;
  instructor: string;
  topic?: string;
  startTime?: string | null; // ISO string
  durationMinutes?: number;
  status: "scheduled" | "live" | "ended";
  recordingUrl?: string | null;
};

const nowFormatted = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function LiveSessionPage() {
  // ----- demo/local state (replace with API/Socket/SDK integration) -----
  const [currentUser, setCurrentUser] = useState<User>({
    id: "u-you",
    name: "You",
    role: "student",
    isOnline: true,
  });

  const [session, setSession] = useState<SessionMeta>({
    id: "s-1",
    title: "Advanced AI & Machine Learning for African Contexts",
    instructor: "Eng. Godwin Ofwono",
    topic: "Neural Networks and Deep Learning Applications",
    startTime: null,
    durationMinutes: 120,
    status: "scheduled",
    recordingUrl: null,
  });

  const [participants, setParticipants] = useState<User[]>([
    { id: "u-1", name: "Eng. Godwin", role: "instructor", isOnline: true, isSpeaking: true },
    { id: "u-2", name: "Eng. Cissyln", role: "co-instructor", isOnline: true },
    { id: "u-3", name: "Sarah Nakato", role: "student", isOnline: true },
    { id: "u-you", name: "You", role: "student", isOnline: true },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, senderName: "Eng. Godwin", text: "Welcome everyone!", time: nowFormatted(), isInstructor: true },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Media & room state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Local UI
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isUploadsOpen, setIsUploadsOpen] = useState(false);

  // Placeholder for SDK client / connection
  const sdkClientRef = useRef<any>(null);
  const signallingSocketRef = useRef<WebSocket | null>(null);

  // ----- Effects & helpers -----
  useEffect(() => {
    // Auto-scroll chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    // TODO: connect to signalling server here (Socket.IO or WebSocket)
    // signallingSocketRef.current = new WebSocket("wss://your-signalling.example/ws");
    // wire up events for presence, chat, and room state.

    // Cleanup
    return () => {
      if (signallingSocketRef.current) {
        signallingSocketRef.current.close();
      }
    };
  }, []);

  // ----- Chat -----
  const sendChat = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const text = newMessage.trim();
      if (!text) return;
      const msg: ChatMessage = {
        id: Date.now(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        text,
        time: nowFormatted(),
        isInstructor: currentUser.role === "instructor" || currentUser.role === "co-instructor",
      };

      // Send over signalling / persist via API
      // signallingSocketRef.current?.send(JSON.stringify({ type: 'chat', payload: msg }))

      setChatMessages(prev => [...prev, msg]);
      setNewMessage("");
    },
    [newMessage, currentUser]
  );

  // ----- Session control (instructor only) -----
  const startSession = useCallback(async () => {
    if (currentUser.role !== "instructor" && currentUser.role !== "co-instructor") return;

    // 1) Call backend API to create a room / token for the chosen provider (Agora/Daily/Twilio)
    // 2) Receive token + roomId, then initialize SDK client in browser and join the room
    // 3) Optionally trigger provider-side recording (or instruct your server to start recording)

    // Placeholder behavior for demo:
    setSession(prev => ({ ...prev, status: "live", startTime: new Date().toISOString() }));
    setIsRecording(true);

    // TODO: initialize sdkClientRef.current = await initYourProviderClient({ token, roomId })
  }, [currentUser]);

  const endSession = useCallback(async () => {
    if (currentUser.role !== "instructor" && currentUser.role !== "co-instructor") return;

    // Tell provider to stop recording and finalize file; update session metadata in backend
    setSession(prev => ({ ...prev, status: "ended" }));
    setIsRecording(false);

    // TODO: fetch recording URL and setSession(...recordingUrl...)
  }, [currentUser]);

  const joinSession = useCallback(async () => {
    // Called by student to join a live room
    // 1) Acquire token from backend
    // 2) Initialize provider SDK and join room
    // 3) Send presence to signalling server

    // Demo: just set presence locally
    setParticipants(prev => prev.map(p => (p.id === currentUser.id ? { ...p, isOnline: true } : p)));
  }, [currentUser]);

  // ----- Toggle media -----
  const toggleMute = useCallback(() => setIsMuted(v => !v), []);
  const toggleVideo = useCallback(() => setIsVideoOff(v => !v), []);
  const toggleHand = useCallback(() => setIsHandRaised(v => !v), []);

  // ----- Uploads (notes, slides) -----
  const handleFileUpload = useCallback(async (file: File) => {
    // Recommended: request presigned URL from backend and PUT the file to S3
    // const presign = await fetch('/api/uploads/presign', { method: 'POST', body: JSON.stringify({ name: file.name }) })
    // const { url } = await presign.json();
    // await fetch(url, { method: 'PUT', body: file });

    // After upload, notify backend and update uploads list for session
    console.log('upload', file.name);
  }, []);

  // ----- UI derived data -----
  const onlineCount = useMemo(() => participants.filter(p => p.isOnline).length, [participants]);

  // ----- simple scheduler helper for demo -----
  const scheduleSession = useCallback((isoDate: string) => {
    setSession(prev => ({ ...prev, startTime: isoDate, status: "scheduled" }));
    setIsSchedulerOpen(false);
    // TODO: call backend to persist schedule and queue notifications
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/60 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{session.title}</h1>
            <p className="text-sm text-gray-300">{session.instructor} • {session.topic}</p>
            <p className="text-xs text-gray-400">{session.status === 'live' ? `Live — started at ${session.startTime ? new Date(session.startTime).toLocaleTimeString() : ''}` : session.status === 'scheduled' && session.startTime ? `Scheduled: ${new Date(session.startTime).toLocaleString()}` : 'Not started yet'}</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-sm bg-red-600">🔴 LIVE</span>
            <div className="text-sm text-gray-300">{onlineCount} online</div>

            {/* Instructor controls */}
            {(currentUser.role === 'instructor' || currentUser.role === 'co-instructor') && (
              <div className="flex items-center space-x-2">
                {session.status !== 'live' ? (
                  <button onClick={startSession} className="px-3 py-1 rounded bg-yellow-600 text-black font-medium">Start Session</button>
                ) : (
                  <button onClick={endSession} className="px-3 py-1 rounded bg-red-700 text-white font-medium">End Session</button>
                )}
                <button onClick={() => setIsSchedulerOpen(true)} className="px-3 py-1 rounded bg-gray-800">Schedule</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Video + Controls */}
          <section className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-black rounded-lg overflow-hidden flex-1 relative border border-gray-800">
              {/*
                VIDEO AREA
                Replace the iframe below by your provider's <Video/> component or attach local tracks via WebRTC.
              */}
              {session.status === 'live' ? (
                // TODO: Replace with actual provider player component
                <div className="w-full h-full flex items-center justify-center text-gray-400"> 
                  <p className="text-center">Live video stream (provider SDK goes here)</p>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 text-center text-gray-400">
                  <div>
                    <p className="mb-2">Session is not live yet.</p>
                    {session.startTime ? (
                      <p className="text-sm">Scheduled to start at <strong>{new Date(session.startTime).toLocaleString()}</strong></p>
                    ) : (
                      <p className="text-sm">No schedule set.</p>
                    )}
                    <div className="mt-3 flex justify-center space-x-2">
                      <button onClick={() => {/* subscribe to notifications via API */}} className="px-3 py-1 rounded bg-teal-600 text-white">Subscribe</button>
                      <button onClick={joinSession} className="px-3 py-1 rounded bg-gray-800">Join Anyway</button>
                    </div>
                  </div>
                </div>
              )}

              {/* small pip instructor */}
              <div className="absolute bottom-4 right-4 w-52 h-36 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden flex items-end">
                <img src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Instructor" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">{session.instructor}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={toggleMute} className={`px-3 py-2 rounded ${isMuted ? 'bg-red-600' : 'bg-gray-800'}`}>{isMuted ? 'Unmute' : 'Mute'}</button>
                <button onClick={toggleVideo} className={`px-3 py-2 rounded ${isVideoOff ? 'bg-red-600' : 'bg-gray-800'}`}>{isVideoOff ? 'Start Video' : 'Stop Video'}</button>
                <button onClick={toggleHand} className={`px-3 py-2 rounded ${isHandRaised ? 'bg-yellow-600 text-black' : 'bg-gray-800'}`}>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</button>
                <button onClick={() => setIsUploadsOpen(v => !v)} className="px-3 py-2 rounded bg-gray-800">Uploads</button>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-300">Recording: {isRecording ? 'ON' : 'OFF'}</div>
                <button onClick={() => setIsRecording(v => !v)} className="px-3 py-2 rounded bg-gray-800">Toggle Recording</button>
              </div>
            </div>
          </section>

          {/* Sidebar: Participants + Chat */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Participants ({onlineCount})</h3>
                <button className="text-sm text-gray-400">Manage</button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {participants.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded bg-gray-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.isOnline ? 'bg-green-400' : 'bg-gray-600'}`} />
                      <div className="text-sm">{p.name}</div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded ${p.role === 'instructor' ? 'bg-teal-600 text-black' : 'bg-gray-700 text-gray-200'}`}>{p.role}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Chat</h3>
                <div className="text-xs text-gray-400">Live</div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-64">
                {chatMessages.map(m => (
                  <div key={m.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${m.isInstructor ? 'text-teal-300' : 'text-gray-300'}`}>{m.senderName}</span>
                      <span className="text-xs text-gray-500">{m.time}</span>
                    </div>
                    <div className="pl-2 border-l-2 border-gray-700 text-gray-200">{m.text}</div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={sendChat} className="flex gap-2">
                <input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none" />
                <button type="submit" className="px-3 py-2 rounded bg-teal-600">Send</button>
              </form>
            </div>

            <div className="bg-gray-900 rounded-lg p-3">
              <h4 className="text-sm font-semibold mb-2">Recordings & Resources</h4>
              {session.recordingUrl ? (
                <a href={session.recordingUrl} target="_blank" rel="noreferrer" className="text-sm text-teal-400 underline">Watch recording</a>
              ) : (
                <div className="text-xs text-gray-400">No recordings yet.</div>
              )}

              <div className="mt-3">
                <button onClick={() => {/* show all resources */}} className="text-sm px-3 py-1 rounded bg-gray-800">View Files</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Scheduler Modal (simple) */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold mb-3">Schedule Session</h3>
            <label className="text-xs text-gray-400">Start time</label>
            <input type="datetime-local" className="w-full bg-gray-800 rounded px-3 py-2 mb-4" id="sched-input" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsSchedulerOpen(false)} className="px-3 py-1 rounded bg-gray-700">Cancel</button>
              <button onClick={() => {
                const input = (document.getElementById('sched-input') as HTMLInputElement | null)?.value;
                if (input) scheduleSession(new Date(input).toISOString());
              }} className="px-3 py-1 rounded bg-teal-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Uploads drawer (very simple) */}
      {isUploadsOpen && (
        <div className="fixed right-4 bottom-4 w-80 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Upload Files</h4>
          <input type="file" className="mb-2" onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }} />
          <div className="text-xs text-gray-400">Upload slides, notes, or links for this session.</div>
          <div className="flex justify-end mt-3">
            <button onClick={() => setIsUploadsOpen(false)} className="px-3 py-1 rounded bg-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
