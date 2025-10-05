import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Globe } from "lucide-react";

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
  // ----- demo/local state -----
  const [currentUser, setCurrentUser] = useState<User>({
    id: "u-you",
    name: "You",
    role: "student",
    isOnline: true,
  });

  const [session, setSession] = useState<SessionMeta>({
    id: "s-1",
    title: "Advanced AI & Machine Learning",
    instructor: "Eng. Godwin Ofwono",
    topic: "Neural Networks and Deep Learning",
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

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // ----- Notification subscription -----
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<{ label: string; value: string } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const countries = useMemo(() => countryList().getData(), []);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const subscribeNotifications = useCallback(() => {
    if (!email || !phoneNumber || !countryCode) {
      showToast("error", "Please fill all fields");
      return;
    }

    console.log({ email, phone: `${countryCode.value}${phoneNumber}` });
    setSubscribed(true);
    showToast("success", "Subscribed for live notifications!");
  }, [email, phoneNumber, countryCode, showToast]);

  // ----- Chat -----
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
      setChatMessages((prev) => [...prev, msg]);
      setNewMessage("");
    },
    [newMessage, currentUser]
  );

  // ----- Toggle media -----
  const toggleMute = useCallback(() => setIsMuted((v) => !v), []);
  const toggleVideo = useCallback(() => setIsVideoOff((v) => !v), []);
  const toggleHand = useCallback(() => setIsHandRaised((v) => !v), []);

  // ----- UI derived -----
  const onlineCount = useMemo(() => participants.filter((p) => p.isOnline).length, [participants]);

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
            <span className="px-3 py-1 rounded-full text-sm bg-red-600">🔴 LIVE</span>
            <div className="text-sm text-gray-300">{onlineCount} online</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Video + Controls */}
          <section className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-black rounded-lg overflow-hidden flex-1 relative border border-gray-800 flex items-center justify-center text-gray-400 max-h-[60vh] lg:max-h-[65vh]">
              {session.status === "live" ? (
                <p>Live video stream (provider SDK goes here)</p>
              ) : (
                <div className="text-center">
                  <p className="mb-2">Session is not live yet.</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className={`px-3 py-2 rounded ${isMuted ? "bg-red-600" : "bg-gray-800"}`}
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`px-3 py-2 rounded ${isVideoOff ? "bg-red-600" : "bg-gray-800"}`}
                >
                  {isVideoOff ? "Start Video" : "Stop Video"}
                </button>
                <button
                  onClick={toggleHand}
                  className={`px-3 py-2 rounded ${isHandRaised ? "bg-yellow-600 text-black" : "bg-gray-800"}`}
                >
                  {isHandRaised ? "Lower Hand" : "Raise Hand"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-300">Recording: {isRecording ? "ON" : "OFF"}</div>
                <button onClick={() => setIsRecording((v) => !v)} className="px-3 py-2 rounded bg-gray-800">
                  Toggle Recording
                </button>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-4">
            {/* Participants */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Participants ({onlineCount})</h3>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded bg-gray-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.isOnline ? "bg-green-400" : "bg-gray-600"}`} />
                      <div className="text-sm">{p.name}</div>
                    </div>
                    <div
                      className={`text-xs px-2 py-0.5 rounded ${
                        p.role === "instructor" ? "bg-teal-600 text-black" : "bg-gray-700 text-gray-200"
                      }`}
                    >
                      {p.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-gray-900 rounded-lg p-4 flex-1 flex flex-col">
              <h3 className="font-semibold mb-2">Chat</h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-48">
                {chatMessages.map((m) => (
                  <div key={m.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${m.isInstructor ? "text-teal-300" : "text-gray-300"}`}>
                        {m.senderName}
                      </span>
                      <span className="text-xs text-gray-500">{m.time}</span>
                    </div>
                    <div className="pl-2 border-l-2 border-gray-700 text-gray-200">{m.text}</div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={sendChat} className="flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none"
                />
                <button type="submit" className="px-3 py-2 rounded bg-teal-600">
                  Send
                </button>
              </form>
            </div>

            {/* Notification Subscription */}
            {!subscribed && (
              <div className="bg-gray-900 rounded-lg p-3 flex flex-col gap-2">
                <h4 className="text-sm font-semibold mb-2">Subscribe for Live Notifications</h4>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none mb-2"
                />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select
                      options={countries}
                      value={countryCode}
                      onChange={(value) => setCountryCode(value)}
                      placeholder={
                        <div className="flex items-center gap-1">
                          <Globe size={14} /> Country
                        </div>
                      }
                      className="text-black"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <button onClick={subscribeNotifications} className="px-3 py-2 rounded bg-teal-600 mt-2">
                  Subscribe
                </button>
              </div>
            )}

            {/* Toast */}
            {toast && (
              <div
                className={`fixed bottom-4 right-4 px-4 py-2 rounded ${
                  toast.type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {toast.message}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
