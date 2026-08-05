// app/components/SignalCard.tsx - Trading signal display card
'use client';

import { useState } from 'react';

interface SignalCardProps {
  pair?: string;
  direction?: 'CALL' | 'PUT' | 'WAIT';
  confidence?: number;
  timeLeft?: string;
  profit?: string;
  winRate?: string;
  streak?: number;
  stake?: string;
  onExecute?: () => void;
}

export default function SignalCard({
  pair = 'EUR/USD',
  direction = 'CALL',
  confidence = 87,
  timeLeft = '0:42',
  profit = '+$17.00',
  winRate = '65%',
  streak = 3,
  stake = '2%',
  onExecute,
}: SignalCardProps) {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    if (onExecute) {
      onExecute();
    }
    setTimeout(() => setIsExecuting(false), 2000);
  };

  const isCall = direction === 'CALL';
  const isWait = direction === 'WAIT';
  const directionColor = isWait ? 'text-yellow-500' : isCall ? 'text-green-600' : 'text-red-600';
  const directionBg = isWait ? 'bg-yellow-50' : isCall ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-whatsapp-light signal-card animate-slide-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg text-gray-800">{pair}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">1m</span>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">DEMO</span>
          </div>
          <div className={`text-2xl font-bold mt-1 ${directionColor} flex items-center`}>
            {direction} {!isWait && (isCall ? '↑' : '↓')}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${profit.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {profit}
          </div>
          <div className="text-xs text-gray-500">stake {stake}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className={`${directionBg} p-2 rounded-lg text-center`}>
          <div className="text-xs text-gray-500">Confidence</div>
          <div className="font-bold text-whatsapp-dark text-lg">{confidence}%</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className={`h-1.5 rounded-full ${confidence > 75 ? 'bg-green-500' : confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="text-xs text-gray-500">Closes in</div>
          <div className="font-bold text-whatsapp-dark flex items-center justify-center">
            <span className="mr-1">⏰</span>
            {timeLeft}
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="text-xs text-gray-500">Win Rate</div>
          <div className="font-bold text-whatsapp-dark">{winRate}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-600">34W/18L</span>
          <span className="text-xs bg-whatsapp-light text-white px-2 py-1 rounded-full flex items-center">
            🔥 streak {streak}
          </span>
        </div>
        <button
          onClick={handleExecute}
          disabled={isExecuting || isWait}
          className={`btn-primary px-4 py-1.5 rounded-full text-sm font-medium text-white ${
            isWait 
              ? 'bg-gray-400 cursor-not-allowed' 
              : isExecuting 
                ? 'bg-whatsapp-medium opacity-75' 
                : 'bg-whatsapp-dark hover:bg-whatsapp-medium'
          } transition-all duration-200 flex items-center space-x-2`}
        >
          {isExecuting ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Executing...</span>
            </>
          ) : isWait ? (
            'Waiting...'
          ) : (
            'Execute Trade'
          )}
        </button>
      </div>
    </div>
  );
}