import React from 'react';
import { useCollaboration } from '@/contexts/CollaborationContext';

export function RealtimeCollaborationIndicator() {
  const { isConnected } = useCollaboration();
  
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-theme-emerald' : 'bg-theme-red'}`} />
      <span className="text-xs text-white/70">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
} 