import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, FileText, CheckSquare, Users, ChevronLeft, ChevronRight, Search, Bot, Layout, Settings } from 'lucide-react';

import { SidebarItem } from '@/components/common/SidebarItem';
import { SidebarSection } from '@/components/common/SidebarSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CollaborationRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!roomId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-dark text-white">
        <h2 className="text-2xl font-bold mb-4">No Room ID</h2>
        <p className="text-gray-400 mb-6">Please provide a valid room ID</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-dark flex">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-dark-secondary border-r border-white/10 transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-xl font-bold text-white ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
              Room: {roomId}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-400 hover:text-white"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
          </div>

          {!isSidebarCollapsed && (
            <div className="space-y-4">
              <SidebarSection title="Communication" defaultExpanded={true}>
                <SidebarItem
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="Chat"
                  isActive={activeTab === 'chat'}
                  onClick={() => setActiveTab('chat')}
                />
                <SidebarItem
                  icon={<Bot className="w-5 h-5" />}
                  label="AI Assistant"
                  isActive={activeTab === 'ai'}
                  onClick={() => setActiveTab('ai')}
                />
              </SidebarSection>

              <SidebarSection title="Workspace" defaultExpanded={true}>
                <SidebarItem
                  icon={<Layout className="w-5 h-5" />}
                  label="Whiteboard"
                  isActive={activeTab === 'whiteboard'}
                  onClick={() => setActiveTab('whiteboard')}
                />
                <SidebarItem
                  icon={<CheckSquare className="w-5 h-5" />}
                  label="Tasks"
                  isActive={activeTab === 'tasks'}
                  onClick={() => setActiveTab('tasks')}
                />
                <SidebarItem
                  icon={<FileText className="w-5 h-5" />}
                  label="Files"
                  isActive={activeTab === 'files'}
                  onClick={() => setActiveTab('files')}
                />
              </SidebarSection>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-dark-secondary border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-white">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <Badge variant="outline" className="text-theme-primary border-theme-primary">
                Connected
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="h-full bg-dark-secondary rounded-lg border border-white/10 p-6">
            {activeTab === 'chat' && (
              <div className="text-center text-white/60">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-white">🎉 Welcome to Room!</h3>
                <p className="text-theme-primary font-mono mb-2">{roomId}</p>
                <p>Real-time chat functionality will be added here.</p>
              </div>
            )}
            {activeTab === 'ai' && (
              <div className="text-center text-white/60">
                <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-white">AI Assistant Coming Soon</h3>
                <p>AI-powered assistance will be available here.</p>
              </div>
            )}
            {activeTab === 'whiteboard' && (
              <div className="text-center text-white/60">
                <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-white">Whiteboard Coming Soon</h3>
                <p>Collaborative whiteboard will be implemented here.</p>
              </div>
            )}
            {activeTab === 'tasks' && (
              <div className="text-center text-white/60">
                <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-white">Tasks Coming Soon</h3>
                <p>Task management features will be added here.</p>
              </div>
            )}
            {activeTab === 'files' && (
              <div className="text-center text-white/60">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 text-white">Files Coming Soon</h3>
                <p>File sharing and management will be available here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}