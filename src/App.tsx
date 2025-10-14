import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./bright-gold"; // 🎨 Bright Gold Theme Layout

// ✅ Lazy load all pages for performance
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const DivisionsPage = React.lazy(() => import("./pages/DivisionsPage"));
const EnrollmentPage = React.lazy(() => import("./pages/EnrollmentPage"));
const LearningPlatform = React.lazy(() => import("./pages/LearningPlatform"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const LiveSessionPage = React.lazy(() => import("./pages/LiveSessionPage"));
const TUANMarketPlacePage = React.lazy(() => import("./pages/TUANMarketPlacePage"));
const TuanNewsPage = React.lazy(() => import("./pages/TuanNewsPage"));

// ✅ Loading placeholder (used during lazy load)
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
      <p className="text-gray-700 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* 🔹 Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/enrollment" element={<EnrollmentPage />} />
            <Route path="/learning" element={<LearningPlatform />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 🔹 Live Sessions */}
            <Route path="/live-session" element={<LiveSessionPage />} />

            {/* 🔹 TUAN Platform Extensions */}
            <Route path="/tuan-market-place" element={<TUANMarketPlacePage />} />
            <Route path="/news" element={<TuanNewsPage />} />

            {/* Optional: 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  <h1 className="text-3xl font-bold text-gray-700">
                    404 — Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
