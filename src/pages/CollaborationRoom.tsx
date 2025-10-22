// @ts-nocheck
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MessageSquare, FileText, CheckSquare, Folder, BookOpen, Users, Settings, ChevronLeft, ChevronRight, Video, VideoOff, Timer, Search, Sparkles, Bot, BarChart3, Shield, Brain, Database, Layout, Plus, Calendar, Target, BarChart2, ListTodo, Trash2, Send, Tag, Filter, Star, Clock, Lightbulb, Zap, TrendingUp, Archive, Edit2, Copy, CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { SidebarItem } from '@/components/common/SidebarItem';
import { SidebarSection } from '@/components/common/SidebarSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { TaskManager } from '@/components/workspace/TaskManager';

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
  const [isConferencePanelOpen, setIsConferencePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Brain Dump State Management
  const [brainDumpIdea, setBrainDumpIdea] = useState('');
  const [brainDumpList, setBrainDumpList] = useState([]);
  const [brainDumpCategory, setBrainDumpCategory] = useState('idea');
  const [brainDumpSearch, setBrainDumpSearch] = useState('');
  const [brainDumpFilter, setBrainDumpFilter] = useState('all');
  const [brainDumpStarred, setBrainDumpStarred] = useState(new Set());

  // Load brain dump ideas from localStorage on component mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem(`brain-dump-${roomId}`);
    const savedStarred = localStorage.getItem(`brain-dump-starred-${roomId}`);
    if (savedIdeas) {
      setBrainDumpList(JSON.parse(savedIdeas));
    }
    if (savedStarred) {
      setBrainDumpStarred(new Set(JSON.parse(savedStarred)));
    }
  }, [roomId]);

  // Save brain dump ideas to localStorage whenever they change
  useEffect(() => {
    if (brainDumpList.length > 0) {
      localStorage.setItem(`brain-dump-${roomId}`, JSON.stringify(brainDumpList));
    }
  }, [brainDumpList, roomId]);

  // Save starred items
  useEffect(() => {
    if (brainDumpStarred.size > 0) {
      localStorage.setItem(`brain-dump-starred-${roomId}`, JSON.stringify([...brainDumpStarred]));
    } else {
      localStorage.removeItem(`brain-dump-starred-${roomId}`);
    }
  }, [brainDumpStarred, roomId]);

  // Brain Dump Functions - Memoized to prevent recreation on every render
  const handleAddBrainDump = useCallback(() => {
    if (brainDumpIdea.trim()) {
      const newIdea = {
        id: Date.now(),
        text: brainDumpIdea,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toLocaleString(),
        category: brainDumpCategory,
        starred: false
      };
      setBrainDumpList(prev => [newIdea, ...prev]);
      setBrainDumpIdea('');
      setBrainDumpCategory('idea');
    }
  }, [brainDumpIdea, brainDumpCategory]);

  const handleDeleteBrainDump = useCallback((id) => {
    setBrainDumpList(prev => {
      const newList = prev.filter(idea => idea.id !== id);
      // If list becomes empty, clear localStorage
      if (newList.length === 0) {
        localStorage.removeItem(`brain-dump-${roomId}`);
      }
      return newList;
    });
    setBrainDumpStarred(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, [roomId]);

  const handleToggleStar = useCallback((id) => {
    setBrainDumpStarred(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleConvertToTask = useCallback((idea) => {
    // Switch to tasks tab and prepare task
    setActiveTab('tasks');
    // You can enhance this later to pre-fill task data
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddBrainDump();
    }
  }, [handleAddBrainDump]);

  // Filter and search brain dumps
  const filteredBrainDumps = useMemo(() => {
    let filtered = brainDumpList;

    // Apply category filter
    if (brainDumpFilter !== 'all') {
      if (brainDumpFilter === 'starred') {
        filtered = filtered.filter(idea => brainDumpStarred.has(idea.id));
      } else {
        filtered = filtered.filter(idea => idea.category === brainDumpFilter);
      }
    }

    // Apply search
    if (brainDumpSearch.trim()) {
      const searchLower = brainDumpSearch.toLowerCase();
      filtered = filtered.filter(idea => 
        idea.text.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [brainDumpList, brainDumpFilter, brainDumpSearch, brainDumpStarred]);

  // Brain dump statistics
  const brainDumpStats = useMemo(() => {
    return {
      total: brainDumpList.length,
      starred: brainDumpStarred.size,
      ideas: brainDumpList.filter(i => i.category === 'idea').length,
      questions: brainDumpList.filter(i => i.category === 'question').length,
      insights: brainDumpList.filter(i => i.category === 'insight').length,
      todos: brainDumpList.filter(i => i.category === 'todo').length,
    };
  }, [brainDumpList, brainDumpStarred]);

  // Memoize room object to prevent recreating on every render
  const room = useMemo(() => ({ 
    name: `Room ${roomId}`, 
    participants: [] 
  }), [roomId]);

  if (!roomId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-dark text-white">
        <h2 className="text-2xl font-bold mb-4">No Room Found</h2>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-dark via-dark-secondary to-dark opacity-50 pointer-events-none" />
      
      {/* Main Content */}
      <div className="flex-1 flex relative z-10 w-full">
        {/* Sidebar */}
        <div className={cn(
          "bg-dark/50 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 flex-shrink-0",
          isSidebarCollapsed ? "w-16" : "w-64",
          "max-md:absolute max-md:left-0 max-md:top-0 max-md:h-full max-md:z-20",
          isSidebarCollapsed && "max-md:-translate-x-full"
        )}>
          <div className="flex-1 p-2 overflow-y-auto">{/* Navigation Section */}
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
              <SidebarItem
                icon={<Brain className="w-5 h-5" />}
                label="Brain Dump"
                isActive={activeTab === 'brain-dump'}
                onClick={() => setActiveTab('brain-dump')}
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
            className="p-2 w-full flex justify-center hover:bg-white/5 flex-shrink-0"
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
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-dark/80 backdrop-blur-xl border-b border-white/10 gap-3 sm:gap-0 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')} 
                className="gap-2 text-sm sm:text-base"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold text-white truncate">{room?.name || `Room ${roomId}`}</h1>
              <Badge variant="outline" className="text-xs text-theme-primary border-theme-primary hidden sm:inline-flex">
                {roomId}
              </Badge>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm text-white/60">Connected</span>
              </div>
              <Button 
                variant="outline"
                onClick={() => setIsConferencePanelOpen(true)}
                className="border-theme-primary/30 hover:bg-theme-primary/10 text-theme-primary hover:border-theme-primary text-sm"
                size="sm"
              >
                <Video className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Join Call</span>
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {activeTab === 'chat' && (
              <div className="text-center text-white/60">
                <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">💬 Real-time Chat</h3>
                <p className="text-sm sm:text-base">Chat functionality will be implemented here</p>
              </div>
            )}
            {activeTab === 'ai-chat' && (
              <div className="text-center text-white/60">
                <Bot className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">🤖 AI Chat</h3>
                <p className="text-sm sm:text-base">Shared AI assistant for the team</p>
              </div>
            )}
            {activeTab === 'whiteboard' && (
              <div className="text-center text-white/60">
                <Layout className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">🎨 Collaborative Whiteboard</h3>
                <p className="text-sm sm:text-base">Draw and brainstorm together in real-time</p>
              </div>
            )}
            {activeTab === 'tasks' && (
              <TaskManager roomId={roomId} />
            )}
            {activeTab === 'files' && (
              <div className="text-center text-white/60">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">📁 File Sharing</h3>
                <p className="text-sm sm:text-base">Share and collaborate on files</p>
              </div>
            )}
            {activeTab === 'library' && (
              <div className="text-center text-white/60">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">📚 Shared Library</h3>
                <p className="text-sm sm:text-base">Team knowledge base and resources</p>
              </div>
            )}
            {activeTab === 'dashboard' && (
              <div className="text-center text-white/60">
                <BarChart2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">📊 Dashboard</h3>
                <p className="text-theme-primary font-mono mb-4 text-sm sm:text-base">🎉 Successfully joined room: {roomId}</p>
                <p className="text-sm sm:text-base">Company dashboard and analytics</p>
              </div>
            )}
            {activeTab === 'project-tracker' && (
              <div className="text-center text-white/60">
                <Target className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">🎯 Project Tracker</h3>
                <p className="text-sm sm:text-base">Track project progress and milestones</p>
              </div>
            )}
            {activeTab === 'conference' && (
              <div className="text-center text-white/60">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">🎥 Conference</h3>
                <p className="text-sm sm:text-base">Video conferencing and screen sharing</p>
              </div>
            )}
            {activeTab === 'editor' && (
              <div className="text-center text-white/60">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">📝 Notion-like Editor</h3>
                <p className="text-sm sm:text-base">Collaborative document editing</p>
              </div>
            )}
            {activeTab === 'ai' && (
              <div className="text-center text-white/60">
                <Bot className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">🧠 AI Assistant</h3>
                <p className="text-sm sm:text-base">AI-powered productivity assistant</p>
              </div>
            )}
            {activeTab === 'brain-dump' && (
              <div className="max-w-6xl mx-auto">
                {/* Header with Gradient */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50 animate-pulse" />
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Brain Dump
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 mt-1">
                        Capture thoughts, organize ideas, transform into actions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl border border-purple-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.total}</span>
                    </div>
                    <p className="text-xs text-white/60">Total Ideas</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-xl border border-yellow-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.starred}</span>
                    </div>
                    <p className="text-xs text-white/60">Starred</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.ideas}</span>
                    </div>
                    <p className="text-xs text-white/60">Ideas</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.todos}</span>
                    </div>
                    <p className="text-xs text-white/60">To-Dos</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-xl border border-orange-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.insights}</span>
                    </div>
                    <p className="text-xs text-white/60">Insights</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-xl border border-pink-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                      <span className="text-lg sm:text-2xl font-bold text-white">{brainDumpStats.questions}</span>
                    </div>
                    <p className="text-xs text-white/60">Questions</p>
                  </div>
                </div>

                {/* Input Area - Enhanced */}
                <div className="bg-gradient-to-br from-dark-secondary/80 to-dark/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 mb-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                    <h3 className="text-base sm:text-lg font-semibold text-white">What's on your mind?</h3>
                  </div>
                  
                  {/* Category Selection */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { id: 'idea', label: 'Idea', icon: Lightbulb, color: 'blue' },
                      { id: 'todo', label: 'To-Do', icon: CheckCircle, color: 'green' },
                      { id: 'insight', label: 'Insight', icon: TrendingUp, color: 'orange' },
                      { id: 'question', label: 'Question', icon: MessageSquare, color: 'pink' }
                    ].map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setBrainDumpCategory(cat.id)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                            brainDumpCategory === cat.id
                              ? `bg-${cat.color}-500/30 border-${cat.color}-500/50 text-${cat.color}-300 border-2`
                              : "bg-dark/50 border border-white/10 text-white/60 hover:bg-white/5"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  <textarea
                    value={brainDumpIdea}
                    onChange={(e) => setBrainDumpIdea(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your thoughts freely... No judgement, no pressure. Just let it flow. 💭"
                    className="w-full bg-dark/70 text-white placeholder:text-white/30 border border-white/10 rounded-lg p-4 min-h-[100px] sm:min-h-[140px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none text-sm sm:text-base transition-all"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-white/40">
                      <span>{brainDumpIdea.length} characters</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-purple-400">Ctrl+Enter to save</span>
                    </div>
                    <Button
                      onClick={handleAddBrainDump}
                      disabled={!brainDumpIdea.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Capture Idea
                    </Button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      value={brainDumpSearch}
                      onChange={(e) => setBrainDumpSearch(e.target.value)}
                      placeholder="Search your ideas..."
                      className="pl-10 bg-dark-secondary/50 border-white/10 text-white placeholder:text-white/40 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    {[
                      { id: 'all', label: 'All', icon: Filter },
                      { id: 'starred', label: 'Starred', icon: Star },
                      { id: 'idea', label: 'Ideas', icon: Lightbulb },
                      { id: 'todo', label: 'To-Dos', icon: CheckCircle },
                      { id: 'insight', label: 'Insights', icon: TrendingUp },
                      { id: 'question', label: 'Questions', icon: MessageSquare }
                    ].map((filter) => {
                      const Icon = filter.icon;
                      return (
                        <Button
                          key={filter.id}
                          variant={brainDumpFilter === filter.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setBrainDumpFilter(filter.id)}
                          className={cn(
                            "text-xs",
                            brainDumpFilter === filter.id && "bg-purple-500 hover:bg-purple-600"
                          )}
                        >
                          <Icon className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">{filter.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Ideas List */}
                <div className="space-y-4">
                  {filteredBrainDumps.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
                        <Brain className="w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-20 relative z-10" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        {brainDumpList.length === 0 ? "Your mind is clear!" : "No matching ideas"}
                      </h3>
                      <p className="text-sm sm:text-base text-white/40">
                        {brainDumpList.length === 0 
                          ? "Start capturing your brilliant thoughts and ideas here" 
                          : "Try adjusting your filters or search terms"}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      {filteredBrainDumps.map((idea) => {
                        const isStarred = brainDumpStarred.has(idea.id);
                        const categoryConfig = {
                          idea: { color: 'blue', icon: Lightbulb, gradient: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
                          todo: { color: 'green', icon: CheckCircle, gradient: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30' },
                          insight: { color: 'orange', icon: TrendingUp, gradient: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30' },
                          question: { color: 'pink', icon: MessageSquare, gradient: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/30' }
                        };
                        const config = categoryConfig[idea.category] || categoryConfig.idea;
                        const CategoryIcon = config.icon;
                        
                        return (
                          <div
                            key={idea.id}
                            className={cn(
                              "bg-gradient-to-br backdrop-blur-xl border rounded-xl p-4 sm:p-5 transition-all group hover:scale-[1.02] hover:shadow-xl",
                              config.gradient,
                              config.border,
                              isStarred && "ring-2 ring-yellow-400/50"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <CategoryIcon className={`w-4 h-4 sm:w-5 sm:h-5 text-${config.color}-400`} />
                                <Badge variant="outline" className={`text-xs border-${config.color}-500/50 text-${config.color}-400`}>
                                  {idea.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleStar(idea.id)}
                                  className={cn(
                                    "transition-all h-8 w-8 p-0",
                                    isStarred ? "text-yellow-400" : "text-white/40 opacity-0 group-hover:opacity-100"
                                  )}
                                >
                                  <Star className={cn("w-4 h-4", isStarred && "fill-current")} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteBrainDump(idea.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-white text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed mb-3">
                              {idea.text}
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-white/10">
                              <div className="flex items-center gap-2 text-xs text-white/40">
                                <Clock className="w-3 h-3" />
                                <span>{idea.createdAt}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleConvertToTask(idea)}
                                className="text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 h-7 px-2"
                              >
                                <CheckSquare className="w-3 h-3 mr-1" />
                                Convert to Task
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conference Panel Placeholder */}
      {isConferencePanelOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-secondary p-6 rounded-lg border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">Conference Panel</h3>
            <p className="text-white/60 mb-4">Video conference will be implemented here</p>
            <Button onClick={() => setIsConferencePanelOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollaborationRoomPage() {
  return (
    <CollaborationErrorBoundary>
      <CollaborationRoomContent />
    </CollaborationErrorBoundary>
  );
}