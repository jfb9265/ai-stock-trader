'use client';

import { useState, useEffect, useRef } from 'react';
import { searchSymbols } from '@/lib/stock-api';

interface StockSearchProps {
  onSymbolSelect: (symbol: string) => void;
}

interface SearchResult {
  symbol: string;
  description: string;
}

const StockSearch = ({ onSymbolSelect }: StockSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchSymbols = async () => {
      const searchData = await searchSymbols(query);
      if (searchData.result) {
        setResults(searchData.result.slice(0, 10)); // Limit to 10 results
        setIsOpen(true);
      }
    };

    const debounceTimeout = setTimeout(fetchSymbols, 300); // Debounce API calls
    return () => clearTimeout(debounceTimeout);

  }, [query]);

  const handleSelect = (symbol: string) => {
    onSymbolSelect(symbol);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a stock..."
        className="w-full px-4 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute z-20 w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-lg">
          {results.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleSelect(item.symbol)}
              className="px-4 py-2 cursor-pointer hover:bg-slate-600"
            >
              <span className="font-bold">{item.symbol}</span>
              <span className="ml-2 text-sm text-gray-400">{item.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearch;
