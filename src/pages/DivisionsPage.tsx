import React, { memo } from 'react';
import { Brain, Tv, Wifi, Rocket, Shield, GraduationCap, Users, Building } from 'lucide-react';

const DivisionsPage = memo(() => {
  const divisions = [
    {
      icon: Brain,
      name: 'Software, AI & Robotics Lab',
      description: 'Build apps, SaaS tools, AI models, robotics, and embedded systems',
      color: 'from-blue-500 to-blue-600',
      services: ['Custom Software Development', 'AI/ML Solutions', 'Robotics Engineering', 'Mobile Applications', 'Web Platforms']
    },
    {
      icon: Tv,
      name: 'Media Studio & TUAN TV',
      description: 'Produce films, animations, digital campaigns, and run TUAN\'s broadcast arm',
      color: 'from-purple-500 to-purple-600',
      services: ['Film Production', 'Animation Studio', 'Digital Marketing', 'Broadcasting', 'Content Creation']
    },
    {
      icon: Wifi,
      name: 'Telecom & IoT Division',
      description: 'Create infrastructure for rural/urban access, IoT kits, and digital connectivity',
      color: 'from-green-500 to-green-600',
      services: ['Network Infrastructure', 'IoT Solutions', 'Rural Connectivity', 'Smart City Tech', 'Telecommunications']
    },
    {
      icon: Rocket,
      name: 'Aerospace & Embedded Systems',
      description: 'Develop satellites, UAVs, telemetry systems, and space tech pilots',
      color: 'from-red-500 to-red-600',
      services: ['Satellite Technology', 'UAV Development', 'Space Systems', 'Telemetry', 'Aerospace Engineering']
    },
    {
      icon: Shield,
      name: 'Cloud & Cybersecurity Unit',
      description: 'Offer secure cloud, blockchain tools, hosting, and analytics platforms',
      color: 'from-indigo-500 to-indigo-600',
      services: ['Cloud Infrastructure', 'Cybersecurity', 'Blockchain Solutions', 'Data Analytics', 'Secure Hosting']
    },
    {
      icon: GraduationCap,
      name: 'Digital Academy & Incubator',
      description: 'Train developers and creatives; incubate startups built on TUAN standards',
      color: 'from-yellow-500 to-yellow-600',
      services: ['Skills Training', 'Startup Incubation', 'Certification Programs', 'Mentorship', 'Innovation Labs']
    },
    {
      icon: Users,
      name: 'Strategy & Partnerships Office',
      description: 'Coordinate with governments, donors, and anchor enterprise growth',
      color: 'from-teal-500 to-teal-600',
      services: ['Strategic Planning', 'Government Relations', 'Partnership Development', 'Business Development', 'Policy Advocacy']
    },
    {
      icon: Building,
      name: 'Executive Office',
      description: 'Provide governance, finance, compliance, and brand direction',
      color: 'from-gray-500 to-gray-600',
      services: ['Corporate Governance', 'Financial Management', 'Legal Compliance', 'Brand Management', 'Executive Leadership']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Our Innovation Divisions</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              TUAN is proposed as a multi-division enterprise with each unit operating under a central 
              governance model. Together, these divisions provide complete, interoperable services 
              across Africa's digital stack.
            </p>
          </div>
        </div>
      </section>

      {/* Divisions Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className={`bg-gradient-to-r ${division.color} p-6`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white bg-opacity-30 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{division.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{division.description}</p>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Services:</h4>
                      <div className="space-y-2">
                        {division.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            <span className="text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coordination Model */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How Our Divisions Work Together</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our coordinated enterprise delivery model ensures seamless execution across all divisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🌳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We Build the Trunk. Partners Form the Branches.</h3>
              <p className="text-gray-600">TUAN departments lead their scope while partners form the branches, extending our reach.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🧑‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We Lead. Partners Deliver Under Us.</h3>
              <p className="text-gray-600">TUAN sets direction and maintains client communication while partners operate under our supervision.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⟳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We Coordinate, Not Compete</h3>
              <p className="text-gray-600">All divisions work together seamlessly, with clients seeing one unified TUAN brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Project */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Example: Digital Inclusion Initiative</h2>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto">
              When a ministry hires TUAN for a digital inclusion initiative, here's how our divisions collaborate:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Brain className="w-8 h-8 text-teal-400 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Software Division</h4>
                <p className="text-sm text-gray-600">Leads platform development with partner engineers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <GraduationCap className="w-8 h-8 text-orange-400 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Academy</h4>
                <p className="text-sm text-gray-600">Designs curriculum with regional training centers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Tv className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Media Studio</h4>
                <p className="text-sm text-gray-600">Leads content creation with production houses</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Wifi className="w-8 h-8 text-indigo-300 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Telecom Division</h4>
                <p className="text-sm text-gray-600">Manages infrastructure with licensed partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

DivisionsPage.displayName = 'DivisionsPage';

export default DivisionsPage;