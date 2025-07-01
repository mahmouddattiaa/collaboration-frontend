import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JoinRoomProps {
  onClose?: () => void;
}

export function JoinRoom({ onClose }: JoinRoomProps) {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    setIsJoining(true);
    setError('');
    
    try {
      // In a real implementation, you would validate the room code with an API call
      // For now, we'll simulate room validation with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the room
      navigate(`/collaboration/${roomCode.trim()}`);
      
      // Close the modal if provided
      onClose?.();
    } catch (error) {
      console.error('Failed to join room:', error);
      setError('Failed to join room. Please check the room code and try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-dark/90 border border-white/10 rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Join Room</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomCode" className="block text-sm font-medium mb-1">
                Room Code
              </label>
              <Input
                id="roomCode"
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value);
                  setError('');
                }}
                placeholder="Enter room code..."
                required
                className={error ? 'border-theme-red' : ''}
              />
              {error && (
                <p className="text-theme-red text-sm mt-1">{error}</p>
              )}
            </div>
            
            <div className="text-sm text-white/60">
              Ask the room host for the room code to join their collaboration session.
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
                disabled={isJoining || !roomCode.trim()}
              >
                {isJoining ? (
                  <>Joining...</>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    Join Room
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