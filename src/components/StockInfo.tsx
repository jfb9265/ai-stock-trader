'use client';

import { useState, useEffect } from 'react';
import { fetchStockDetails } from '@/lib/stock-api';

interface StockInfoProps {
  symbol: string;
}

interface StockDetails {
  name: string;
  ticker: string;
  c: number;
  d: number;
  dp: number;
  o: number;
  h: number;
  l: number;
  pc: number;
}

const StockInfo = ({ symbol }: StockInfoProps) => {
  const [stock, setStock] = useState<StockDetails | null>(null);
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
    // A more fitting loading state for the new design
    return (
      <div className="h-36">
        <div className="h-8 w-1/2 bg-gray-400/20 rounded-md animate-pulse mb-4"></div>
        <div className="h-12 w-1/3 bg-gray-400/20 rounded-md animate-pulse mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-8 bg-gray-400/20 rounded-md animate-pulse"></div>
          <div className="h-8 bg-gray-400/20 rounded-md animate-pulse"></div>
          <div className="h-8 bg-gray-400/20 rounded-md animate-pulse"></div>
          <div className="h-8 bg-gray-400/20 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!stock || !stock.name) {
    return <div className="h-36 flex items-center justify-center"><p>Could not load stock details.</p></div>;
  }

  const change = stock.d || 0;
  const changePercent = stock.dp || 0;
  const isPositive = change >= 0;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white">{stock.name} <span className="text-gray-400">({stock.ticker})</span></h2>
      <div className="flex items-baseline mt-2">
        <p className="text-4xl font-bold text-white">${stock.c?.toFixed(2)}</p>
        <p className={`ml-4 text-xl font-semibold ${isPositive ? 'text-accent' : 'text-rose-500'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm border-t border-white/10 pt-4">
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
