import React, { useState, useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Building, GraduationCap, Briefcase, CheckCircle } from 'lucide-react';

const EnrollmentPage = memo(() => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'investor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    experience: '',
    interests: '',
    investment: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const enrollmentTypes = [
    {
      id: 'investor',
      title: 'Become an Investor',
      icon: Building,
      description: 'Join us as a co-founder or shareholder in building Africa\'s digital future',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'partner',
      title: 'Partner with Us',
      icon: Users,
      description: 'Become a trusted partner in our ecosystem-led delivery model',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'student',
      title: 'Join as Student',
      icon: GraduationCap,
      description: 'Enroll in our Digital Academy and learn cutting-edge technology skills',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'client',
      title: 'Hire Our Services',
      icon: Briefcase,
      description: 'Engage TUAN for your digital transformation and innovation needs',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = `TUAN Creations Application - ${enrollmentTypes.find(t => t.id === selectedType)?.title}`;
    const body = `
Application Type: ${enrollmentTypes.find(t => t.id === selectedType)?.title}

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Organization: ${formData.organization}
Experience: ${formData.experience}
Interests: ${formData.interests}
Investment: ${formData.investment}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:tuancreations.africa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    setIsSubmitted(true);
  }, [formData, selectedType, enrollmentTypes]);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      country: '',
      experience: '',
      interests: '',
      investment: '',
      message: ''
    });
  }, []);

  const getFormFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </>
    );

    switch (selectedType) {
      case 'investor':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Company</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Interest</label>
              <select
                name="investment"
                value={formData.investment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select investment type</option>
                <option value="seed">Seed Investment ($10K - $100K)</option>
                <option value="series-a">Series A ($100K - $1M)</option>
                <option value="series-b">Series B ($1M+)</option>
                <option value="strategic">Strategic Partnership</option>
                <option value="co-founder">Co-Founder Equity</option>
              </select>
            </div>
          </>
        );
      case 'partner':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Company *</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
              <select
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select your expertise</option>
                <option value="software">Software Development</option>
                <option value="media">Media & Content Production</option>
                <option value="telecom">Telecommunications & IoT</option>
                <option value="aerospace">Aerospace & Engineering</option>
                <option value="cybersecurity">Cybersecurity & Cloud</option>
                <option value="education">Education & Training</option>
              </select>
            </div>
          </>
        );
      case 'student':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Education/Experience Level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner (No prior experience)</option>
                <option value="intermediate">Intermediate (Some experience)</option>
                <option value="advanced">Advanced (Professional experience)</option>
                <option value="expert">Expert (Industry leader)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Learning Interests</label>
              <select
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select your interests</option>
                <option value="ai-ml">AI & Machine Learning</option>
                <option value="software-dev">Software Development</option>
                <option value="robotics">Robotics & IoT</option>
                <option value="media-production">Media Production</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="aerospace">Aerospace Engineering</option>
              </select>
            </div>
          </>
        );
      case 'client':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Company *</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
              <select
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select service needed</option>
                <option value="software">Custom Software Development</option>
                <option value="ai">AI & Automation Solutions</option>
                <option value="media">Media Production & Marketing</option>
                <option value="infrastructure">Digital Infrastructure</option>
                <option value="training">Corporate Training</option>
                <option value="consulting">Strategic Consulting</option>
              </select>
            </div>
          </>
        );
      default:
        return commonFields;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in TUAN Creations. We'll review your application and get back to you within 48 hours.
          </p>
          <button
            onClick={resetForm}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Join TUAN Creations</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're an investor, partner, student, or client, there's a place for you 
              in building Africa's digital future.
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Types */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {enrollmentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-6 rounded-xl text-left transition-all ${
                    selectedType === type.id
                      ? 'bg-white shadow-lg ring-2 ring-teal-500'
                      : 'bg-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              );
            })}
          </div>

          {/* Enrollment Form */}
          <div className="max-w-3xl mx-auto bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {enrollmentTypes.find(t => t.id === selectedType)?.title}
                </h2>
                <p className="text-gray-600">
                  {enrollmentTypes.find(t => t.id === selectedType)?.description}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {getFormFields()}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Tell us more about your interest in TUAN Creations..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

EnrollmentPage.displayName = 'EnrollmentPage';

export default EnrollmentPage;