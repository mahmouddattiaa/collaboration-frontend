import React, { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConferencePanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ConferencePanel({ isOpen = false, onClose }: ConferencePanelProps) {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-dark/90 backdrop-blur-lg border border-white/10 rounded-lg w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-lg font-semibold">Video Conference</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {/* Self video */}
          <div className="aspect-video bg-dark/80 rounded-md flex items-center justify-center overflow-hidden relative">
            {isVideoEnabled ? (
              <div className="text-white/50">Your camera is on</div>
            ) : (
              <div className="text-white/50">Your camera is off</div>
            )}
            <div className="absolute bottom-2 left-2 text-sm text-white/80 bg-black/50 px-2 py-1 rounded">
              You
            </div>
          </div>

          {/* Placeholder for other participants */}
          <div className="aspect-video bg-dark/80 rounded-md flex items-center justify-center">
            <div className="text-white/50">Waiting for others to join...</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 px-4 py-4 border-t border-white/10">
          <Button 
            variant={isMicEnabled ? "default" : "outline"}
            size="icon"
            onClick={() => setIsMicEnabled(!isMicEnabled)}
          >
            {isMicEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant={isVideoEnabled ? "default" : "outline"}
            size="icon"
            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant={isScreenSharing ? "default" : "outline"}
            size="icon"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            <ScreenShare className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="destructive"
            onClick={onClose}
          >
            Leave Call
          </Button>
        </div>
      </div>
    </div>
  );
} 