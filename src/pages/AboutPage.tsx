import React, { memo } from 'react';
import { Target, Eye, Lightbulb, Users, Globe, Rocket } from 'lucide-react';

const AboutPage = memo(() => {
  const problems = [
    { icon: Globe, title: 'Fragmented Infrastructure', description: 'No unified digital ecosystem connecting stakeholders' },
    { icon: Users, title: 'Limited Tools & Access', description: 'Talented youths and entrepreneurs lack access to professional software, innovation labs, and connectivity' },
    { icon: Lightbulb, title: 'Under-supported Talent', description: 'Creatives and developers have skills, but no enterprise to nurture or scale them' },
    { icon: Rocket, title: 'Neglected Frontier Tech', description: 'Robotics, aerospace, AI, and chip design are underrepresented in African markets' },
    { icon: Globe, title: 'Dependence on Foreign Tech', description: 'From infrastructure to apps to media, African IP remains rare and undervalued' },
  ];

  const differentiators = [
    'We create African IP, not replicas of foreign models',
    'We deliver interconnected infrastructure, not siloed services',
    'We are building a Pan-African digital force — structured, scalable, and African-led'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">About TUAN Creations</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              TUAN Creations (Africa) LTD (TUAN = The United African Nation) is envisioned as a Pan-African ICT 
              innovation enterprise designed to unify and transform the continent's fragmented digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Identity: Who We Intend to Be</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Driven by a bold vision, TUAN is positioned to be:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-indigo-600 rounded-xl">
              <Target className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Solutions Engine</h3>
              <p className="text-indigo-100">Building scalable African technology products</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <Lightbulb className="w-16 h-16 text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure Builder</h3>
              <p className="text-gray-600">Creating digital tools, education platforms, and innovation hubs</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <Rocket className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation Powerhouse</h3>
              <p className="text-gray-600">Driving continental innovation with Africa-first growth strategies</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We are not a freelance platform or gig economy tool. TUAN is a full-scale enterprise, committed to delivery, leadership, and transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Eye className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-lg text-gray-700">
                To be the strategic hub of Africa's digital economy and transformation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Target className="w-12 h-12 text-teal-500 mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-lg text-gray-700">
                To uncover Africa's digital potential by building innovation capacity, connecting 
                ecosystems, and delivering Africa-first solutions in software, media, telecommunications, 
                aerospace, education, and the creative economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We're Solving */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problems We're Solving</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Africa faces critical digital development gaps that TUAN is uniquely positioned to address.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h4>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Business Model</h2>
            <p className="text-2xl text-white font-semibold mb-4">Ecosystem-Led, Platform-Driven</p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              TUAN will be the trunk. Our trusted partners will be the branches.
            </p>
          </div>
          
          <div className="bg-indigo-800 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Strategic Control</h4>
                <p className="text-gray-300">We maintain quality, IP, and strategic direction</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Ecosystem Development</h4>
                <p className="text-gray-300">Partners grow under TUAN's guidance and standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Scalable Delivery</h4>
                <p className="text-gray-300">Africa-led, structured, and accountable innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why TUAN Creations (Africa) LTD Is Different</h2>
          </div>
          
          <div className="space-y-6">
            {differentiators.map((point, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-indigo-600 rounded-xl">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-lg text-indigo-100 font-medium">{point}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-gray-900">
              We are TUAN — The United African Nation in Innovation. And we are here to lead.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
