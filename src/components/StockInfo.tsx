'use client';

import { useState, useEffect } from 'react';
import { fetchStockDetails } from '@/lib/stock-api';

interface StockInfoProps {
  symbol: string;
}

const StockInfo = ({ symbol }: StockInfoProps) => {
  const [stock, setStock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const getDetails = async () => {
      setLoading(true);
      const details = await fetchStockDetails(symbol);
      setStock(details);
      setLoading(false);
    };

    getDetails();
  }, [symbol]);

  if (loading) {
    return <div className="h-24 animate-pulse bg-slate-700 rounded-lg"></div>;
  }

  if (!stock || !stock.name) {
    return null; // Don't render if no stock data
  }

  const change = stock.d || 0;
  const changePercent = stock.dp || 0;
  const isPositive = change >= 0;

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-white">{stock.name} ({stock.ticker})</h2>
      <div className="flex items-baseline mt-2">
        <p className="text-4xl font-bold text-white">${stock.c?.toFixed(2)}</p>
        <p className={`ml-4 text-xl font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-400">Open</p>
          <p className="text-white font-medium">${stock.o?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">High</p>
          <p className="text-white font-medium">${stock.h?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">Low</p>
          <p className="text-white font-medium">${stock.l?.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">Prev. Close</p>
          <p className="text-white font-medium">${stock.pc?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
