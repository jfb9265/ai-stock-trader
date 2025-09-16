'''
// src/lib/stock-api.ts

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

// Helper function to handle API requests
const fetchFromApi = async (endpoint: string) => {
  if (!API_KEY) {
    throw new Error('Finnhub API key not found. Please set FINNHUB_API_KEY in your .env.local file.');
  }
  const url = `${BASE_URL}/${endpoint}&token=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Finnhub API request failed with status ${response.status}: ${errorText}`);
  }
  return response.json();
};

// Search for stock symbols
export const searchSymbols = async (query: string) => {
  return fetchFromApi(`search?q=${query}`);
};

// Fetch details and quote for a stock
export const fetchStockDetails = async (symbol: string) => {
  const quote = await fetchFromApi(`quote?symbol=${symbol}`);
  const profile = await fetchFromApi(`stock/profile2?symbol=${symbol}`);
  return { ...quote, ...profile };
};

// Fetch historical data for the chart
export const fetchHistoricalData = async (symbol: string, resolution: string, from: number, to: number) => {
  return fetchFromApi(`stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`);
};

// --- Recommendation Functions ---

const blueChipSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'JNJ', 'V', 'PG', 'JPM', 'HD'];
const growthTechSymbols = ['TSLA', 'META', 'AMD', 'NFLX', 'CRM', 'ADBE', 'PYPL', 'INTC', 'CSCO', 'ORCL'];

// Fetch details for a list of symbols
const fetchStockBatch = async (symbols: string[]) => {
  const promises = symbols.map(symbol => fetchStockDetails(symbol));
  const results = await Promise.allSettled(promises);
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<any>).value)
    .filter(stock => stock.name); // Filter out any stocks that failed to fetch a profile
};

// Fetch stable, blue-chip stocks
export const fetchStableStocks = async () => {
  return fetchStockBatch(blueChipSymbols);
};

// Fetch high-growth stocks (using momentum as a proxy)
export const fetchHighGrowthStocks = async () => {
  const stocks = await fetchStockBatch(growthTechSymbols);
  // Sort by highest percentage change
  stocks.sort((a, b) => (b.dp || 0) - (a.dp || 0));
  return stocks;
};
'''