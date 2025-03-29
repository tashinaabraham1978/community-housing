import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TaskDashboard from '../tasks/TaskDashboard';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TaskDashboard />;
      case 'home':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            <p>Welcome to the Community Housing Dashboard</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p>User profile information will be displayed here</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p>Application settings will be displayed here</p>
          </div>
        );
      default:
        return <div className="p-6">Select a tab</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto md:ml-64 md:pl-0 pl-0 pt-14 md:pt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Layout;
