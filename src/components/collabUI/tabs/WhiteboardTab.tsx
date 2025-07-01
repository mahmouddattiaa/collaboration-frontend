import React from 'react';

interface WhiteboardElement {
  id: string;
  type: string;
  // Add more properties as needed
}

interface WhiteboardTabProps {
  elements: WhiteboardElement[];
  onUpdateElements: (elements: WhiteboardElement[]) => void;
}

export function WhiteboardTab(/*{ elements, onUpdateElements }: WhiteboardTabProps*/) {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-white/80 text-lg mb-4">Whiteboard Placeholder</div>
      <div className="w-full h-96 bg-white/10 rounded-lg flex items-center justify-center">
        <span className="text-white/40">(Whiteboard drawing area would go here)</span>
      </div>
      <div className="mt-4 text-xs text-white/40">
        This is a placeholder for the whiteboard. Real drawing and collaboration features can be added here.
      </div>
    </div>
  );
} 