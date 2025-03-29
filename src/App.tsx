import React from 'react';
import './App.css';
import SaasLayout from './components/layout/SaasLayout';
import TaskDashboard from './components/tasks/TaskDashboard';

function App() {
  return (
    <div className="app">
      <SaasLayout>
        <TaskDashboard />
      </SaasLayout>
    </div>
  );
}

export default App;
