import React, { useState } from "react";
import { Globe } from "lucide-react";

// Dummy data: upcoming live sessions
const upcomingSessions = [
  {
    id: 1,
    title: "Introduction to Data Structures",
    instructor: "Dr. John Kato",
    date: "2025-10-07",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Advanced Networking Class",
    instructor: "Eng. Behangana Keneth",
    date: "2025-10-08",
    time: "2:00 PM",
  },
  {
    id: 3,
    title: "AI and Machine Learning Basics",
    instructor: "Prof. Sarah Namusoke",
    date: "2025-10-10",
    time: "9:00 AM",
  },
];

// List of countries with dial codes
const countryCodes = [
  { code: "+256", country: "Uganda" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+250", country: "Rwanda" },
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+27", country: "South Africa" },
];

const LiveClassPage: React.FC = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+256");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      // You can connect this to a real backend later
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage("✅ Subscription successful! You’ll be notified when the next session starts.");
      setEmail("");
      setPhone("");
    } catch (err) {
      setMessage("⚠️ Something went wrong. Try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">🎥 Live Classes</h1>
      <p className="text-gray-300 mb-8">
        Attend live lectures directly on this platform. Subscribe to get instant notifications when a session starts.
      </p>

      {/* Next Live Sessions */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-teal-400">📅 Upcoming Live Sessions</h2>

        {upcomingSessions.length > 0 ? (
          <ul className="space-y-3">
            {upcomingSessions.map((session) => (
              <li
                key={session.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{session.title}</h3>
                  <p className="text-sm text-gray-300">
                    By <span className="text-teal-400">{session.instructor}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {session.date} at {session.time}
                  </p>
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded-lg text-sm">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No upcoming sessions yet.</p>
        )}
      </div>

      {/* Subscribe Button */}
      <button
        onClick={() => setIsSubscribeOpen(true)}
        className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg flex items-center space-x-2"
      >
        <Globe className="w-5 h-5" />
        <span>Subscribe for Notifications</span>
      </button>

      {/* Subscription Modal */}
      {isSubscribeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Subscribe for Notifications</h2>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

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
                    placeholder="712345678"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {message && <p className="text-sm text-gray-300">{message}</p>}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsSubscribeOpen(false)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassPage;
