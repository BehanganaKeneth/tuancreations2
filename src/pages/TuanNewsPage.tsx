import React from "react";
import { Link } from "react-router-dom";

const TuanNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      {/* 🔹 Top Section: TUAN Online TV CTA */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          TUAN OnlineTV 🎥
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Catch our live sessions, news highlights, and inspiring interviews with
          Africa&apos;s innovators and changemakers.
        </p>

        {/* ✅ Prominent Live Button */}
        <Link
          to="/tuan-live"
          className="inline-flex items-center px-8 py-4 rounded-full bg-yellow-500 text-black font-semibold text-lg shadow-md hover:bg-yellow-400 transition-all duration-300"
        >
          🔴 Join Us Live on TUAN OnlineTV
        </Link>
      </div>

      {/* 🔹 Divider */}
      <div className="max-w-6xl mx-auto border-t border-gray-200 mb-12"></div>

      {/* 🔹 News & Blog Section */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          TUAN News &amp; Blog
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, stories, and updates from Africa&apos;s tech, innovation, and leadership frontlines.
        </p>
      </div>

      {/* 🔹 Article Cards */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Article 1 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?africa,technology"
            alt="Article"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-2">
              The Rise of African Tech Startups
            </h3>
            <p className="text-gray-600 text-sm">
              Exploring how young innovators are transforming the continent’s
              digital future.
            </p>
          </div>
        </div>

        {/* Article 2 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?africa,innovation"
            alt="Article"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-2">
              Creative Solutions for African Challenges
            </h3>
            <p className="text-gray-600 text-sm">
              From sustainable tech to community-driven startups, see what’s next.
            </p>
          </div>
        </div>

        {/* Article 3 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?uganda,entrepreneurship"
            alt="Article"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold mb-2">
              Uganda’s Youth Entrepreneurs Changing the Game
            </h3>
            <p className="text-gray-600 text-sm">
              How young minds are redefining leadership and digital transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuanNewsPage;
