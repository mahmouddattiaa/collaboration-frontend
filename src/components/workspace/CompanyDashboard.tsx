import React, { useState } from 'react';
import { BarChart, Users, FileText, Clock, Calendar, Target, Briefcase, Zap, TrendingUp, Layers, Settings, Bell, Plus, MessageSquare, Code, Database, Shield } from 'lucide-react';
import { TabBar } from '@/components/collabUI/common/TabBar';
import { TabPanel } from '@/components/collabUI/common/TabPanel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CompanyDashboardProps {
  dashboardName?: string;
}

export function CompanyDashboard({ dashboardName = "Company Dashboard" }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <Database className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full space-y-6 bg-gradient-to-br from-theme-dark via-theme-darker to-theme-dark/90 min-h-screen p-6 backdrop-blur-lg">
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg backdrop-blur-md border border-white/10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent">{dashboardName}</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10">
            <Bell className="w-4 h-4" />
          </Button>
          <Button className="bg-gradient-to-r from-theme-primary to-theme-secondary hover:from-theme-primary-dark hover:to-theme-secondary">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      <TabBar 
        tabs={tabs} 
        activeTabId={activeTab} 
        onChange={setActiveTab} 
        className="bg-white/5 backdrop-blur-md rounded-lg p-1 border border-white/10"
      />

      <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6">
        <TabPanel active={activeTab === 'overview'}>
          <OverviewTab />
        </TabPanel>

        <TabPanel active={activeTab === 'projects'}>
          <ProjectsTab />
        </TabPanel>

        <TabPanel active={activeTab === 'analytics'}>
          <AnalyticsTab />
        </TabPanel>

        <TabPanel active={activeTab === 'team'}>
          <TeamTab />
        </TabPanel>

        <TabPanel active={activeTab === 'resources'}>
          <ResourcesTab />
        </TabPanel>

        <TabPanel active={activeTab === 'security'}>
          <SecurityTab />
        </TabPanel>

        <TabPanel active={activeTab === 'settings'}>
          <SettingsTab />
        </TabPanel>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          icon={<Users className="h-6 w-6" />} 
          title="Team Members" 
          value="5" 
          change="+1" 
          isPositive={true} 
        />
        
        <StatCard 
          icon={<FileText className="h-6 w-6" />} 
          title="Active Projects" 
          value="3" 
          change="-1" 
          isPositive={false} 
        />
        
        <StatCard 
          icon={<Clock className="h-6 w-6" />} 
          title="Hours Tracked" 
          value="128" 
          change="+12" 
          isPositive={true} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button className="text-sm text-theme-primary hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem 
              icon={<FileText className="h-4 w-4" />} 
              title="Design Review Document Updated" 
              time="2 hours ago"
              user="Sarah Johnson" 
            />
            
            <ActivityItem 
              icon={<Users className="h-4 w-4" />} 
              title="New Team Member Added" 
              time="Yesterday"
              user="Admin" 
            />
            
            <ActivityItem 
              icon={<Target className="h-4 w-4" />} 
              title="Project Milestone Completed" 
              time="2 days ago"
              user="Dev Team" 
            />
          </div>
        </div>
        
        <div className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Events</h3>
            <button className="text-sm text-theme-primary hover:underline">View Calendar</button>
          </div>
          
          <div className="space-y-4">
            <EventItem 
              title="Weekly Team Meeting" 
              date="Tomorrow, 10:00 AM" 
              attendees={4} 
            />
            
            <EventItem 
              title="Project Review" 
              date="Jun 18, 2:30 PM" 
              attendees={6} 
            />
            
            <EventItem 
              title="Client Presentation" 
              date="Jun 24, 11:00 AM" 
              attendees={3} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Active Projects</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4">
        {[
          {
            name: 'Website Redesign',
            progress: 75,
            status: 'In Progress',
            team: ['John D.', 'Sarah K.', 'Mike R.'],
            dueDate: '2024-04-15'
          },
          {
            name: 'Mobile App Development',
            progress: 45,
            status: 'In Progress',
            team: ['Emily L.', 'Chris P.'],
            dueDate: '2024-05-01'
          },
          {
            name: 'Marketing Campaign',
            progress: 90,
            status: 'Review',
            team: ['Lisa M.', 'Tom B.', 'Anna S.'],
            dueDate: '2024-03-30'
          }
        ].map((project, index) => (
          <div key={index} className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{project.name}</h4>
              <span className="text-xs bg-theme-primary/20 text-theme-primary px-2 py-1 rounded-full">
                {project.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div 
                    className="h-2 bg-theme-primary rounded-full transition-all" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full bg-theme-primary/20 border-2 border-dark flex items-center justify-center text-xs"
                      title={member}
                    >
                      {member[0]}
                    </div>
                  ))}
                </div>
                <span className="text-white/60">
                  Due {new Date(project.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  // Placeholder data for project analytics
  const projectAnalyticsData = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    overallProgress: 65, // percentage
    tasksCompleted: 150,
    tasksPending: 75,
    upcomingDeadlines: 3, // Number of projects/tasks due soon
    issuesReported: 12,
  };

  const projectsSummary = [
    { id: 'proj1', name: 'Project Alpha', status: 'On Track', progress: 80, tasks: 25, deadline: '2024-07-15', teamSize: 5 },
    { id: 'proj2', name: 'Project Beta', status: 'At Risk', progress: 45, tasks: 40, deadline: '2024-08-01', teamSize: 7 },
    { id: 'proj3', name: 'Project Gamma', status: 'Delayed', progress: 30, tasks: 30, deadline: '2024-06-30', teamSize: 4 },
    { id: 'proj4', name: 'Project Delta', status: 'Completed', progress: 100, tasks: 20, deadline: '2024-05-20', teamSize: 6 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsMetricCard
          title="Total Projects"
          value={projectAnalyticsData.totalProjects.toString()}
          icon={<Briefcase className="w-6 h-6 text-theme-primary" />}
        />
        <AnalyticsMetricCard
          title="Active Projects"
          value={projectAnalyticsData.activeProjects.toString()}
          icon={<Zap className="w-6 h-6 text-theme-secondary" />}
        />
        <AnalyticsMetricCard
          title="Overall Progress"
          value={`${projectAnalyticsData.overallProgress}%`}
          icon={<TrendingUp className="w-6 h-6 text-theme-emerald" />}
        />
        <AnalyticsMetricCard
          title="Issues Reported"
          value={projectAnalyticsData.issuesReported.toString()}
          icon={<Shield className="w-6 h-6 text-theme-red" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-widget p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Project Status Distribution</h3>
          <div className="h-72 flex items-center justify-center text-white/40">
            Chart placeholder - e.g., Pie chart for On Track, At Risk, Delayed
          </div>
        </div>
        <div className="dashboard-widget p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Task Completion Trends</h3>
          <div className="h-72 flex items-center justify-center text-white/40">
            Chart placeholder - e.g., Line chart for tasks completed over time
          </div>
        </div>
      </div>

      {/* Project Summary Table/List */}
      <div className="dashboard-widget p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Projects Overview</h3>
          <Button variant="outline" size="sm" className="text-sm">View All Projects</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-white/70">
                <th className="py-3 px-4 font-normal">Project Name</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal">Progress</th>
                <th className="py-3 px-4 font-normal">Tasks</th>
                <th className="py-3 px-4 font-normal">Deadline</th>
                <th className="py-3 px-4 font-normal text-right">Team Size</th>
              </tr>
            </thead>
            <tbody>
              {projectsSummary.map((project) => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">{project.name}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      project.status === 'On Track' && "bg-theme-emerald/20 text-theme-emerald",
                      project.status === 'At Risk' && "bg-theme-yellow/20 text-theme-yellow",
                      project.status === 'Delayed' && "bg-theme-red/20 text-theme-red",
                      project.status === 'Completed' && "bg-theme-gray/20 text-theme-gray"
                    )}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className={cn("h-2.5 rounded-full", project.progress === 100 ? "bg-theme-emerald" : "bg-theme-primary")}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-1">{project.progress}%</span>
                  </td>
                  <td className="py-3 px-4">{project.tasks}</td>
                  <td className="py-3 px-4">{project.deadline}</td>
                  <td className="py-3 px-4 text-right">{project.teamSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Helper component for metric cards in AnalyticsTab
function AnalyticsMetricCard({ title, value, icon, description }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="dashboard-widget p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-white/70 font-medium">{title}</h4>
          {icon}
        </div>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
      </div>
      {description && <p className="text-xs text-white/50">{description}</p>}
    </div>
  );
}


function TeamTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4">
        {[
          {
            name: 'John Doe',
            role: 'Lead Developer',
            avatar: '',
            status: 'online',
            projects: 3,
            tasks: 8
          },
          {
            name: 'Sarah Smith',
            role: 'UI/UX Designer',
            avatar: '',
            status: 'away',
            projects: 2,
            tasks: 5
          },
          {
            name: 'Mike Johnson',
            role: 'Project Manager',
            avatar: '',
            status: 'offline',
            projects: 4,
            tasks: 12
          }
        ].map((member, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-theme-primary/20 flex items-center justify-center text-lg font-medium">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-white/60">{member.role}</p>
              </div>
              <div className={cn(
                'ml-auto px-2 py-1 rounded-full text-xs',
                member.status === 'online' ? 'bg-theme-emerald/20 text-theme-emerald' :
                member.status === 'away' ? 'bg-theme-yellow/20 text-theme-yellow' :
                'bg-theme-gray/20 text-theme-gray'
              )}>
                {member.status}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <span className="text-white/60">Active Projects</span>
                <div className="text-lg font-medium">{member.projects}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <span className="text-white/60">Pending Tasks</span>
                <div className="text-lg font-medium">{member.tasks}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resources</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: 'Documentation',
            icon: <FileText className="w-6 h-6" />,
            count: 24,
            color: 'theme-primary'
          },
          {
            title: 'Code Snippets',
            icon: <Code className="w-6 h-6" />,
            count: 156,
            color: 'theme-secondary'
          },
          {
            title: 'Team Chat',
            icon: <MessageSquare className="w-6 h-6" />,
            count: 3,
            color: 'theme-emerald'
          }
        ].map((resource, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className={`w-12 h-12 rounded-lg bg-${resource.color}/20 flex items-center justify-center mb-4`}>
              {resource.icon}
            </div>
            <h4 className="font-medium">{resource.title}</h4>
            <div className="mt-2 text-2xl font-bold">{resource.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Security Settings</h3>
        <Button variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          Security Audit
        </Button>
      </div>

      <div className="space-y-4">
        {[
          {
            title: 'Two-Factor Authentication',
            description: 'Add an extra layer of security to your account',
            enabled: true
          },
          {
            title: 'Password Policy',
            description: 'Enforce strong password requirements',
            enabled: true
          },
          {
            title: 'Activity Monitoring',
            description: 'Track and log all user activities',
            enabled: false
          }
        ].map((setting, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{setting.title}</h4>
                <p className="text-sm text-white/60">{setting.description}</p>
              </div>
              <div className={cn(
                'px-3 py-1 rounded-full text-xs',
                setting.enabled ? 'bg-theme-emerald/20 text-theme-emerald' : 'bg-theme-gray/20 text-theme-gray'
              )}>
                {setting.enabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg divide-y divide-white/10">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">Company Information</h3>
          <p className="text-sm text-white/60">Update your company's basic information</p>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">Team Management</h3>
          <p className="text-sm text-white/60">Manage team members and roles</p>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">Notifications</h3>
          <p className="text-sm text-white/60">Configure notification preferences</p>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">Integrations</h3>
          <p className="text-sm text-white/60">Manage connected services and tools</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, isPositive }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-dark/40 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60">{title}</span>
        <span className="bg-white/10 p-2 rounded-full">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm ${isPositive ? 'text-theme-emerald' : 'text-theme-red'}`}>
          {change}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive }: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-dark/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <h3 className="text-white/60 text-sm mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className={`text-sm ${isPositive ? 'text-theme-emerald' : 'text-theme-red'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, user }: {
  icon: React.ReactNode;
  title: string;
  time: string;
  user: string;
}) {
  return (
    <div className="flex items-start group hover:bg-white/5 p-2 rounded-lg transition-colors">
      <div className="bg-white/10 p-2 rounded-full mr-3 group-hover:bg-white/20">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-white/60">
          {time} • {user}
        </div>
      </div>
    </div>
  );
}

function EventItem({ title, date, attendees }: {
  title: string;
  date: string;
  attendees: number;
}) {
  return (
    <div className="flex items-start group hover:bg-white/5 p-2 rounded-lg transition-colors">
      <div className="bg-theme-primary/20 p-2 rounded-lg mr-3 text-theme-primary group-hover:bg-theme-primary/30">
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-white/60">{date}</div>
      </div>
      <div className="bg-white/10 text-xs px-2 py-1 rounded-full group-hover:bg-white/20">
        {attendees} attendees
      </div>
    </div>
  );
} 