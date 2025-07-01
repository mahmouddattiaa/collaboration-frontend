import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FolderOpen, FileText, Plus } from 'lucide-react';

interface LibraryItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  description?: string;
  lastModified?: Date;
  sharedBy?: string;
}

interface SharedLibraryTabProps {
  items?: LibraryItem[];
  onCreateItem?: (type: 'folder' | 'file') => void;
  onOpenItem?: (item: LibraryItem) => void;
}

export function SharedLibraryTab({ 
  items = [], 
  onCreateItem, 
  onOpenItem 
}: SharedLibraryTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header with search and actions */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="pl-9"
            />
          </div>
          <Button onClick={() => onCreateItem?.('folder')} variant="outline" size="icon">
            <FolderOpen className="h-4 w-4" />
          </Button>
          <Button onClick={() => onCreateItem?.('file')} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Library content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 && (
          <div className="text-center text-white/60 py-8">
            {searchQuery ? 'No items match your search' : 'No items in the library yet'}
          </div>
        )}

        <div className="grid gap-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenItem?.(item)}
              className="flex items-start gap-3 p-3 rounded-lg bg-dark/30 border border-white/10 hover:bg-dark/40 transition-colors text-left w-full"
            >
              {item.type === 'folder' ? (
                <FolderOpen className="h-5 w-5 text-theme-yellow flex-shrink-0" />
              ) : (
                <FileText className="h-5 w-5 text-theme-primary flex-shrink-0" />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{item.name}</div>
                {item.description && (
                  <div className="text-sm text-white/60 truncate">{item.description}</div>
                )}
                <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                  {item.sharedBy && <span>Shared by {item.sharedBy}</span>}
                  {item.lastModified && (
                    <span>
                      Modified {item.lastModified.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 