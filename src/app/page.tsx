import Recommendations from '@/components/Recommendations';
import ChartWrapper from '@/components/ChartWrapper';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          AI Trading Dashboard
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
          An educational dashboard displaying simulated market data and AI-driven stock picks.
          <span className="font-semibold text-yellow-400 block mt-2">This is not financial advice. All data is for demonstrative purposes only.</span>
        </p>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stock Chart (Main Column) */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 text-slate-100">S&P 500 (Simulated)</h2>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 min-h-[400px]">
            <ChartWrapper />
          </div>
        </div>

        {/* Recommendations (Sidebar) */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-4 text-slate-100">Simulated AI Picks</h2>
          <Recommendations />
        </div>

      </div>
    </div>
  );
}
