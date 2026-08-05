// app/components/DropdownMenu.tsx - WhatsApp-style dropdown menu
'use client';

import { useState, useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  items?: MenuItem[];
  onItemClick?: (itemId: string) => void;
}

export default function DropdownMenu({ 
  items = [
    { id: 'copy', label: 'Copy Signal', icon: '📋' },
    { id: 'share', label: 'Share', icon: '📤' },
    { id: 'export', label: 'Export Data', icon: '📥' },
    { id: 'alerts', label: 'Alert Settings', icon: '🔔' },
    { id: 'logout', label: 'Logout', icon: '🚪' },
  ],
  onItemClick 
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item.id);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
      >
        <span className="text-xl">⋮</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl w-48 py-2 overflow-hidden z-50">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 ${
                item.id === 'logout' ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}