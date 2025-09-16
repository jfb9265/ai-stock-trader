
'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm text-slate-100 p-4 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-green-400 transition-colors">AI Stock Trader</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="hover:text-green-400 transition-colors flex items-center">
              Recommendations
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-10">
                <Link href="/recommendations/high-growth" className="block px-4 py-2 text-sm hover:bg-slate-700">High-Growth</Link>
                <Link href="/recommendations/stable" className="block px-4 py-2 text-sm hover:bg-slate-700">Stable Blue-Chip</Link>
              </div>
            )}
          </div>
          <Link href="/roadmap" className="hover:text-green-400 transition-colors">Roadmap</Link>
          <Link href="/portfolio" className="hover:text-green-400 transition-colors">Portfolio</Link>
          <Link href="/tech-stack" className="hover:text-green-400 transition-colors">Tech Stack</Link>
          <Link href="/disclaimers" className="hover:text-green-400 transition-colors">Disclaimers</Link>
        </div>

        {/* Mobile Menu (basic setup) */}
        <div className="md:hidden">
          {/* A simple placeholder for a mobile menu button */}
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
