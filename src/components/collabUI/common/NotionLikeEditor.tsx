import React from 'react';

export function NotionLikeEditor() {
  return (
    <div className="w-full h-full bg-dark/50 backdrop-blur-sm rounded-lg p-4">
      <div className="mb-4">
        <input
          type="text"
          className="text-2xl font-bold bg-transparent border-none outline-none w-full placeholder-white/40"
          placeholder="Untitled Document"
        />
      </div>
      
      <div className="prose prose-invert max-w-none">
        <div
          contentEditable
          className="min-h-[200px] outline-none focus:ring-0"
          data-placeholder="Start typing..."
          style={{ position: 'relative' }}
        />
      </div>
      
      <div className="mt-4 text-white/40 text-xs">
        This is a placeholder for a more advanced editor. A real implementation would use a library like ProseMirror, Slate, or TipTap.
      </div>
    </div>
  );
} 