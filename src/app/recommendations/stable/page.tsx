import { fetchStableStocks } from '@/lib/stock-api';
import StockList from '@/components/StockList';

export default async function StablePage() {
  const stocks = await fetchStableStocks();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">Stable Blue-Chip Stocks</h1>
      <p className="text-slate-400 mb-8">
        This list features large-cap, well-established companies known for their stability and market leadership. This is generally considered a lower-risk category.
      </p>
      <StockList stocks={stocks} />
    </div>
  );
}
