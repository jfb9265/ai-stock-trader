'use client';

import dynamic from 'next/dynamic';

const DynamicStockChart = dynamic(() => import('./StockChart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

const ChartWrapper = () => {
  return <DynamicStockChart />;
};

export default ChartWrapper;
