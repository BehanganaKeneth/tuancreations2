import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DivisionsPage = React.lazy(() => import('./pages/DivisionsPage'));
const EnrollmentPage = React.lazy(() => import('./pages/EnrollmentPage'));
const LearningPlatform = React.lazy(() => import('./pages/LearningPlatform'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LiveSessionPage = React.lazy(() => import('./pages/LiveSessionPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/divisions" element={<DivisionsPage />} />
              <Route path="/enrollment" element={<EnrollmentPage />} />
              <Route path="/learning" element={<LearningPlatform />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/live-session" element={<LiveSessionPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;