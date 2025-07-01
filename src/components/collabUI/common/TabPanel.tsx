import React from 'react';
import { cn } from '@/lib/utils';

interface TabPanelProps {
  children: React.ReactNode;
  active: boolean;
  className?: string;
}

export function TabPanel({ children, active, className }: TabPanelProps) {
  if (!active) return null;
  
  return (
    <div className={cn('w-full h-full', className)}>
      {children}
    </div>
  );
} 