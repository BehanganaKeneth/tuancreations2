import React, { useState, useCallback, memo, useMemo } from 'react';
import { Play, Users, Clock, Star, BookOpen, Award, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Memoized course card component
const CourseCard = memo(({ course, onEnroll }: { course: any; onEnroll: () => void }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-48 object-cover"
      loading="lazy"
    />
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
          {course.level}
        </span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4">by {course.instructor}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {course.duration}
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {course.students.toLocaleString()} students
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Next Session:</p>
        <p className="text-sm font-medium text-gray-600">{course.nextSession}</p>
      </div>
      <button 
        onClick={onEnroll}
        className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
      >
        Enroll Now
      </button>
    </div>
  </div>
));

CourseCard.displayName = 'CourseCard';

const LearningPlatform = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      'All',
      'Software & AI',
      'Media & Digital',
      'Telecom & IoT',
      'Cloud & Security',
      'Aerospace Tech'
    ],
    []
  );

  const courses = useMemo(
    () => [
      {
        id: 1,
        title: 'Advanced AI & Machine Learning for African Contexts',
        instructor: 'Eng. Godwin Ofwono and Eng. Cissyln Musiimenta',
        duration: '12 weeks',
        students: 1500,
        rating: 4.8,
        level: 'Advanced',
        category: 'Software & AI',
        image: 'https://images.pexels.com/photos/7375/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Oct 1, 2025'
      },
      {
        id: 2,
        title: 'Digital Content Creation & Media Production',
        instructor: 'Eng. Keneth Behangana',
        duration: '8 weeks',
        students: 950,
        rating: 4.7,
        level: 'Intermediate',
        category: 'Media & Digital',
        image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Sep 15, 2025'
      },
      {
        id: 3,
        title: 'IoT Solutions for Smart African Cities',
        instructor: 'Eng. Joshua Ssali',
        duration: '10 weeks',
        students: 720,
        rating: 4.9,
        level: 'Advanced',
        category: 'Telecom & IoT',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Nov 1, 2025'
      },
      {
        id: 4,
        title: 'Cybersecurity Fundamentals & Cloud Security',
        instructor: 'Eng. Gift Benson',
        duration: '8 weeks',
        students: 1100,
        rating: 4.6,
        level: 'Beginner',
        category: 'Cloud & Security',
        image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Nov 1, 2025'
      },
      {
        id: 5,
        title: 'Introduction to Aerospace Engineering & UAVs',
        instructor: 'Eng. Keneth Behangana',
        duration: '14 weeks',
        students: 580,
        rating: 4.9,
        level: 'Expert',
        category: 'Aerospace Tech',
        image: 'https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Jan 10, 2026'
      },
      {
        id: 6,
        title: 'Web and Mobile Apps Development',
        instructor: 'Dr. Irene Nakiyingi and Eng. Karim',
        duration: '14 weeks',
        students: 580,
        rating: 4.9,
        level: 'Expert',
        category: 'Software & AI',
        image: 'https://images.pexels.com/photos/7375/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400',
        nextSession: 'Starts Jan 10, 2026'
      }
    ],
    []
  );

  const filteredCourses = useMemo(
    () =>
      selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.category === selectedCategory),
    [selectedCategory, courses]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleStartLearningToday = useCallback(() => {
    navigate('/enrollment?type=student');
  }, [navigate]);

  const handleJoinLiveSession = useCallback(() => {
    navigate('/live-session');
  }, [navigate]);

  const handleEnrollInCourse = useCallback(() => {
    navigate('/enrollment?type=student');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">TUAN Digital Academy</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Empowering Africa's future leaders through world-class digital education, innovative learning experiences, and practical skills development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleStartLearningToday} className="bg-teal-500 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              Start Learning Today
            </button>
            <button onClick={handleJoinLiveSession} className="bg-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" />
              Join Live Session
            </button>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors border ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-teal-500 hover:border-teal-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses designed specifically for African professionals and entrepreneurs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnrollInCourse} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TUAN */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TUAN Digital Academy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We're committed to providing world-class education that's relevant, practical, and designed for African success.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
              icon: BookOpen, title: "Expert Instructors", desc: "Learn from industry leaders and renowned African experts."
            }, {
              icon: Globe, title: "Global Perspective", desc: "Gain insights into global trends with African context."
            }, {
              icon: Award, title: "Certified Programs", desc: "Earn recognized certifications that advance your career."
            }, {
              icon: Zap, title: "Practical Skills", desc: "Apply what you learn immediately in real-world scenarios."
            }].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-700 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of African professionals who are already building the skills for tomorrow's economy.
          </p>
          <button className="bg-teal-500 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
            Start Your Learning Journey
          </button>
        </div>
      </section>
    </div>
  );
});

LearningPlatform.displayName = 'LearningPlatform';

export default LearningPlatform;
