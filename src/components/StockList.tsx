'use client';

import Link from 'next/link';

interface Stock {
  ticker: string;
  name: string;
  c: number; // current price
  d: number; // change
  dp: number; // percent change
}

interface StockListProps {
  stocks: Stock[];
}

const StockList = ({ stocks }: StockListProps) => {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-gray-400">No stock data available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => {
        const isPositive = stock.d >= 0;
        const purchaseLink = `https://www.google.com/finance/quote/${stock.ticker}`;

        return (
          <div key={stock.ticker} className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg transition-all duration-300 hover:border-accent">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-serif font-bold text-white truncate">{stock.name}</h3>
                <p className="text-sm text-gray-400">{stock.ticker}</p>
              </div>
              <Link href={purchaseLink} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full hover:bg-accent hover:text-white transition-colors">
                Info
              </Link>
            </div>
            <div className="mt-4 border-t border-gray-700 pt-4">
              <p className="text-3xl font-bold text-white">${stock.c.toFixed(2)}</p>
              <p className={`text-md font-medium ${isPositive ? 'text-accent' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{stock.d.toFixed(2)} ({stock.dp.toFixed(2)}%)
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StockList;
