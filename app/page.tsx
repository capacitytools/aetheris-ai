// app/page.tsx - Main WhatsApp-style trading interface
'use client';

import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import SignalCard from './components/SignalCard';
import ChatMessage from './components/ChatMessage';
import TradeChart from './components/TradeChart';
import DropdownMenu from './components/DropdownMenu';

// Types for our data
interface Message {
  id: number;
  type: 'sent' | 'received';
  text: string;
  time: string;
  sender?: string;
}

interface SignalData {
  pair: string;
  direction: 'CALL' | 'PUT' | 'WAIT';
  confidence: number;
  timeLeft: string;
  profit: string;
  winRate: string;
  streak: number;
  stake: string;
}

// Main component
export default function Home() {
  // State for all our data
  const [balance, setBalance] = useState(1000);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentPrice, setCurrentPrice] = useState(1.1250);
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [isLoading, setIsLoading] = useState(false);

  // Signal data (will update in real-time)
  const [signal, setSignal] = useState<SignalData>({
    pair: 'EUR/USD',
    direction: 'CALL',
    confidence: 87,
    timeLeft: '0:42',
    profit: '+$17.00',
    winRate: '65%',
    streak: 3,
    stake: '2%'
  });

  // Chat messages
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'received', 
      text: '🤖 Aetheris AI is online! Ready to trade.', 
      time: '12:00',
      sender: 'Aetheris AI'
    },
    { 
      id: 2, 
      type: 'received', 
      text: '📊 Market detected: Ranging with low volatility. Waiting for clear signal.', 
      time: '12:01',
      sender: 'Aetheris AI'
    },
    { 
      id: 3, 
      type: 'received', 
      text: '📈 EUR/USD showing bullish momentum. Watching for entry.', 
      time: '12:02',
      sender: 'Aetheris AI'
    },
    { 
      id: 4, 
      type: 'sent', 
      text: 'What\'s the current signal?', 
      time: '12:03' 
    },
    { 
      id: 5, 
      type: 'received', 
      text: '🔔 NEW SIGNAL: EUR/USD CALL with 87% confidence!', 
      time: '12:04',
      sender: 'Aetheris AI'
    },
  ]);

  // Quick action pairs
  const quickPairs = ['EUR/USD', 'GBP/USD', 'BTC/USD', 'ETH/USD', 'XAU/USD'];

  // Simulate real-time updates
  useEffect(() => {
    // Update signal every 10 seconds
    const signalInterval = setInterval(() => {
      const newConfidence = Math.floor(Math.random() * 30) + 65;
      const newDirection = Math.random() > 0.5 ? 'CALL' : 'PUT';
      const newProfit = (Math.random() * 30 + 10).toFixed(2);
      const sign = newDirection === 'CALL' ? '+' : '-';
      
      setSignal(prev => ({
        ...prev,
        confidence: newConfidence,
        direction: newDirection,
        profit: `${sign}$${newProfit}`,
        timeLeft: `${Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        streak: Math.floor(Math.random() * 5) + 1,
      }));

      // Add new chat message for signal
      if (newConfidence > 75) {
        const newMessage: Message = {
          id: messages.length + 1,
          type: 'received',
          text: `📊 New signal: ${selectedPair} ${newDirection} with ${newConfidence}% confidence`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'Aetheris AI'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000);

    return () => clearInterval(signalInterval);
  }, [selectedPair, messages.length]);

  // Handle executing a trade
  const handleExecuteTrade = () => {
    setIsLoading(true);
    
    // Add message about trade execution
    const newMessage: Message =