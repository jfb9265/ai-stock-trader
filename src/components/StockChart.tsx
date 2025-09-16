'use client';

import { createChart, ColorType, IChartApi, CandlestickSeries, UTCTimestamp, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { fetchHistoricalData } from '@/lib/stock-api';

// Define the props for the component
interface StockChartProps {
  symbol?: string;
}

const StockChart = ({ symbol = 'AAPL' }: StockChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1e293b' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#334155' },
        horzLines: { color: '#334155' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
    });

    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    });

    const handleResize = () => {
      chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    const getChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - (365 * 24 * 60 * 60); // One year ago
        const resolution = 'D'; // Daily resolution

        const data = await fetchHistoricalData(symbol, resolution, from, to);

        if (data.s === 'no_data' || data.c.length === 0) {
          setError(`No historical data found for symbol ${symbol}.`);
          if (seriesRef.current) {
            seriesRef.current.setData([]); // Clear previous data
          }
        } else {
          const formattedData = data.t.map((time: number, index: number) => ({
            time: time as UTCTimestamp,
            open: data.o[index],
            high: data.h[index],
            low: data.l[index],
            close: data.c[index],
          }));
          if (seriesRef.current) {
            seriesRef.current.setData(formattedData);
          }
          chartRef.current?.timeScale().fitContent();
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
        if (seriesRef.current) {
          seriesRef.current.setData([]); // Clear previous data
        }
      } finally {
        setLoading(false);
      }
    };

    getChartData();
  }, [symbol]); // Re-run when symbol changes

  return (
    <div className="relative h-full w-full">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 z-10">Loading chart...</div>}
      {error && <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-70 text-white z-10">{error}</div>}
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  );
};

export default StockChart;
