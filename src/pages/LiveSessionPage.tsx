import React, { useState } from "react";

const LiveSessionPage: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isUploadsOpen, setIsUploadsOpen] = useState(false);

  const validateInputs = () => {
    if (!email || !phone) {
      setError("Please enter both email and phone number.");
      return false;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^\d{9,15}$/.test(phone);
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!phoneValid) {
      setError("Please enter a valid phone number (9–15 digits).");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubscribe = () => {
    if (validateInputs()) {
      setIsSubscribed(true);
      setTimeout(() => setIsModalOpen(false), 1000);
    }
  };

  const scheduleSession = (time: string) => {
    console.log("Session scheduled at:", time);
    setIsSchedulerOpen(false);
  };

  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file.name);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">🎥 Live Session Dashboard</h1>

      {/* Subscribe Section */}
      <div className="flex items-center gap-4">
        {!isSubscribed ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold transition-all"
          >
            Subscribe
          </button>
        ) : (
          <button
            disabled
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            ✅ Subscribed
          </button>
        )}

        <button
          onClick={() => setIsSchedulerOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Schedule
        </button>

        <button
          onClick={() => setIsUploadsOpen(true)}
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg"
        >
          Uploads
        </button>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Subscribe to Updates
            </h2>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold mb-3 text-yellow-400">Schedule Session</h3>
            <label className="text-xs text-gray-400">Start time</label>
            <input
              type="datetime-local"
              className="w-full bg-gray-800 rounded px-3 py-2 mb-4 text-white"
              id="sched-input"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsSchedulerOpen(false)}
                className="px-3 py-1 rounded bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = (
                    document.getElementById("sched-input") as HTMLInputElement | null
                  )?.value;
                  if (input) scheduleSession(new Date(input).toISOString());
                }}
                className="px-3 py-1 rounded bg-yellow-500 text-black font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploads Drawer */}
      {isUploadsOpen && (
        <div className="fixed right-4 bottom-4 w-80 bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl">
          <h4 className="font-semibold mb-2 text-yellow-400">Upload Files</h4>
          <input
            type="file"
            className="mb-2 text-sm"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <p className="text-xs text-gray-400 mb-3">
            Upload slides, notes, or resources for this session.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsUploadsOpen(false)}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessionPage;
