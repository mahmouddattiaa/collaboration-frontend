import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, X } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="dashboard-card w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Join Room</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium mb-2 text-theme-gray-light">
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
              className={`bg-theme-dark border-white/20 text-white placeholder:text-theme-gray focus:border-theme-primary ${
                error ? 'border-theme-red' : ''
              }`}
            />
            {error && (
              <p className="text-theme-red text-sm mt-2">{error}</p>
            )}
          </div>
          
          <div className="bg-theme-dark/50 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-theme-gray-light">
              Ask the room host for the room code to join their collaboration session.
            </p>
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
              className="flex-1 bg-theme-secondary hover:bg-theme-secondary/90 text-white font-medium"
              disabled={isJoining || !roomCode.trim()}
            >
              {isJoining ? (
                <>Joining...</>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Join Room
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}