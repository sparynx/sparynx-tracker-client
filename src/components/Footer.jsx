import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link to="/" className="flex items-center justify-center md:justify-start mb-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Sparynx BudgetTracker</span>
          </Link>
          <p className="text-gray-400">Your trusted partner in transactions.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
          <Link to="/" className="hover:underline text-gray-400">Home</Link>
          <Link to="/contact" className="hover:underline text-gray-400">Contact</Link>
          <Link to="/about" className="hover:underline text-gray-400">About</Link>
          <Link to="/privacy" className="hover:underline text-gray-400">Privacy Policy</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0 justify-center md:justify-start">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-4">
        &copy; {new Date().getFullYear()} Sparynx BudgetTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;