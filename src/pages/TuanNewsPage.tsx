import React from "react";

const TuanNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          TUAN News &amp; Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Stories and insights from Africa&apos;s leading tech innovators and
          change-makers.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Example article card */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?africa,technology"
            alt="Article"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h2 className="text-xl font-semibold mb-2">
              The Rise of African Tech Startups
            </h2>
            <p className="text-gray-600 text-sm">
              Exploring how young innovators are transforming the continent’s
              digital future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuanNewsPage;
