import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-dark/90 border border-white/10 rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create New Room</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium mb-1">
                Room Name
              </label>
              <Input
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description (Optional)
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter room description..."
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2"
                disabled={isCreating || !roomName.trim()}
              >
                {isCreating ? (
                  <>Creating...</>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Room
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 