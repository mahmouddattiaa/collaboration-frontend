import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
  isLoading?: boolean;
}

interface SharedAIChatTabProps {
  messages?: Message[];
  onSendMessage?: (content: string) => void;
  isProcessing?: boolean;
}

export function SharedAIChatTab({
  messages = [],
  onSendMessage,
  isProcessing = false
}: SharedAIChatTabProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    onSendMessage?.(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <Bot className="h-5 w-5 text-theme-emerald" />
        <h2 className="text-lg font-medium">Shared AI Assistant</h2>
        {isProcessing && (
          <div className="flex items-center gap-2 ml-auto">
            <Spinner size="sm" />
            <span className="text-sm text-white/60">Processing...</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 ${message.role === 'assistant' ? 'text-theme-emerald' : 'text-theme-primary'}`}>
              {message.role === 'assistant' ? (
                <Bot className="h-6 w-6" />
              ) : (
                <User className="h-6 w-6" />
              )}
            </div>

            {/* Message content */}
            <div className="flex-1 space-y-1">
              {message.userName && (
                <div className="text-sm text-white/60">
                  {message.userName}
                </div>
              )}
              <div className={`rounded-lg p-3 ${
                message.role === 'assistant'
                  ? 'bg-dark/30 text-white'
                  : 'bg-theme-primary/20 text-white'
              }`}>
                {message.isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {message.content}
                  </div>
                )}
              </div>
              <div className="text-xs text-white/40">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-white/60 py-8">
            No messages yet. Start a conversation with the AI assistant!
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI assistant..."
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-white/40">
          Press Enter to send, Shift + Enter for new line
        </div>
      </div>
    </div>
  );
} 