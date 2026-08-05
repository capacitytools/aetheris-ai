// app/page.tsx - The WhatsApp-style home screen
'use client';

import { useState, useEffect } from 'react';
import { Zap, Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function Home() {
  const [signal, setSignal] = useState({
    pair: 'EUR/USD',
    direction: 'CALL',
    confidence: 87,
    timeLeft: '0:42',
    profit: '+$17.00',
    winRate: '65%',
    streak: 3
  });

  const [messages, setMessages] = useState([
    { id: 1, type: 'received', text: '🤖 Aetheris AI is online!', time: '12:00' },
    { id: 2, type: 'received', text: '📊 Scanning market for opportunities...', time: '12:01' },
    { id: 3, type: 'received', text: '🔔 NEW SIGNAL: EUR/USD CALL 87%', time: '12:03' },
  ]);

  return (
    <div className="min-h-screen bg-[#ECE5DD]">
      {/* WhatsApp-style Header */}
      <header className="bg-[#075E54] text-white p-4 flex items-center sticky top-0 z-50">
        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mr-3">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Aetheris AI</h1>
          <div className="flex items-center text-xs opacity-80">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>
            online · scanning market
          </div>
        </div>
        <div className="text-sm font-bold">$1,000</div>
      </header>

      {/* Main Chat Area */}
      <div className="p-4 pb-24 space-y-4">
        {/* Trading Signal Card - Like WhatsApp Status */}
        <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-[#25D366]">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg">{signal.pair}</h3>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">1m</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {signal.direction} ↑
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{signal.profit}</div>
              <div className="text-xs text-gray-500">stake 2%</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-50 p-2 rounded text-center">
              <div className="text-xs text-gray-500">Confidence</div>
              <div className="font-bold text-[#075E54]">{signal.confidence}%</div>
            </div>
            <div className="bg-gray-50 p-2 rounded text-center">
              <div className="text-xs text-gray-500">Closes in</div>
              <div className="font-bold text-[#075E54] flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                {signal.timeLeft}
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded text-center">
              <div className="text-xs text-gray-500">Win Rate</div>
              <div className="font-bold text-[#075E54]">{signal.winRate}</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <div className="flex items-center space-x-4">
              <span className="text-xs">34W/18L</span>
              <span className="text-xs bg-[#25D366] text-white px-2 py-1 rounded-full">
                streak {signal.streak} 🔥
              </span>
            </div>
            <button className="bg-[#075E54] text-white px-4 py-1 rounded-full text-sm">
              Execute Trade
            </button>
          </div>
        </div>

        {/* Chat Messages - Like WhatsApp */}
        <div className="space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.type === 'sent' 
                  ? 'bg-[#DCF8C6] rounded-br-none' 
                  : 'bg-white rounded-bl-none shadow-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['EUR/USD', 'GBP/USD', 'BTC/USD', 'ETH/USD'].map((pair) => (
            <button key={pair} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              {pair}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Like WhatsApp */}
      <nav className="bg-[#075E54] text-white fixed bottom-0 w-full z-50">
        <div className="flex justify-around items-center py-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#25D366] rounded-full"></div>
            <span className="text-xs mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 rounded-full"></div>
            <span className="text-xs mt-1">Signals</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 rounded"></div>
            <span className="text-xs mt-1">Stats</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2"></div>
            <span className="text-xs mt-1">Settings</span>
          </div>
        </div>
      </nav>
    </div>
  );
}