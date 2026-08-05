// app/components/BottomNav.tsx - WhatsApp-style bottom navigation
'use client';

import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', activeIcon: '🏠' },
  { id: 'signals', label: 'Signals', icon: '📡', activeIcon: '📡' },
  { id: 'stats', label: 'Stats', icon: '📊', activeIcon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️', activeIcon: '⚙️' },
];

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  const [active, setActive] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-whatsapp-dark text-white z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all duration-200 relative"
            >
              <span className="text-2xl">{isActive ? item.activeIcon : item.icon}</span>
              <span className={`text-xs ${isActive ? 'text-whatsapp-light font-semibold' : 'text-white/70'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-whatsapp-light rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}