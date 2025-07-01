import React, { useState } from 'react';
import { Plus, Users, ArrowRight, Sparkles, MessageSquare, FileText, Layout, Target, BarChart3, Zap } from 'lucide-react';
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
      description: "Communicate instantly with your team members",
      color: "theme-primary"
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Interactive Whiteboard",
      description: "Collaborate visually with drawing and annotation tools",
      color: "theme-secondary"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Sharing",
      description: "Share and edit documents together in real-time",
      color: "theme-accent"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Video Conferencing",
      description: "Face-to-face meetings with screen sharing capabilities",
      color: "theme-emerald"
    }
  ];

  const quickActions = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Start Focus Session",
      description: "Begin a 25-minute focus session"
    },
    {
      icon: <Plus className="w-5 h-5" />,
      title: "Add Task",
      description: "Create a new task or habit"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "View Analytics",
      description: "Check your productivity metrics"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Actions",
      description: "Access frequently used features"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative cosmic-bg">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-teal flex items-center justify-center animate-pulse-teal">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text text-shadow">
              Collaboration Hub
            </h1>
          </div>
          <p className="text-xl text-theme-gray-light max-w-2xl mx-auto">
            Ready to make today count? Create or join a collaboration room to work together with your team in real-time
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <div className="w-6 h-6 rounded-lg bg-theme-primary/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-theme-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="action-button text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-theme-primary/20 flex items-center justify-center group-hover:bg-theme-primary/30 transition-colors">
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-medium text-sm text-white mb-1">{action.title}</h3>
                <p className="text-xs text-theme-gray-light">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Create Room Card */}
          <div className="dashboard-card group cursor-pointer" onClick={() => setShowCreateRoom(true)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="stat-card-icon">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-theme-gray group-hover:text-theme-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Create New Room</h3>
                <p className="text-theme-gray-light text-sm mb-6">
                  Start a new collaboration session and invite your team members to join your workspace
                </p>
              </div>
              <Button 
                className="w-full bg-gradient-teal hover:opacity-90 text-white font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateRoom(true);
                }}
              >
                Create Room
              </Button>
            </div>
          </div>

          {/* Join Room Card */}
          <div className="dashboard-card group cursor-pointer" onClick={() => setShowJoinRoom(true)}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-theme-secondary" />
                </div>
                <ArrowRight className="w-5 h-5 text-theme-gray group-hover:text-theme-secondary transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Join Existing Room</h3>
                <p className="text-theme-gray-light text-sm mb-6">
                  Enter a room code to join an ongoing collaboration session with your team
                </p>
              </div>
              <Button 
                variant="outline"
                className="w-full border-theme-secondary/30 hover:bg-theme-secondary/10 text-theme-secondary hover:border-theme-secondary font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowJoinRoom(true);
                }}
              >
                Join with Code
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">What you can do</h2>
            <p className="text-theme-gray-light">Powerful collaboration tools at your fingertips</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="dashboard-card group"
              >
                <div className={`w-10 h-10 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:bg-${feature.color}/30 transition-colors`}>
                  <div className={`text-${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-theme-gray-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-theme-gray-light text-sm">Active Rooms</span>
              <div className="stat-card-icon">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-xs text-theme-gray-light">This month</div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-theme-gray-light text-sm">Collaboration Time</span>
              <div className="w-6 h-6 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                <Target className="w-3 h-3 text-theme-secondary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">0h</div>
            <div className="text-xs text-theme-gray-light">0m total</div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-theme-gray-light text-sm">Tasks Completed</span>
              <div className="w-6 h-6 rounded-lg bg-theme-accent/20 flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-theme-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-xs text-theme-gray-light">Completed tasks</div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-theme-gray-light text-sm">Productivity Score</span>
              <div className="w-6 h-6 rounded-lg bg-theme-emerald/20 flex items-center justify-center">
                <Zap className="w-3 h-3 text-theme-emerald" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-xs text-theme-gray-light">Out of 100</div>
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