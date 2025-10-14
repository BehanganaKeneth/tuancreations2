import React from "react";

const TuanNewsPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "Empowering Africa’s Digital Future",
      excerpt:
        "TUAN Creations (Africa) LTD leads the way in uniting African tech enterprises for a shared digital economy.",
      image: "/images/africa-digital.jpg",
      date: "October 2025",
    },
    {
      id: 2,
      title: "Tech Innovations Across Africa",
      excerpt:
        "Discover how local startups are shaping industries and driving innovation from Kampala to Kigali.",
      image: "/images/innovation.jpg",
      date: "September 2025",
    },
    {
      id: 3,
      title: "The TUAN Marketplace Launch",
      excerpt:
        "A new online hub where African tech companies can showcase their products and connect with corporate clients.",
      image: "/images/marketplace.jpg",
      date: "August 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16">
      {/* === Page Header === */}
      <section className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          TUAN News &amp; Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Stories and insights from Africa&apos;s leading tech innovators and
          digital thinkers.
        </p>
      </section>

      {/* === Blog Posts === */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="shadow-lg rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-yellow-600 font-medium mb-1">
                {post.date}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <button className="text-yellow-700 font-semibold hover:underline">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TuanNewsPage;
