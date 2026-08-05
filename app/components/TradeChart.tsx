// app/components/TradeChart.tsx - Interactive price chart
'use client';

import { useEffect, useRef, useState } from 'react';

interface TradeChartProps {
  pair?: string;
  price?: number;
  onPriceChange?: (price: number) => void;
}

export default function TradeChart({ pair = 'EUR/USD', price = 1.1250, onPriceChange }: TradeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [isLive, setIsLive] = useState(true);

  // Generate random price data
  useEffect(() => {
    const initialData = [];
    let currentPriceValue = price;
    for (let i = 0; i < 50; i++) {
      currentPriceValue += (Math.random() - 0.5) * 0.0005;
      initialData.push(currentPriceValue);
    }
    setChartData(initialData);
    setCurrentPrice(initialData[initialData.length - 1]);
  }, [price]);

  // Simulate live price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setChartData(prev => {
        const newPrice = prev[prev.length - 1] + (Math.random() - 0.5) * 0.0003;
        const newData = [...prev.slice(1), newPrice];
        setCurrentPrice(newPrice);
        if (onPriceChange) onPriceChange(newPrice);
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isLive, onPriceChange]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    const width = rect?.width || 400;
    const height = 250;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(2, 2);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max for scaling
    const min = Math.min(...chartData) - 0.0005;
    const max = Math.max(...chartData) + 0.0005;
    const range = max - min;

    // Draw grid
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 5; i++) {
      const y = (i / 4) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw price line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const isUp = chartData[chartData.length - 1] > chartData[0];
    gradient.addColorStop(0, isUp ? '#25D366' : '#ef5350');
    gradient.addColorStop(1, isUp ? '#25D366' : '#ef5350');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    chartData.forEach((value, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area under curve
    const lastPoint = chartData[chartData.length - 1];
    const lastX = width;
    const lastY = height - ((lastPoint - min) / range) * height;
    ctx.lineTo(lastX, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, isUp ? 'rgba(37, 211, 102, 0.2)' : 'rgba(239, 83, 80, 0.2)');
    fillGradient.addColorStop(1, 'rgba(37, 211, 102, 0)');
    ctx.fillStyle = fillGradient;
    ctx.fill();

    // Draw current price marker
    const markerX = width;
    const markerY = lastY;
    ctx.beginPath();
    ctx.arc(markerX, markerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = isUp ? '#25D366' : '#ef5350';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Price labels
    ctx.fillStyle = '#666';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(max.toFixed(4), width - 5, 12);
    ctx.fillText(min.toFixed(4), width - 5, height - 4);

  }, [chartData]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-gray-800">{pair}</span>
          <span className={`text-sm font-semibold ${currentPrice > price ? 'text-green-600' : 'text-red-600'}`}>
            {currentPrice.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`text-xs px-2 py-1 rounded-full ${
              isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isLive ? '● Live' : '○ Paused'}
          </button>
          <span className="text-xs text-gray-400">1m</span>
        </div>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[250px]" />
        <div className="absolute bottom-2 left-0 right-0 flex justify-between text-[10px] text-gray-400 px-1">
          <span>00:00</span>
          <span>00:30</span>
          <span>01:00</span>
        </div>
      </div>
    </div>
  );
}