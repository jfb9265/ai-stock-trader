'use client';

import { createChart, ColorType, IChartApi, CandlestickSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

// Function to generate simulated stock data
const generateDailyData = (numPoints = 200) => {
  const data = [];
  let price = 5000 + Math.random() * 100;
  const today = new Date();

  for (let i = numPoints - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const open = price;
    const close = open + (Math.random() - 0.5) * 50;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;

    data.push({
      time: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      open: open,
      high: high,
      low: low,
      close: close,
    });

    price = close;
  }
  return data;
};

const StockChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart: IChartApi = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1e293b' }, // slate-800
        textColor: '#d1d5db', // gray-300
      },
      grid: {
        vertLines: { color: '#334155' }, // slate-700
        horzLines: { color: '#334155' }, // slate-700
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e', // green-500
      downColor: '#ef4444', // red-500
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    });

    const simulatedData = generateDailyData();
    candlestickSeries.setData(simulatedData);

    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div ref={chartContainerRef} className="h-full w-full" />
  );
};

export default StockChart;
