
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm text-slate-100 p-4 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-green-400 transition-colors">AI Stock Trader</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/roadmap" className="hover:text-green-400 transition-colors">Roadmap</Link>
          <Link href="/portfolio" className="hover:text-green-400 transition-colors">Portfolio</Link>
          <Link href="/tech-stack" className="hover:text-green-400 transition-colors">Tech Stack</Link>
          <Link href="/disclaimers" className="hover:text-green-400 transition-colors">Disclaimers</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
