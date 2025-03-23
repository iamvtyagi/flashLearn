import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaBookOpen, FaRegCreditCard } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-purple-600' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Find a quiz"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 ml-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${isActive('/')} hover:text-purple-600 transition-colors duration-200`}
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/activity" 
              className={`flex items-center space-x-1 ${isActive('/activity')} hover:text-purple-600 transition-colors duration-200`}
            >
              <FaHistory className="text-xl" />
              <span>Activity</span>
            </Link>
            
            <Link 
              to="/classes" 
              className={`flex items-center space-x-1 ${isActive('/classes')} hover:text-purple-600 transition-colors duration-200`}
            >
              <FaBookOpen className="text-xl" />
              <span>Classes</span>
            </Link>
            
            <Link 
              to="/flashcards" 
              className={`flex items-center space-x-1 ${isActive('/flashcards')} hover:text-purple-600 transition-colors duration-200`}
            >
              <FaRegCreditCard className="text-xl" />
              <span>Flashcards</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
