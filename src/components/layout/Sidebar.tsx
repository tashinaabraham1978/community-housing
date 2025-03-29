import React, { useState } from 'react';
import { Home, CheckSquare, Settings, User, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-20 p-4">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-800 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div 
        className={`
          fixed md:static h-screen bg-gray-800 text-white p-4 flex flex-col z-10
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'left-0' : '-left-64'} 
          md:left-0 w-64
        `}
      >
        <div className="text-xl font-bold mb-8 p-2">Community Housing</div>
        <div className="flex-grow">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="mr-3">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto p-3 flex items-center text-gray-400">
          <User size={20} className="mr-3" />
          <span>User Account</span>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
