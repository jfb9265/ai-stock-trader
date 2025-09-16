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
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 lg:p-12 bg-slate-900 text-white">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">AI Stock Trader</h1>
          <StockSearch onSymbolSelect={handleSymbolSelect} />
        </header>

        {/* Main Content */}
        <div className="w-full space-y-8">
          <StockInfo symbol={selectedSymbol} />
          <div className="h-[400px] md:h-[500px] bg-slate-800 rounded-lg shadow-md p-4">
            <StockChart symbol={selectedSymbol} />
          </div>
        </div>

      </div>
    </main>
  );
}
