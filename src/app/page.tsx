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
          <h1 className="text-4xl font-serif font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Explore real-time stock data and insights.</p>
        </div>
        <StockSearch onSymbolSelect={handleSymbolSelect} />
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Container for StockInfo */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <StockInfo symbol={selectedSymbol} />
        </div>
        
        {/* Container for StockChart */}
        <div className="h-[500px] bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <StockChart symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}
