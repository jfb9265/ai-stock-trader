'use client';

import React from 'react';

// --- THIS IS ALL SIMULATED DATA FOR EDUCATIONAL PURPOSES ---
const blueChipStocks = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 172.25, rating: 'Hold', analysis: 'Strong market position, but facing regulatory headwinds. Neutral short-term outlook.' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: 427.56, rating: 'Buy', analysis: 'Consistent growth in cloud and AI sectors. Positive earnings forecast.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 177.89, rating: 'Buy', analysis: 'Dominant in search and advertising. Expanding AI capabilities create new opportunities.' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 942.89, rating: 'Buy', analysis: 'Leading the AI hardware market. High demand for GPUs expected to continue.' },
];

const speculativeStocks = [
  { ticker: 'QLAI', name: 'QuantumLeap AI (Fictional)', price: 15.78, rating: 'Speculative Buy', analysis: 'High-risk, high-reward play in the quantum computing space. Potential for exponential growth.' },
  { ticker: 'BSGN', name: 'BioSynth Genetics (Fictional)', price: 25.41, rating: 'Speculative Buy', analysis: 'Promising results in early trials for gene-editing technology. Volatility is expected.' },
  { ticker: 'NGDR', name: 'NextGen Drones (Fictional)', price: 8.92, rating: 'Hold', analysis: 'Innovative drone delivery tech, but facing stiff competition and regulatory hurdles.' },
];

const StockCard = ({ stock }: { stock: typeof blueChipStocks[0] | typeof speculativeStocks[0] }) => {
  const ratingColor = stock.rating.includes('Buy') ? 'text-green-400' : stock.rating.includes('Hold') ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-green-500 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-slate-100">{stock.ticker}</h3>
        <p className={`font-bold ${ratingColor}`}>{stock.rating}</p>
      </div>
      <p className="text-sm text-slate-300 mb-1">{stock.name}</p>
      <p className="text-lg font-semibold text-slate-100 mb-3">${stock.price.toFixed(2)}</p>
      <p className="text-xs text-slate-400">{stock.analysis}</p>
    </div>
  );
};

const Recommendations = () => {
  return (
    <div className="space-y-8 h-full">
      <div>
        <h3 className="text-xl font-bold text-slate-200 mb-3">Blue Chip Picks</h3>
        <div className="space-y-4">
          {blueChipStocks.map(stock => <StockCard key={stock.ticker} stock={stock} />)}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-200 mb-3">Simulated Growth Picks</h3>
        <div className="space-y-4">
          {speculativeStocks.map(stock => <StockCard key={stock.ticker} stock={stock} />)}
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pt-4">
        <p><strong>Disclaimer:</strong> These are simulated recommendations for educational purposes only and are not financial advice.</p>
      </div>
    </div>
  );
};

export default Recommendations;
