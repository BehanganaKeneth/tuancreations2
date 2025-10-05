import React, { useState } from "react";
import { User, Clock, Globe } from "lucide-react";

const countryCodes = [
  { code: "+256", country: "Uganda" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+250", country: "Rwanda" },
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+27", country: "South Africa" },
];

interface Lecture {
  isLive: boolean;
  title: string;
  instructor: string;
  startTime?: string;
}

interface UpcomingSession {
  title: string;
  instructor: string;
  startTime: string;
}

interface Props {
  lectureDetails: Lecture;
  upcomingSessions?: UpcomingSession[];
}

const LiveSessionPage: React.FC<Props> = ({
  lectureDetails,
  upcomingSessions = [],
}) => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+256");
  const [message, setMessage] = useState("");
  const [selectedSession, setSelectedSession] = useState<string>("Next Live Session");
  const [loading, setLoading] = useState(false);

  // Handle subscribe form
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: `${countryCode}${phone}`,
          session: selectedSession,
        }),
      });

      if (response.ok) {
        setMessage("✅ Subscribed successfully! You’ll get a notification before the session starts.");
        setEmail("");
        setPhone("");
      } else {
        setMessage("❌ Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("⚠️ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Current Session Section */}
      <section className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold">{lectureDetails.title}</h1>
        <p className="text-gray-300 mt-1">
          Instructor: <span className="font-semibold text-teal-400">{lectureDetails.instructor}</span>
        </p>

        {lectureDetails.isLive ? (
          <div className="mt-3 text-red-500 font-semibold">🔴 Currently Live</div>
        ) : (
          <div className="mt-3 text-gray-400">No live session right now.</div>
        )}

        {!lectureDetails.isLive && (
          <button
            onClick={() => {
              setSelectedSession("Next Live Session");
              setIsSubscribeOpen(true);
            }}
            className="mt-6 bg-teal-600 hover:bg-teal-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Subscribe for Next Session
          </button>
        )}
      </section>

      {/* Upcoming Sessions Section */}
      {!lectureDetails.isLive && upcomingSessions.length > 0 && (
        <section className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">📅 Upcoming Live Sessions</h2>

          <div className="space-y-4">
            {upcomingSessions.map((session, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-700 p-4 rounded-xl"
              >
                <div>
                  <h3 className="font-bold text-lg">{session.title}</h3>
                  <p className="text-gray-300 flex items-center mt-1">
                    <User className="w-4 h-4 mr-2" />
                    {session.instructor}
                  </p>
                  <p className="text-gray-400 flex items-center mt-1 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(session.startTime).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedSession(session.title);
                    setIsSubscribeOpen(true);
                  }}
                  className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Notify Me
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subscription Modal */}
      {isSubscribeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              Subscribe for <span className="text-teal-400">{selectedSession}</span>
            </h2>

            <form onSubmit={handleSubscribe} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                <div className="flex space-x-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-2 text-sm text-white"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} ({c.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="712345678"
                  />
                </div>
              </div>

              {/* Message */}
              {message && (
                <p className="text-sm text-gray-300 mt-2">{message}</p>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsSubscribeOpen(false)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessionPage;
