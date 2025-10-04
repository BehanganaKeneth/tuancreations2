import React, { useState, useCallback, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Users, BookOpen, Mail } from 'lucide-react';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Divisions', href: '/divisions', icon: Globe },
    { name: 'Enrollment', href: '/enrollment', icon: Users },
    { name: 'Learning Platform', href: '/learning', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  // Reusable navigation link list
  const NavLinks = ({ onClick }) => (
    <>
      {navigation.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          to={href}
          onClick={onClick}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname.startsWith(href)
              ? 'bg-teal-500 text-white'
              : 'text-indigo-100 hover:bg-teal-500 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{name}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <Link to="/" className="flex items-center mr-8">
            <img 
              src="/logo-black copy copy.png" 
              alt="TUAN Logo" 
              className="h-16 w-auto mr-3"
            />
            <span className="text-2xl font-bold text-white">
              TUAN Creations (Africa) LTD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-md hover:bg-teal-500"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <NavLinks onClick={closeMenu} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
