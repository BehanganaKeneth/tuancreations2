import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  startTime?: string | null;
  durationMinutes?: number;
  status: "scheduled" | "live" | "ended";
  recordingUrl?: string | null;
};

const nowFormatted = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function LiveSessionPage() {
  // ----- State -----
  const [currentUser] = useState<User>({
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
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isUploadsOpen, setIsUploadsOpen] = useState(false);

  const [notifEmail, setNotifEmail] = useState("");
  const [notifPhone, setNotifPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ----- Effects -----
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
      setChatMessages(prev => [...prev, msg]);
      setNewMessage("");
    },
    [newMessage, currentUser]
  );

  // ----- Session control -----
  const startSession = useCallback(() => {
    if (!["instructor", "co-instructor"].includes(currentUser.role)) return;
    setSession(prev => ({ ...prev, status: "live", startTime: new Date().toISOString() }));
    setIsRecording(true);
  }, [currentUser]);

  const endSession = useCallback(() => {
    if (!["instructor", "co-instructor"].includes(currentUser.role)) return;
    setSession(prev => ({ ...prev, status: "ended" }));
    setIsRecording(false);
  }, [currentUser]);

  const joinSession = useCallback(() => {
    setParticipants(prev =>
      prev.map(p => (p.id === currentUser.id ? { ...p, isOnline: true } : p))
    );
  }, [currentUser]);

  // ----- Media toggles -----
  const toggleMute = useCallback(() => setIsMuted(v => !v), []);
  const toggleVideo = useCallback(() => setIsVideoOff(v => !v), []);
  const toggleHand = useCallback(() => setIsHandRaised(v => !v), []);

  // ----- Uploads -----
  const handleFileUpload = useCallback(async (file: File) => {
    console.log("Uploading file:", file.name);
  }, []);

  // ----- Derived data -----
  const onlineCount = useMemo(() => participants.filter(p => p.isOnline).length, [participants]);

  const scheduleSession = useCallback((isoDate: string) => {
    setSession(prev => ({ ...prev, startTime: isoDate, status: "scheduled" }));
    setIsSchedulerOpen(false);
  }, []);

  // ----- Subscription -----
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\+?\d{7,15}$/.test(phone);

  const handleSubscribe = useCallback(async () => {
    if (!notifEmail && !notifPhone) {
      setToast({ message: "Enter email or phone", type: "error" });
      return;
    }
    if (notifEmail && !isValidEmail(notifEmail)) {
      setToast({ message: "Invalid email", type: "error" });
      return;
    }
    if (notifPhone && !isValidPhone(notifPhone)) {
      setToast({ message: "Invalid phone number", type: "error" });
      return;
    }

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          email: notifEmail,
          phone: notifPhone,
        }),
      });
      setIsSubscribed(true);
      setNotifEmail("");
      setNotifPhone("");
      setToast({ message: "Subscription successful! You'll be notified.", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to subscribe. Try again later.", type: "error" });
    }

    setTimeout(() => setToast(null), 3000);
  }, [notifEmail, notifPhone, session.id]);

  // ----- Render -----
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/60 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{session.title}</h1>
            <p className="text-sm text-gray-300">{session.instructor} • {session.topic}</p>
            <p className="text-xs text-gray-400">
              {session.status === "live"
                ? `Live — started at ${session.startTime ? new Date(session.startTime).toLocaleTimeString() : ""}`
                : session.status === "scheduled" && session.startTime
                ? `Scheduled: ${new Date(session.startTime).toLocaleString()}`
                : "Not started yet"}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {session.status === "live" && <span className="px-3 py-1 rounded-full text-sm bg-red-600">🔴 LIVE</span>}
            <div className="text-sm text-gray-300">{onlineCount} online</div>

            {(currentUser.role === "instructor" || currentUser.role === "co-instructor") && (
              <div className="flex items-center space-x-2">
                {session.status !== "live" ? (
                  <button onClick={startSession} className="px-3 py-1 rounded bg-yellow-600 text-black font-medium">
                    Start Session
                  </button>
                ) : (
                  <button onClick={endSession} className="px-3 py-1 rounded bg-red-700 text-white font-medium">
                    End Session
                  </button>
                )}
                <button onClick={() => setIsSchedulerOpen(true)} className="px-3 py-1 rounded bg-gray-800">
                  Schedule
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Video + Controls */}
          <section className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-black rounded-lg overflow-hidden flex-1 relative border border-gray-800">
              {session.status === "live" ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Live video stream (provider SDK goes here)
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

                    {/* Subscription Form */}
                    <div className="mt-3 flex justify-center space-x-2">
                      <input
                        type="email"
                        placeholder="Email"
                        value={notifEmail}
                        onChange={e => setNotifEmail(e.target.value)}
                        className="px-2 py-1 rounded bg-gray-800 text-sm w-32"
                        disabled={isSubscribed}
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={notifPhone}
                        onChange={e => setNotifPhone(e.target.value)}
                        className="px-2 py-1 rounded bg-gray-800 text-sm w-28"
                        disabled={isSubscribed}
                      />
                      <button
                        onClick={handleSubscribe}
                        disabled={isSubscribed}
                        className="px-3 py-1 rounded bg-teal-600 text-sm"
                      >
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>

                    <button onClick={joinSession} className="mt-2 px-3 py-1 rounded bg-gray-800 text-sm">
                      Join Anyway
                    </button>
                  </div>
                </div>
              )}

              {/* PiP Instructor */}
              <div className="absolute bottom-4 right-4 w-52 h-36 rounded-lg bg-gray-900 border border-gray-700 overflow-hidden flex items-end">
                <img
                  src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs">{session.instructor}</div>
              </div>
            </div>

            {/* Media Controls */}
            <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={toggleMute} className={`px-3 py-2 rounded ${isMuted ? "bg-red-600" : "bg-gray-800"}`}>
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button onClick={toggleVideo} className={`px-3 py-2 rounded ${isVideoOff ? "bg-red-600" : "bg-gray-800"}`}>
                  {isVideoOff ? "Start Video" : "Stop Video"}
                </button>
                <button onClick={toggleHand} className={`px-3 py-2 rounded ${isHandRaised ? "bg-yellow-600 text-black" : "bg-gray-800"}`}>
                  {isHandRaised ? "Lower Hand" : "Raise Hand"}
                </button>
                <button onClick={() => setIsUploadsOpen(v => !v)} className="px-3 py-2 rounded bg-gray-800">Uploads</button>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-300">Recording: {isRecording ? "ON" : "OFF"}</div>
                <button onClick={() => setIsRecording(v => !v)} className="px-3 py-2 rounded bg-gray-800">Toggle Recording</button>
              </div>
            </div>
          </section>

          {/* Sidebar: Participants + Chat */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            {/* Participants */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Participants ({onlineCount})</h3>
                <button className="text-sm text-gray-400">Manage</button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {participants.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded bg-gray-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.isOnline ? "bg-green-400" : "bg-gray-600"}`} />
                      <div className="text-sm">{p.name}</div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded ${p.role === "instructor" ? "bg-teal-600 text-black" : "bg-gray-700 text-gray-200"}`}>
                      {p.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-gray-900 rounded-lg p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Chat</h3>
                <div className="text-xs text-gray-400">Live</div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-64">
                {chatMessages.map(m => (
                  <div key={m.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${m.isInstructor ? "text-teal-300" : "text-gray-300"}`}>{m.senderName}</span>
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
          </aside>
        </div>
      </main>

      {/* Scheduler & Uploads drawers omitted for brevity; same as previous code */}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white text-sm z-50`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
