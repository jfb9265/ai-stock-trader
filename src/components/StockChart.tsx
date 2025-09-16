'use client';

import { createChart, ColorType, IChartApi, CandlestickSeries, UTCTimestamp, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { fetchHistoricalData } from '@/lib/stock-api';

interface StockChartProps {
  symbol?: string;
}

const StockChart = ({ symbol = 'AAPL' }: StockChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect for chart creation and destruction
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#E5E7EB',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      autoSize: true, // Use the built-in auto-size feature
    });
    chartRef.current = chart;

    seriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: '#34D399',
      downColor: '#F43F5E',
      borderDownColor: '#F43F5E',
      borderUpColor: '#34D399',
      wickDownColor: '#F43F5E',
      wickUpColor: '#34D399',
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  // Effect for loading data when symbol changes
  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;

    const getChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - (365 * 24 * 60 * 60);
        const resolution = 'D';

        const data = await fetchHistoricalData(symbol, resolution, from, to);

        if (data.s === 'no_data' || !data.c || data.c.length === 0) {
          setError(`No historical data found for symbol ${symbol}.`);
          seriesRef.current?.setData([]);
        } else {
          const formattedData = data.t.map((time: number, index: number) => ({
            time: time as UTCTimestamp,
            open: data.o[index],
            high: data.h[index],
            low: data.l[index],
            close: data.c[index],
          }));
          seriesRef.current?.setData(formattedData);
          chartRef.current?.timeScale().fitContent();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        seriesRef.current?.setData([]);
      } finally {
        setLoading(false);
      }
    };

    getChartData();
  }, [symbol]);

  return (
    <div className="relative h-full w-full">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10 rounded-2xl"><p>Loading Chart...</p></div>}
      {error && <div className="absolute inset-0 flex items-center justify-center bg-rose-500/50 backdrop-blur-sm text-white z-10 rounded-2xl"><p>{error}</p></div>}
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  );
};

export default StockChart;
