import React, { useState } from 'react'; // Added useState
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added Button
import { Plus, X } from 'lucide-react'; // Added Icons
import { Input } from '@/components/ui/input'; // Added Input
import { Textarea } from '@/components/ui/textarea'; // Added Textarea (assuming it exists or will be created)

// Initial mock data for projects
const initialProjects = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Redesign of the company website with modern UI/UX principles',
    progress: 65,
    status: 'In Progress',
    priority: 'High',
    dueDate: '2023-07-15',
    team: ['Alice', 'Bob', 'Charlie'], // Added team
    tasks: [
      { id: 'task-1', name: 'Wireframing', status: 'Completed', assignedTo: ['Alice'], deadline: '2023-06-01' },
      { id: 'task-2', name: 'Design System Creation', status: 'Completed', assignedTo: ['Bob'], deadline: '2023-06-15' },
      { id: 'task-3', name: 'Frontend Development', status: 'In Progress', assignedTo: ['Charlie', 'Alice'], deadline: '2023-07-10' },
      { id: 'task-4', name: 'Backend Integration', status: 'Not Started', assignedTo: ['David'], deadline: '2023-07-20' },
      { id: 'task-5', name: 'Testing & QA', status: 'Not Started', assignedTo: ['Eve'], deadline: '2023-07-25' },
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
    team: ['Sarah', 'Mike'], // Added team
    tasks: [
      { id: 'task-6', name: 'Requirements Gathering', status: 'Completed', assignedTo: ['Sarah'], deadline: '2023-07-01' },
      { id: 'task-7', name: 'App Architecture', status: 'Completed', assignedTo: ['Mike'], deadline: '2023-07-15' },
      { id: 'task-8', name: 'UI Design', status: 'In Progress', assignedTo: ['Sarah'], deadline: '2023-08-01' },
      { id: 'task-9', name: 'Core Features Development', status: 'Not Started', assignedTo: ['Mike', 'Liam'], deadline: '2023-08-20' },
      { id: 'task-10', name: 'Testing', status: 'Not Started', assignedTo: ['Olivia'], deadline: '2023-08-28' },
    ]
  },
  // ... (rest of the mock data, ensure it includes new fields if necessary)
];

interface Task {
  id: string;
  name: string;
  assignedTo: string[];
  deadline: string;
  // status will be 'Not Started' by default for new tasks
}

interface Project {
  id: string;
  name: string;
  description: string;
  team: string[];
  dueDate: string;
  tasks: Task[];
  // progress and status will be calculated or set to defaults
  progress?: number;
  status?: string;
  priority?: string;
}

export function ProjectTracker() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleAddProject = (newProject: Project) => {
    setProjects(prevProjects => [
      ...prevProjects,
      {
        ...newProject,
        id: `proj-${Date.now()}`,
        progress: 0, // Default progress
        status: 'Not Started', // Default status
        priority: newProject.priority || 'Medium', // Default priority
      }
    ]);
    setShowAddProjectModal(false);
  };

  return (
    <div className="w-full p-6 bg-dark-secondary rounded-lg shadow-lg"> {/* Added padding and styling */}
      <div className="flex items-center justify-between mb-8"> {/* Increased margin-bottom */}
        <h2 className="text-3xl font-bold text-white">Project Tracker</h2> {/* Increased font size */}
        <Button
          onClick={() => setShowAddProjectModal(true)}
          className="bg-gradient-to-r from-theme-primary to-theme-secondary hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </Button>
      </div>
      
      <div className="space-y-8"> {/* Increased spacing */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {showAddProjectModal && (
        <AddProjectModal
          onClose={() => setShowAddProjectModal(false)}
          onAddProject={handleAddProject}
        />
      )}
    </div>
  );
}

// ... (ProjectCard, StatusBadge, formatDate remain mostly the same, but may need minor adjustments for new data like 'team')
// For example, ProjectCard might display team members.
// The ProjectCard, StatusBadge, and formatDate functions are below the AddProjectModal.
// I will adjust ProjectCard now to reflect the new data structure.

// ######################################
// AddProjectModal Component Definition
// ######################################

interface AddProjectModalProps {
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

function AddProjectModal({ onClose, onAddProject }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [assignedTeam, setAssignedTeam] = useState(''); // Comma-separated string
  const [projectDueDate, setProjectDueDate] = useState('');

  const [tasks, setTasks] = useState<Array<Partial<Task> & { tempId: number }>>([
    { tempId: Date.now(), name: '', assignedTo: [], deadline: '' }
  ]);

  const handleAddTask = () => {
    setTasks([...tasks, { tempId: Date.now(), name: '', assignedTo: [], deadline: '' }]);
  };

  const handleRemoveTask = (tempId: number) => {
    setTasks(tasks.filter(task => task.tempId !== tempId));
  };

  const handleTaskChange = (tempId: number, field: keyof Task, value: string | string[]) => {
    setTasks(tasks.map(task =>
      task.tempId === tempId ? { ...task, [field]: value } : task
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !projectDueDate.trim()) {
      // Basic validation
      alert("Project Name and Project Due Date are required.");
      return;
    }

    const newProject: Project = {
      id: '', // Will be set in ProjectTracker
      name: projectName,
      description: projectDescription,
      team: assignedTeam.split(',').map(s => s.trim()).filter(s => s),
      dueDate: projectDueDate,
      tasks: tasks.map(task => ({
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Temporary unique ID
        name: task.name || 'Untitled Task',
        assignedTo: Array.isArray(task.assignedTo) ? task.assignedTo : (task.assignedTo as string || '').split(',').map(s => s.trim()).filter(s => s),
        deadline: task.deadline || '',
        status: 'Not Started'
      })).filter(task => task.name !== 'Untitled Task' || task.deadline) // Filter out empty tasks
    };
    onAddProject(newProject);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-dark-secondary rounded-xl shadow-2xl w-full max-w-2xl p-8 border border-white/10 my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h2 className="text-2xl font-semibold text-white">Add New Project</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium mb-1 text-theme-gray-light">Project Name</label>
            <Input id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} required
                   className="bg-dark border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"/>
          </div>

          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium mb-1 text-theme-gray-light">Description (Optional)</label>
            <Textarea id="projectDescription" value={projectDescription} onChange={e => setProjectDescription(e.target.value)}
                      className="bg-dark border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary min-h-[80px]"/>
          </div>

          <div>
            <label htmlFor="assignedTeam" className="block text-sm font-medium mb-1 text-theme-gray-light">Assigned Team (comma-separated)</label>
            <Input id="assignedTeam" value={assignedTeam} onChange={e => setAssignedTeam(e.target.value)} placeholder="e.g., member1, member2@example.com"
                   className="bg-dark border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"/>
          </div>

          <div>
            <label htmlFor="projectDueDate" className="block text-sm font-medium mb-1 text-theme-gray-light">Project Due Date</label>
            <Input id="projectDueDate" type="date" value={projectDueDate} onChange={e => setProjectDueDate(e.target.value)} required
                   className="bg-dark border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"/>
          </div>

          <div className="pt-2">
            <h3 className="text-lg font-semibold text-white mb-3">Tasks</h3>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={task.tempId} className="p-4 border border-white/10 rounded-lg space-y-3 bg-dark/30">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-white">Task {index + 1}</h4>
                    {tasks.length > 1 && (
                       <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveTask(task.tempId)} className="text-theme-red hover:bg-theme-red/10">
                         <X className="w-4 h-4 mr-1"/> Remove
                       </Button>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`taskName-${task.tempId}`} className="block text-xs font-medium mb-1 text-theme-gray-light">Task Name</label>
                    <Input id={`taskName-${task.tempId}`} value={task.name} onChange={e => handleTaskChange(task.tempId, 'name', e.target.value)}
                           className="bg-dark-contrast border-white/15 rounded-md px-3 py-2 text-sm"/>
                  </div>
                  <div>
                    <label htmlFor={`taskAssignedTo-${task.tempId}`} className="block text-xs font-medium mb-1 text-theme-gray-light">Assigned To (comma-separated)</label>
                    <Input id={`taskAssignedTo-${task.tempId}`} value={Array.isArray(task.assignedTo) ? task.assignedTo.join(', ') : task.assignedTo}
                           onChange={e => handleTaskChange(task.tempId, 'assignedTo', e.target.value.split(',').map(s=>s.trim()))}
                           placeholder="e.g., user1, user2"
                           className="bg-dark-contrast border-white/15 rounded-md px-3 py-2 text-sm"/>
                  </div>
                  <div>
                    <label htmlFor={`taskDeadline-${task.tempId}`} className="block text-xs font-medium mb-1 text-theme-gray-light">Task Deadline</label>
                    <Input id={`taskDeadline-${task.tempId}`} type="date" value={task.deadline} onChange={e => handleTaskChange(task.tempId, 'deadline', e.target.value)}
                           className="bg-dark-contrast border-white/15 rounded-md px-3 py-2 text-sm"/>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" onClick={handleAddTask} variant="outline" className="mt-4 border-white/20 hover:bg-white/10 text-white text-sm py-2">
              <Plus className="w-4 h-4 mr-2"/>Add Another Task
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 mt-6">
            <Button type="button" variant="outline" onClick={onClose}
                    className="flex-1 py-3 border-white/20 hover:bg-white/10 text-white rounded-lg transition-colors duration-150">
              Cancel
            </Button>
            <Button type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-theme-primary to-theme-secondary hover:opacity-90 text-white font-semibold rounded-lg transition-opacity duration-150 shadow-md hover:shadow-lg">
              Add Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ######################################################
// Helper Components (ProjectCard, StatusBadge, formatDate)
// ######################################################

function ProjectCard({ project }: { project: Project }) { // Changed type to Project
  return (
    <div className="bg-dark/60 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:border-white/20"> {/* Enhanced styling */}
      <div className="p-6"> {/* Increased padding */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4"> {/* Responsive layout, increased margin */}
          <div className="mb-2 sm:mb-0">
            <h3 className="text-xl font-semibold text-white">{project.name}</h3> {/* Increased font size */}
            <p className="text-white/70 text-sm mt-1">{project.description}</p> {/* Softer text color */}
          </div>
          <StatusBadge status={project.status || 'Unknown'} />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm mb-4"> {/* Responsive grid */}
          <div>
            <span className="text-white/60 block mb-0.5">Due Date</span>
            <span className="font-medium text-white">{project.dueDate ? formatDate(project.dueDate) : 'N/A'}</span>
          </div>
          <div>
            <span className="text-white/60 block mb-0.5">Priority</span>
            <span className="font-medium text-white">{project.priority || 'N/A'}</span>
          </div>
          <div>
            <span className="text-white/60 block mb-0.5">Team Size</span>
            <span className="font-medium text-white">{project.team.length}</span>
          </div>
        </div>
        
        {project.team && project.team.length > 0 && (
          <div className="mb-4">
            <span className="text-white/60 text-sm block mb-1">Team</span>
            <div className="flex flex-wrap gap-2">
              {project.team.map((member, index) => (
                <Badge key={index} variant="secondary" className="bg-white/10 text-white/80 px-2.5 py-1 text-xs font-normal">
                  {member}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1 text-white/80">
            <span>Progress</span>
            <span>{project.progress || 0}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5"> {/* Slightly thicker progress bar */}
            <div 
              className="bg-gradient-to-r from-theme-primary to-theme-secondary h-2.5 rounded-full transition-all duration-500 ease-out" // Gradient progress
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {project.tasks && project.tasks.length > 0 && (
        <div className="border-t border-white/10 p-6 bg-dark/20"> {/* Increased padding, slightly different bg */}
          <h4 className="font-semibold text-white mb-4">Tasks ({project.tasks.length})</h4> {/* Task count, increased margin */}
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2"> {/* Max height and scroll for tasks */}
            {project.tasks.map((task) => ( // task type is now Task
              <div key={task.id} className="flex items-start justify-between p-3 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                <div>
                  <div className="flex items-center mb-0.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mr-2.5 shrink-0 ${ // Slightly larger dot
                        (task as any).status === 'Completed' ? 'bg-theme-emerald' :
                        (task as any).status === 'In Progress' ? 'bg-theme-yellow' :
                        'bg-white/30' // Default for 'Not Started' or other statuses
                      }`}
                    ></div>
                    <span className="text-sm text-white">{task.name}</span>
                  </div>
                  {task.assignedTo && task.assignedTo.length > 0 && (
                    <span className="text-xs text-white/60 ml-5">Assigned: {task.assignedTo.join(', ')}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/60 block">{(task as any).status || 'Not Started'}</span>
                  {task.deadline && (
                    <span className="text-xs text-theme-primary/80 block mt-0.5">Due: {formatDate(task.deadline)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  // Using more descriptive and consistent styling
  let className = "px-2.5 py-1 text-xs font-medium rounded-full ";
  switch (status?.toLowerCase()) { // Added optional chaining and toLowerCase for robustness
    case 'completed':
      className += "bg-theme-emerald/20 text-theme-emerald";
      break;
    case 'in progress':
      className += "bg-theme-yellow/20 text-theme-yellow";
      break;
    case 'not started':
      className += "bg-gray-500/20 text-gray-400";
      break;
    case 'just started': // This was an old status, map to a new one or keep if relevant
      className += "bg-theme-primary/20 text-theme-primary";
      break;
    case 'on hold':
      className += "bg-orange-500/20 text-orange-400";
      break;
    default: // For 'Unknown' or any other status
      className += "bg-gray-600/20 text-gray-300";
  }
  return <span className={className}>{status || 'Unknown'}</span>;
}


function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Check if date is valid after parsing. Date inputs are usually YYYY-MM-DD
    if (isNaN(date.getTime())) {
        // Attempt to parse if it's already in YYYY-MM-DD from date input
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) -1; // JS months are 0-indexed
            const day = parseInt(parts[2]);
            // Check if parts are numbers and form a valid date
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                const validDate = new Date(Date.UTC(year, month, day)); // Use UTC to avoid timezone issues with YYYY-MM-DD
                 if(!isNaN(validDate.getTime())){
                     return validDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
                }
            }
        }
        return 'Invalid Date'; // Return if parsing fails
    }
    // If initial Date constructor worked (e.g. for ISO strings from mock data)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date'; // Catch any other errors during date processing
  }
} 