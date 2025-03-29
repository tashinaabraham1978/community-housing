import React, { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { X, Calendar, CheckSquare, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'> & { id?: number }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'none' | ''>('');
  const [completed, setCompleted] = useState(false);
  
  // If editing an existing task, populate the form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
      setPriority(task.priority || '');
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: completed,
      dueDate: dueDate || undefined,
      priority: (priority === 'none' || priority === '' ? undefined : priority) as 'low' | 'medium' | 'high' | undefined,
    };

    if (task) {
      // If editing, include the id
      onSubmit({ ...formData, id: task.id });
    } else {
      // If adding new task
      onSubmit(formData);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setCompleted(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        <Button
          onClick={onCancel}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close form"
        >
          <X size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
              Title
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="h-10 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Add details about this task"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1.5">
                Due Date (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-slate-400" />
                </div>
                <Input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-1.5">
                Priority (optional)
              </label>
              <Select value={priority} onValueChange={(value) => setPriority(value as any)}>
                <SelectTrigger id="priority" className="h-10 text-sm">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="text-sm">None</SelectItem>
                  <SelectItem value="low" className="text-sm flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Low
                  </SelectItem>
                  <SelectItem value="medium" className="text-sm flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                    Medium
                  </SelectItem>
                  <SelectItem value="high" className="text-sm flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {task && (
            <div className="flex items-center pt-1">
              <Checkbox 
                id="completed" 
                checked={completed} 
                onCheckedChange={(checked) => setCompleted(checked === true)}
                className="mr-2 h-4 w-4"
              />
              <label 
                htmlFor="completed" 
                className="text-sm font-medium text-slate-700 cursor-pointer"
              >
                Mark as completed
              </label>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="h-9 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 text-sm"
            >
              {task ? 'Update Task' : 'Add Task'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
