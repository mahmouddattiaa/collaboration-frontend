// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, CheckSquare, Folder, BookOpen, Users, Settings, ChevronLeft, ChevronRight, Video, VideoOff, Timer, Search, Sparkles, Bot, BarChart3, Shield, Brain, Database, Layout, Plus, Calendar, Target, BarChart2, ListTodo } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { useRoom } from '@/hooks/useRoom';
import { useLiveCursors } from '@/hooks/useLiveCursors';
import { usePermissions } from '@/hooks/usePermissions';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';
import { useCompanyWorkspace } from '@/hooks/useCompanyWorkspace';
import { useVideoConference } from '@/hooks/useVideoConference';

import { SidebarItem } from '@/components/common/SidebarItem';
import { SidebarSection } from '@/components/common/SidebarSection';
import { PresenceAvatarGroup } from '@/components/common/PresenceAvatarGroup';
import { CommandPalette } from '@/components/common/CommandPalette';
import { LiveCursor } from '@/components/common/LiveCursor';
import { AIAssistant } from '@/components/common/AIAssistant';
import { AnalyticsDashboard } from '@/components/common/AnalyticsDashboard';
import { AdvancedAnalyticsDashboard } from '@/components/common/AdvancedAnalyticsDashboard';
import { PermissionsManager } from '@/components/common/PermissionsManager';
import { DatabaseView } from '@/components/common/DatabaseView';
import { TemplateGallery } from '@/components/common/TemplateGallery';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';

import { ProjectSwitcher } from '@/components/workspace/ProjectSwitcher';
import { ConferencePanel } from '@/components/workspace/ConferencePanel';
import { CompanyDashboard } from '@/components/workspace/CompanyDashboard';
import { AssignTaskModal } from '@/components/modals/AssignTaskModal';
import { AddProjectModal } from '@/components/modals/AddProjectModal';
import { UpcomingMeetingsModal } from '@/components/modals/UpcomingMeetingsModal';

import { ChatTab } from '@/components/collabUI/tabs/ChatTab';
import { TasksTab } from '@/components/collabUI/tabs/TasksTab';
import { FilesTab } from '@/components/collabUI/tabs/FilesTab';
import { WhiteboardTab } from '@/components/collabUI/tabs/WhiteboardTab';
import { SharedLibraryTab } from '@/components/collabUI/tabs/SharedLibraryTab';
import { SharedAIChatTab } from '@/components/collabUI/tabs/SharedAIChatTab';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { CollaborationProvider, useCollaboration } from "@/contexts/CollaborationContext";
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { CreateRoom } from '@/components/collabUI/modals/CreateRoom';
import { JoinRoom } from '@/components/collabUI/modals/JoinRoom';
import { NotionLikeEditor } from '@/components/collabUI/common/NotionLikeEditor';
import { RealtimeCollaborationIndicator } from '@/components/collabUI/common/RealtimeCollaborationIndicator';
import { TabBar } from '@/components/collabUI/common/TabBar';
import { TabPanel } from '@/components/collabUI/common/TabPanel';
import { ProjectTracker } from '@/components/collabUI/workspace/ProjectTracker';
import { CollaborationLobby } from '@/components/collabUI/common/CollaborationLobby';

class CollaborationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Collaboration Room Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-8 bg-dark text-white">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{this.state.error?.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function CollaborationRoomContent() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const [isConferencePanelOpen, setIsConferencePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    room,
    isLoadingRoom,
    roomError,
    joinRoom,
    leaveRoom,
  } = useCollaboration();

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
    return () => {
      if (roomId) {
        leaveRoom(roomId);
      }
    };
  }, [roomId]);

  if (isLoadingRoom) {
      return (
      <div className="flex items-center justify-center h-screen bg-dark">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-theme-primary"></div>
        </div>
      );
    }

  if (roomError) {
      return (
      <div className="flex flex-col items-center justify-center h-screen p-8 bg-dark text-white">
        <h2 className="text-2xl font-bold mb-4">Error Loading Room</h2>
        <p className="text-gray-400 mb-6">{roomError}</p>
        <Button onClick={() => navigate('/collaboration')}>Return to Lobby</Button>
        </div>
      );
    }

  // Show lobby if no roomId is provided
  if (!roomId) {
    return <CollaborationLobby />;
  }

  return (
    <div className="flex h-screen bg-dark">
      <AnimatedBackground variant="particles" />
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className={cn(
          "bg-dark/50 backdrop-blur-glass border-r border-white/10 flex flex-col transition-all duration-300",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}>
          <div className="flex-1 p-2">
            {/* Navigation Section */}
            <SidebarSection title="Navigation" defaultExpanded={true}>
              <SidebarItem
                icon={<BarChart2 className="w-5 h-5" />}
                label="Dashboard"
                isActive={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
              />
              <SidebarItem
                icon={<Target className="w-5 h-5" />}
                label="Project Tracker"
                isActive={activeTab === 'project-tracker'}
                onClick={() => setActiveTab('project-tracker')}
              />
                <SidebarItem
                icon={<Users className="w-5 h-5" />}
                label="Conference"
                isActive={activeTab === 'conference'}
                onClick={() => setActiveTab('conference')}
                />
                <SidebarItem
                icon={<FileText className="w-5 h-5" />}
                label="Editor"
                isActive={activeTab === 'editor'}
                onClick={() => setActiveTab('editor')}
                />
                <SidebarItem
                icon={<Bot className="w-5 h-5" />}
                label="AI Assistant"
                isActive={activeTab === 'ai'}
                onClick={() => setActiveTab('ai')}
                />
              </SidebarSection>

            <SidebarSection title="Communication" defaultExpanded={true} className="mt-4">
                <SidebarItem
                icon={<MessageSquare className="w-5 h-5" />}
                label="Chat"
                  isActive={activeTab === 'chat'}
                  onClick={() => setActiveTab('chat')}
                />
                <SidebarItem
                icon={<Bot className="w-5 h-5" />}
                label="AI Chat"
                  isActive={activeTab === 'ai-chat'}
                  onClick={() => setActiveTab('ai-chat')}
                />
            </SidebarSection>

            <SidebarSection title="Workspace" defaultExpanded={true} className="mt-4">
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
            </SidebarSection>

            <SidebarSection title="Resources" defaultExpanded={true} className="mt-4">
              <SidebarItem
                icon={<FileText className="w-5 h-5" />}
                  label="Files"
                  isActive={activeTab === 'files'}
                  onClick={() => setActiveTab('files')}
                />
                <SidebarItem
                icon={<BookOpen className="w-5 h-5" />}
                label="Library"
                  isActive={activeTab === 'library'}
                  onClick={() => setActiveTab('library')}
                />
            </SidebarSection>
          </div>

          <Button
            variant="ghost"
            className="p-2 w-full flex justify-center hover:bg-white/5"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 bg-dark/80 backdrop-blur-glass border-b border-white/10">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/collaboration')} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Lobby
              </Button>
              <h1 className="text-xl font-semibold text-white">{room?.name || `Room ${roomId}`}</h1>
              <Badge variant="outline" className="text-xs">
                {roomId}
              </Badge>
            </div>
            <div className="flex items-center gap-6">
              <RealtimeCollaborationIndicator />
              <PresenceAvatarGroup participants={room?.participants} />
              <Button 
                variant="outline"
                  onClick={() => setIsConferencePanelOpen(true)}
                className="border-theme-primary/30 hover:bg-theme-primary/10 text-theme-primary hover:border-theme-primary"
              >
                Join Call
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'chat' && (
              <ChatTab 
                messages={room?.messages || []} 
                onSendMessage={(message) => {
                  // TODO: Implement send message functionality
                  console.log('Sending message:', message);
                }} 
                  />
                )}
            {activeTab === 'ai-chat' && <SharedAIChatTab participants={room?.participants || []} />}
            {activeTab === 'whiteboard' && (
              <WhiteboardTab 
                elements={room?.whiteboardElements || []}
                onUpdateElements={(elements) => {
                  // TODO: Implement whiteboard update functionality
                  console.log('Updating whiteboard:', elements);
                    }}
                  />
            )}
            {activeTab === 'tasks' && (
              <TasksTab 
                tasks={room?.tasks || []}
                onUpdateTask={(taskId, updates) => {
                  // TODO: Implement task update functionality
                  console.log('Updating task:', taskId, updates);
                }}
                onAssignTask={(taskId, userId) => {
                  // TODO: Implement task assignment functionality
                  console.log('Assigning task:', taskId, 'to user:', userId);
                }}
                />
            )}
            {activeTab === 'files' && (
              <FilesTab 
                files={room?.files || []}
                onUploadFile={(file) => {
                  // TODO: Implement file upload functionality
                  console.log('Uploading file:', file);
                }}
                />
            )}
            {activeTab === 'library' && (
              <SharedLibraryTab 
                files={room?.libraryFiles || []}
                onFileSelect={(fileId) => {
                  // TODO: Implement file selection functionality
                  console.log('Selected file:', fileId);
                }}
                onFileUpload={(file) => {
                  // TODO: Implement file upload functionality
                  console.log('Uploading file:', file);
                }}
              />
            )}
            {activeTab === 'dashboard' && <CompanyDashboard dashboardName={room?.dashboardName} />}
            {activeTab === 'project-tracker' && <ProjectTracker />}
            {activeTab === 'conference' && <ConferencePanel />}
            {activeTab === 'editor' && <NotionLikeEditor />}
            {activeTab === 'ai' && <AIAssistant />}
          </div>
        </div>
      </div>

      {/* Conference Panel */}
      <ConferencePanel
        isOpen={isConferencePanelOpen}
        onClose={() => setIsConferencePanelOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}

export default function CollaborationRoomPage() {
  return (
    <CollaborationErrorBoundary>
    <CollaborationProvider>
        <CollaborationRoomContent />
    </CollaborationProvider>
    </CollaborationErrorBoundary>
  );
}