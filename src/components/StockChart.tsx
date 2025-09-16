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
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#E5E7EB', // gray-200
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight, // Make height responsive
    });

    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: '#34D399', // Emerald-400 (accent color)
      downColor: '#F43F5E', // Rose-500
      borderDownColor: '#F43F5E',
      borderUpColor: '#34D399',
      wickDownColor: '#F43F5E',
      wickUpColor: '#34D399',
    });

    const handleResize = () => {
      chartRef.current?.applyOptions({ 
        width: chartContainerRef.current?.clientWidth,
        height: chartContainerRef.current?.clientHeight,
      });
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
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10 rounded-2xl"><p>Loading Chart...</p></div>}
      {error && <div className="absolute inset-0 flex items-center justify-center bg-rose-500/50 backdrop-blur-sm text-white z-10 rounded-2xl"><p>{error}</p></div>}
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  );
};

export default StockChart;
