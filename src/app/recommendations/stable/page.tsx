import { fetchStableStocks } from '@/lib/stock-api';
import StockList from '@/components/StockList';

export default async function StablePage() {
  const stocks = await fetchStableStocks();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Stable Blue-Chip</h1>
        <p className="text-gray-400 mt-2">
          A curated list of large-cap, well-established companies known for their market leadership and stability. These are generally considered lower-risk investments.
        </p>
      </div>
      <StockList stocks={stocks} />
    </div>
  );
}
