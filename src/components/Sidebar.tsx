'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A simple icon component for demonstration
const Icon = ({ path, className }: { path: string; className?: string }) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const navLinks = {
  main: [
    { name: 'Dashboard', href: '/', iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  ],
  recommendations: [
    { name: 'High-Risk / High-Reward', href: '/recommendations/high-growth', iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { name: 'Stable Blue-Chip', href: '/recommendations/stable', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ],
  project: [
    { name: 'Roadmap', href: '/roadmap', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Tech Stack', href: '/tech-stack', iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Disclaimers', href: '/disclaimers', iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  ]
};

const Sidebar = () => {
  const pathname = usePathname();

  const NavGroup = ({ title, links }: { title: string; links: typeof navLinks.main }) => (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">{title}</h2>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link key={link.name} href={link.href}>
            <span className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}>
              <Icon path={link.iconPath} className="w-5 h-5 mr-3" />
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 flex-shrink-0 p-4">
      <div className="h-full flex flex-col gap-y-6 bg-gray-400/10 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
        <div className="flex items-center px-4">
          <Icon path="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" className="w-8 h-8 text-emerald-400" />
          <h1 className="text-xl font-bold text-white ml-2">AI Trader</h1>
        </div>
        <nav className="flex flex-col gap-y-6">
          <NavGroup title="Menu" links={navLinks.main} />
          <NavGroup title="AI Recommendations" links={navLinks.recommendations} />
          <NavGroup title="Project Info" links={navLinks.project} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
