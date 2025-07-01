import React from 'react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  activeTabId: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function TabBar({ tabs, activeTabId, onChange, className }: TabBarProps) {
  return (
    <div className={cn('flex border-b border-white/10', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
            tab.id === activeTabId
              ? 'border-b-2 border-theme-primary text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
} 