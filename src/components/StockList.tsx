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
    return <p>No stock data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => {
        const isPositive = stock.d >= 0;
        const purchaseLink = `https://www.google.com/finance/quote/${stock.ticker}`;

        return (
          <div key={stock.ticker} className="p-4 bg-slate-800 rounded-lg shadow-md border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{stock.name}</h3>
                <p className="text-sm text-gray-400">{stock.ticker}</p>
              </div>
              <Link href={purchaseLink} target="_blank" rel="noopener noreferrer" className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Info
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-white">${stock.c.toFixed(2)}</p>
              <p className={`text-md font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
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
