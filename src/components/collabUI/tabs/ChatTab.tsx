import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id?: string;
  userId?: string;
  content: string;
  timestamp?: Date;
  type?: string;
}

interface ChatTabProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatTab({ messages, onSendMessage }: ChatTabProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={msg.id || idx} className="flex flex-col">
            <span className="text-sm text-white/80">{msg.content}</span>
            {msg.timestamp && (
              <span className="text-xs text-white/40">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
} 