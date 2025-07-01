import React from 'react';
import { Badge } from '@/components/ui/badge';

export function ProjectTracker() {
  // Mock data for projects
  const projects = [
    {
      id: 'proj-1',
      name: 'Website Redesign',
      description: 'Redesign of the company website with modern UI/UX principles',
      progress: 65,
      status: 'In Progress',
      priority: 'High',
      dueDate: '2023-07-15',
      tasks: [
        { id: 'task-1', name: 'Wireframing', status: 'Completed' },
        { id: 'task-2', name: 'Design System Creation', status: 'Completed' },
        { id: 'task-3', name: 'Frontend Development', status: 'In Progress' },
        { id: 'task-4', name: 'Backend Integration', status: 'Not Started' },
        { id: 'task-5', name: 'Testing & QA', status: 'Not Started' },
      ]
    },
    {
      id: 'proj-2',
      name: 'Mobile App Development',
      description: 'iOS and Android app for customers',
      progress: 30,
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2023-08-30',
      tasks: [
        { id: 'task-6', name: 'Requirements Gathering', status: 'Completed' },
        { id: 'task-7', name: 'App Architecture', status: 'Completed' },
        { id: 'task-8', name: 'UI Design', status: 'In Progress' },
        { id: 'task-9', name: 'Core Features Development', status: 'Not Started' },
        { id: 'task-10', name: 'Testing', status: 'Not Started' },
      ]
    },
    {
      id: 'proj-3',
      name: 'Content Marketing Campaign',
      description: 'Q3 marketing campaign focusing on content distribution',
      progress: 10,
      status: 'Just Started',
      priority: 'Medium',
      dueDate: '2023-09-15',
      tasks: [
        { id: 'task-11', name: 'Strategy Development', status: 'In Progress' },
        { id: 'task-12', name: 'Content Creation', status: 'Not Started' },
        { id: 'task-13', name: 'Channel Optimization', status: 'Not Started' },
        { id: 'task-14', name: 'Performance Tracking', status: 'Not Started' },
      ]
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Project Tracker</h2>
      
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-dark/30 border border-white/10 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p className="text-white/60 text-sm">{project.description}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        
        <div className="flex gap-4 mt-4 text-sm">
          <div>
            <span className="text-white/60">Due:</span> {formatDate(project.dueDate)}
          </div>
          <div>
            <span className="text-white/60">Priority:</span> {project.priority}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-theme-primary h-2 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 p-4">
        <h4 className="font-medium mb-3">Tasks</h4>
        <div className="space-y-2">
          {project.tasks.map((task: any) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className={`w-3 h-3 rounded-full mr-2 ${
                    task.status === 'Completed' ? 'bg-theme-emerald' : 
                    task.status === 'In Progress' ? 'bg-theme-yellow' : 
                    'bg-white/30'
                  }`}
                ></div>
                <span className="text-sm">{task.name}</span>
              </div>
              <span className="text-xs text-white/60">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: 'default' | 'secondary' | 'outline' = 'default';
  
  switch (status) {
    case 'Completed':
      return <Badge className="bg-theme-emerald">Completed</Badge>;
    case 'In Progress':
      return <Badge className="bg-theme-yellow text-black">In Progress</Badge>;
    case 'Just Started':
      return <Badge className="bg-theme-primary">Just Started</Badge>;
    case 'On Hold':
      return <Badge className="bg-theme-gray">On Hold</Badge>;
    default:
      return <Badge variant={variant}>{status}</Badge>;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
} 