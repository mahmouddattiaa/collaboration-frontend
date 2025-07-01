import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollaboration } from '@/contexts/CollaborationContext';

interface CreateRoomProps {
  onClose?: () => void;
}

export function CreateRoom({ onClose }: CreateRoomProps) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { socket } = useCollaboration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    setIsCreating(true);
    try {
      // In a real implementation, you would make an API call to create the room
      // For now, we'll simulate room creation with a timeout
      const roomId = `room-${Date.now()}`;
      
      // Navigate to the new room
      navigate(`/collaboration/${roomId}`);
      
      // Close the modal if provided
      onClose?.();
    } catch (error) {
      console.error('Failed to create room:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="dashboard-card w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Room</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Room Name
            </label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name..."
              required
              className="bg-theme-dark border-white/20 text-white placeholder:text-theme-gray focus:border-theme-primary"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Description (Optional)
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter room description..."
              className="bg-theme-dark border-white/20 text-white placeholder:text-theme-gray focus:border-theme-primary"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 hover:bg-white/10 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-teal hover:opacity-90 text-white font-medium"
              disabled={isCreating || !roomName.trim()}
            >
              {isCreating ? (
                <>Creating...</>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Room
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}