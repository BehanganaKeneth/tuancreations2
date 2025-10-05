import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { X } from "lucide-react";

const LiveSessionPage: React.FC = () => {
  const [sessionLive, setSessionLive] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showSubscribeBox, setShowSubscribeBox] = useState(true);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // 🕓 Example: next session 10 minutes from now
  const nextSessionTime = new Date(Date.now() + 10 * 60 * 1000);

  // ⏳ Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextSessionTime.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setCountdown("Session is LIVE");
        setSessionLive(true);
        setShowSubscribeBox(false);
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countryOptions = countryList().getData();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally send data to backend (Laravel/Django)
    console.log({
      email,
      phone: `${countryCode?.value || ""}${phone}`,
    });
    setEmail("");
    setPhone("");
    setCountryCode(null);
    alert("✅ Subscribed for notifications!");
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 🎥 Video Area */}
      <div className="absolute top-0 left-0 w-full h-full">
        {sessionLive ? (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Live Session"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-semibold mb-2">Next Session Starts In</h2>
            <p className="text-3xl font-bold">{countdown}</p>
          </div>
        )}
      </div>

      {/* 📨 Subscribe Box (Overlay) */}
      {!sessionLive && showSubscribeBox && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-xl shadow-lg w-11/12 max-w-md p-5 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Subscribe for Notifications
            </h3>
            <button
              onClick={() => setShowSubscribeBox(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />

            <div className="flex space-x-2">
              <div className="w-2/5">
                <Select
                  options={countryOptions}
                  value={countryCode}
                  onChange={setCountryCode}
                  placeholder="Code"
                  className="text-sm"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-3/5 px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveSessionPage;
