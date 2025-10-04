import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = memo(() => {
  return (
    <footer className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <img src="/logo-black copy.png" alt="TUAN Creations Inc. Logo" className="h-16 w-auto mb-4" />
            <p className="text-gray-300 mb-4 max-w-md">
              Building the United African Nation in Technology. A Pan-African ICT innovation 
              enterprise designed to unify and transform the continent's digital economy.
            </p>
            <p className="text-teal-400 font-semibold">"Africa Inspired!"</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/divisions" className="text-gray-300 hover:text-teal-400 transition-colors">Our Divisions</Link></li>
              <li><Link to="/enrollment" className="text-gray-300 hover:text-teal-400 transition-colors">Join Us</Link></li>
              <li><Link to="/learning" className="text-gray-300 hover:text-teal-400 transition-colors">Learning Platform</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300">tuancreations.africa@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300">+256 753 414 058</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300">Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300">Pan-African Operations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 TUAN Creations (Africa) LTD. All rights reserved. Building Africa's Digital Future Together!.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
