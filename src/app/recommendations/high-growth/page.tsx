import { fetchHighGrowthStocks } from '@/lib/stock-api';
import StockList from '@/components/StockList';

export default async function HighGrowthPage() {
  const stocks = await fetchHighGrowthStocks();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">High-Growth Stocks</h1>
      <p className="text-slate-400 mb-8">
        This list features technology stocks with strong recent positive momentum (highest daily percentage change). This is a high-risk, high-reward category.
      </p>
      <StockList stocks={stocks} />
    </div>
  );
}
