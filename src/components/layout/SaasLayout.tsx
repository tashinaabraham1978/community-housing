import React from 'react';
import { CheckSquare, LayoutDashboard } from 'lucide-react';

interface SaasLayoutProps {
  children: React.ReactNode;
}

const SaasLayout: React.FC<SaasLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10 border-b border-slate-200 w-full">
          <div className="flex h-16 items-center px-4 lg:px-6">
            <h1 className="text-xl font-semibold text-slate-800">Task Dashboard</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-slate-50 relative">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SaasLayout;
