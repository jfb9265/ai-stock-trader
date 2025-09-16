'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Tech Stack', href: '/tech-stack' },
    { name: 'Disclaimers', href: '/disclaimers' },
  ];

  return (
    <nav className="bg-gray-900 text-gray-300 py-4 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-serif font-bold text-accent tracking-wide">
          AI Stock Trader
        </Link>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`text-sm uppercase tracking-wider hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>
                {item.name}
              </Link>
            );
          })}

          {/* Recommendations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`text-sm uppercase tracking-wider hover:text-accent transition-colors flex items-center ${isDropdownOpen || pathname.startsWith('/recommendations') ? 'text-accent' : ''}`}>
              Recommendations
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
                <Link href="/recommendations/high-growth" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-accent">
                  High-Risk / High-Reward
                </Link>
                <Link href="/recommendations/stable" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-accent">
                  Stable Blue-Chip
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
