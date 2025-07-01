import React from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
}

interface TasksTabProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAssignTask: (taskId: string, userId: string) => void;
}

export function TasksTab({ tasks, onUpdateTask, onAssignTask }: TasksTabProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      {tasks.length === 0 && <div className="text-white/60">No tasks yet.</div>}
      {tasks.map((task) => (
        <div key={task.id} className="bg-dark/30 border border-white/10 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{task.title}</span>
            <span className="text-xs text-white/40">{task.status}</span>
          </div>
          {task.description && <div className="text-white/60 text-sm">{task.description}</div>}
          {/* Add more task details and actions as needed */}
        </div>
      ))}
    </div>
  );
} 