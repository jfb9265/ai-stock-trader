
const PortfolioPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">The $1000 Portfolio Challenge</h1>
      <p className="mb-6">Starting with a small investment like $1000 presents unique challenges that can significantly impact the viability of an automated trading strategy.</p>
      <div className="space-y-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Impact of Transaction Fees</h2>
          <p>Most brokers charge a fee for each trade. With a small portfolio, these fees can represent a significant percentage of your capital, eating away at any potential profits. High-frequency trading strategies are often not viable for small accounts.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Limited Diversification</h2>
          <p>A $1000 portfolio can only buy a limited number of shares, making it difficult to diversify across different stocks or sectors. This lack of diversification increases risk, as a poor performance in one holding can have an outsized impact on the total portfolio.</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Scaling and Position Sizing</h2>
          <p>Proper risk management often dictates that you should only risk a small percentage of your portfolio on a single trade (e.g., 1-2%). With $1000, this means risking only $10-$20 per trade, which may not be enough to buy even a single share of many popular stocks.</p>
        </div>
        <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <h2 className="font-bold">Conclusion</h2>
          <p>While not impossible, using AI to trade with a $1000 portfolio is exceptionally challenging. A successful strategy would need to be very low-frequency and target assets with low transaction costs and high potential returns to be profitable.</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
