import React, { useState } from 'react';
import { Task } from '../../types/task';
import { CheckCircle, Circle, Edit, Trash2, Calendar, Flag } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`px-4 py-4 ${
        task.completed ? 'bg-slate-50' : 'bg-white'
      } transition-all duration-200 hover:bg-slate-50 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div 
          className="flex-shrink-0 pt-1 cursor-pointer"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? (
            <CheckCircle className="text-green-500 h-5 w-5" />
          ) : (
            <Circle className="text-slate-300 h-5 w-5" />
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="max-w-full sm:max-w-[70%]">
              <h3
                className={`text-base font-medium ${
                  task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
                }`}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 text-sm ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                  {task.description}
                </p>
              )}
              
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {task.dueDate && (
                  <div className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border border-slate-200 text-slate-700 bg-slate-50">
                    <Calendar size={12} className="mr-1 text-slate-500" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                )}
                
                {task.priority && (
                  <div className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                    <Flag size={12} className="mr-1" />
                    <span className="capitalize">{task.priority}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons - always visible on mobile, visible on hover for desktop */}
            <div className={`flex items-center space-x-2 sm:opacity-0 sm:group-hover:opacity-100 ${isHovered ? 'sm:opacity-100' : ''}`}>
              <Button
                onClick={() => onToggleComplete(task.id)}
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-slate-200 text-slate-700 hover:text-green-600 hover:border-green-200 hover:bg-green-50"
              >
                {task.completed ? 'Completed' : 'Mark Complete'}
              </Button>
              <Button
                onClick={() => onEdit(task)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-blue-500 hover:bg-blue-50"
                aria-label="Edit task"
              >
                <Edit size={15} />
              </Button>
              <Button
                onClick={() => onDelete(task.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                aria-label="Delete task"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
