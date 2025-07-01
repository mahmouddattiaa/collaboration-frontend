import React, { useState } from 'react';
import { Plus, Users, ArrowRight, Sparkles, MessageSquare, FileText, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateRoom } from '@/components/collabUI/modals/CreateRoom';
import { JoinRoom } from '@/components/collabUI/modals/JoinRoom';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';

export function CollaborationLobby() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Communicate instantly with your team members"
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Interactive Whiteboard",
      description: "Collaborate visually with drawing and annotation tools"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Sharing",
      description: "Share and edit documents together in real-time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Video Conferencing",
      description: "Face-to-face meetings with screen sharing capabilities"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <AnimatedBackground variant="gradient" />
      
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-theme-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent">
              Collaboration Hub
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Create or join a collaboration room to work together with your team in real-time
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Create Room Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-theme-primary/20 rounded-lg flex items-center justify-center group-hover:bg-theme-primary/30 transition-colors">
                <Plus className="w-6 h-6 text-theme-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create New Room</h3>
                <p className="text-white/60 text-sm mb-4">
                  Start a new collaboration session and invite your team members
                </p>
              </div>
              <Button 
                onClick={() => setShowCreateRoom(true)}
                className="w-full bg-theme-primary hover:bg-theme-primary-dark"
              >
                Create Room
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Join Room Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-theme-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-theme-secondary/30 transition-colors">
                <Users className="w-6 h-6 text-theme-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Join Existing Room</h3>
                <p className="text-white/60 text-sm mb-4">
                  Enter a room code to join an ongoing collaboration session
                </p>
              </div>
              <Button 
                onClick={() => setShowJoinRoom(true)}
                variant="outline"
                className="w-full border-theme-secondary/30 hover:bg-theme-secondary/10 text-theme-secondary hover:border-theme-secondary"
              >
                Join with Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-white/90">What you can do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-theme-primary mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rooms (placeholder) */}
        <div className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Rooms</h3>
          <div className="text-white/60 text-sm">
            No recent rooms. Create or join a room to get started!
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateRoom && (
        <CreateRoom onClose={() => setShowCreateRoom(false)} />
      )}
      
      {showJoinRoom && (
        <JoinRoom onClose={() => setShowJoinRoom(false)} />
      )}
    </div>
  );
}