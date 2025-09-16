'use client';

import { useState } from 'react';
import StockChart from '@/components/StockChart';
import StockSearch from '@/components/StockSearch';
import StockInfo from '@/components/StockInfo';

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Search for a stock to see its performance and details.</p>
        </div>
        <StockSearch onSymbolSelect={handleSymbolSelect} />
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Glassmorphism container for StockInfo */}
        <div className="bg-gray-400/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <StockInfo symbol={selectedSymbol} />
        </div>
        
        {/* Glassmorphism container for StockChart */}
        <div className="h-[500px] bg-gray-400/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <StockChart symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}
