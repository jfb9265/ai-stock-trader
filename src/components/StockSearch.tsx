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
        placeholder="Search symbol..."
        className="w-full px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {results.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleSelect(item.symbol)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-sm"
            >
              <span className="font-bold text-white">{item.symbol}</span>
              <span className="ml-2 text-gray-400">{item.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearch;
