import { fetchHighGrowthStocks } from '@/lib/stock-api';
import StockList from '@/components/StockList';

export default async function HighGrowthPage() {
  const stocks = await fetchHighGrowthStocks();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">High-Risk / High-Reward</h1>
        <p className="text-gray-400 mt-2">
          A curated list of technology stocks selected for their strong recent positive momentum. These are typically more volatile and are considered high-risk.
        </p>
      </div>
      <StockList stocks={stocks} />
    </div>
  );
}
