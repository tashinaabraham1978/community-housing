import React, { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Plus, Search, Filter, SortAsc, SortDesc, CheckCircle, ListFilter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    // Add sample tasks for demonstration
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: 'Complete project proposal',
        description: 'Finish the community housing project proposal document',
        completed: false,
        dueDate: '2025-04-15',
        priority: 'high',
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 2,
        title: 'Schedule team meeting',
        description: 'Set up weekly team sync for project updates',
        completed: true,
        priority: 'medium',
        createdAt: '2025-03-22T14:30:00Z',
      },
      {
        id: 3,
        title: 'Review budget documents',
        completed: false,
        dueDate: '2025-04-05',
        priority: 'high',
        createdAt: '2025-03-25T09:15:00Z',
      },
    ];
    setTasks(sampleTasks);
    
    // Uncomment this for production use
    // const savedTasks = localStorage.getItem('tasks');
    // if (savedTasks) {
    //   try {
    //     setTasks(JSON.parse(savedTasks));
    //   } catch (error) {
    //     console.error('Error parsing saved tasks:', error);
    //     setTasks(sampleTasks);
    //   }
    // } else {
    //   setTasks(sampleTasks);
    //   localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    // }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: number }) => {
    if (taskData.id) {
      // Update existing task
      const updatedTasks = tasks.map((task) =>
        task.id === taskData.id ? { ...task, ...taskData } : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Apply search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Apply completion filter
      const matchesCompletion = filterCompleted === null || task.completed === filterCompleted;
      
      return matchesSearch && matchesCompletion;
    })
    .sort((a, b) => {
      // Sort by creation date
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6 w-full">
      {/* Dashboard header with stats */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Your Tasks</h2>
          <p className="text-sm text-slate-500 mt-1">
            {tasks.filter(t => !t.completed).length} active, {tasks.filter(t => t.completed).length} completed
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          size="default"
        >
          <Plus size={16} className="mr-1.5" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Task form */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleAddTask}
          onCancel={handleCancelForm}
        />
      )}

      {/* Task list container */}
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        {/* Search and filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={15} className="text-slate-400" />
              </div>
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="pl-9 h-9 text-sm bg-white"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center h-9 text-sm font-medium">
                    <Filter size={14} className="mr-1.5 text-slate-500" />
                    <span>
                      {filterCompleted === null
                        ? 'All'
                        : filterCompleted
                        ? 'Completed'
                        : 'Active'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={() => setFilterCompleted(null)}
                    className="text-sm cursor-pointer"
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterCompleted(true)}
                    className="text-sm cursor-pointer"
                  >
                    <CheckCircle className="mr-2 h-3.5 w-3.5 text-green-500" />
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterCompleted(false)}
                    className="text-sm cursor-pointer"
                  >
                    Active
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                variant="outline"
                size="sm"
                className="flex items-center h-9 text-sm font-medium"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc size={14} className="mr-1.5 text-slate-500" />
                ) : (
                  <SortDesc size={14} className="mr-1.5 text-slate-500" />
                )}
                <span>Sort</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Task list */}
        <div className="divide-y divide-slate-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <ListFilter className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">No tasks found</h3>
              <p className="mt-1 text-sm text-slate-500">
                {searchTerm || filterCompleted !== null
                  ? 'No tasks match your filters'
                  : 'Get started by creating a new task.'}
              </p>
              {!searchTerm && filterCompleted === null && (
                <div className="mt-6">
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="sm"
                  >
                    <Plus size={16} className="mr-1.5" />
                    <span>Add Task</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
