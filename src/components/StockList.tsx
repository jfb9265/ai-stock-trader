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
      <div className="flex items-center justify-center h-64 bg-gray-400/10 backdrop-blur-lg rounded-2xl border border-white/10">
        <p>No stock data available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => {
        const isPositive = stock.d >= 0;
        const purchaseLink = `https://www.google.com/finance/quote/${stock.ticker}`;

        return (
          <div key={stock.ticker} className="bg-gray-400/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-accent hover:bg-accent/10">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-bold text-white truncate">{stock.name}</h3>
                <p className="text-sm text-gray-400">{stock.ticker}</p>
              </div>
              <Link href={purchaseLink} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-1 px-3 rounded-full transition-colors">
                Info
              </Link>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-3xl font-semibold text-white">${stock.c.toFixed(2)}</p>
              <p className={`text-md font-medium ${isPositive ? 'text-accent' : 'text-rose-500'}`}>
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
