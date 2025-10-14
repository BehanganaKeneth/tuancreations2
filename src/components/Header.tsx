import React, { useState, useCallback, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Users, BookOpen, Mail, ShoppingBag } from "lucide-react";
import { theme } from "../bright-gold/theme"; // 🎨 Import Bright Gold theme

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // ✅ Updated navigation links — added MarketPlace
  const navigation = [
    { name: "Home", href: "/", icon: Globe },
    { name: "About", href: "/about", icon: Users },
    { name: "Divisions/Services", href: "/divisions", icon: Globe },
    { name: "Enrollment", href: "/enrollment", icon: Users },
    { name: "Learning Platform", href: "/learning", icon: BookOpen },
    { name: "TUAN MarketPlace", href: "/tuan-market-place", icon: ShoppingBag },
    { name: "News / Blog", href: "/news", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  // Reusable NavLinks component
  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navigation.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          to={href}
          onClick={onClick}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            location.pathname === href
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-900 hover:bg-teal-600 hover:text-white"
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{name}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
      }}
      className="shadow-md sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center mr-8">
            <img
              src="/logo-black.png"
              alt="TUAN Logo"
              className="h-14 w-auto mr-3"
            />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              TUAN Creations (Africa) LTD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-md hover:bg-teal-600 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slideDown">
            <nav className="flex flex-col space-y-2">
              <NavLinks onClick={closeMenu} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
