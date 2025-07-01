import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Users, Briefcase } from 'lucide-react'; // Added Users and Briefcase icons
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
  const [invitedPeople, setInvitedPeople] = useState(''); // New state for invited people
  const [dashboardName, setDashboardName] = useState(''); // New state for dashboard name
  const [isCreating, setIsCreating] = useState(false);
  const { socket } = useCollaboration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim() || !dashboardName.trim()) return; // Ensure dashboard name is also provided

    setIsCreating(true);
    try {
      // In a real implementation, you would make an API call to create the room
      // For now, we'll simulate room creation with a timeout
      const roomId = `room-${Date.now()}`;
      console.log('Creating room with ID:', roomId);
      console.log('Room Name:', roomName);
      console.log('Description:', description);
      console.log('Invited People:', invitedPeople);
      console.log('Dashboard Name:', dashboardName);
      
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"> {/* Darker backdrop, increased blur */}
      <div className="bg-dark-secondary rounded-xl shadow-2xl w-full max-w-lg p-8 space-y-8 border border-white/10"> {/* Changed card style, padding, border */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10"> {/* Added border bottom to header */}
          <h2 className="text-3xl font-semibold text-white">Create New Workspace</h2> {/* Changed title, increased size */}
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"> {/* Icon button style */}
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name Input */}
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Workspace Name
            </label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g., Project Phoenix HQ"
              required
              className="bg-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary" // Enhanced input style
            />
          </div>

          {/* Dashboard Name Input */}
          <div>
            <label htmlFor="dashboardName" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Dashboard Name
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> {/* Icon */}
              <Input
                id="dashboardName"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                placeholder="e.g., Main Dashboard"
                required
                className="bg-dark border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary" // Enhanced input style with padding for icon
              />
            </div>
          </div>
          
          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Description <span className="text-gray-500">(Optional)</span>
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this workspace..."
              className="bg-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary" // Enhanced input style
            />
          </div>

          {/* Invited People Input */}
          <div>
            <label htmlFor="invitedPeople" className="block text-sm font-medium mb-2 text-theme-gray-light">
              Invite People <span className="text-gray-500">(Optional, comma-separated emails)</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> {/* Icon */}
              <Input
                id="invitedPeople"
                value={invitedPeople}
                onChange={(e) => setInvitedPeople(e.target.value)}
                placeholder="e.g., team@example.com, user@example.com"
                className="bg-dark border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary" // Enhanced input style with padding for icon
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10"> {/* Added border top, responsive button layout */}
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 border-white/20 hover:bg-white/10 text-white rounded-lg transition-colors duration-150" // Enhanced button style
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-theme-primary to-theme-secondary hover:opacity-90 text-white font-semibold rounded-lg transition-opacity duration-150 shadow-md hover:shadow-lg" // Enhanced button style
              disabled={isCreating || !roomName.trim() || !dashboardName.trim()} // Also check dashboardName
            >
              {isCreating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Workspace
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}