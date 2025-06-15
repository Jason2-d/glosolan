'use client';
import React from 'react';
import { Calendar, FileText, CheckCircle, Clock, Folder, CalendarDays } from 'lucide-react';

// Import types and data from types folder
import { DashboardStats, UserInfo, mockDashboardData, mockUserInfo } from '../../types/dashboard';

// Components
const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
        <CalendarDays size={18} />
        Pick a date
      </button>
    </div>
  );
};

const WelcomeCard = ({ userInfo, stats }: { userInfo: UserInfo; stats: DashboardStats }) => {
  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="z-10 relative">
        <h2 className="text-2xl font-bold mb-2">
          Welcome Back<br />
          {userInfo.name}!
        </h2>
        
        <div className="mt-8 space-y-6">
          <div>
            <div className="text-sm opacity-90 mb-1">Today's Task</div>
            <div className="text-4xl font-bold">{stats.todaysTasks}</div>
          </div>
          
          <div>
            <div className="text-sm opacity-90 mb-1">Overdue Task</div>
            <div className="text-4xl font-bold">{stats.overdueTasks}</div>
          </div>
        </div>
      </div>
      
      {/* Character Illustration */}
      <div className="absolute bottom-0 right-4 z-0">
        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"></div>
      <div className="absolute top-1/3 right-8 w-12 h-12 bg-white/5 rounded-full"></div>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  progress, 
  icon: Icon, 
  iconColor, 
  valueColor = "text-white" 
}: {
  title: string;
  value: number;
  progress: number;
  icon: React.ElementType;
  iconColor: string;
  valueColor?: string;
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-200 hover:scale-105 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className={`text-4xl font-bold ${valueColor}`}>
          {value.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Project Progress</span>
          <span className="text-green-400 font-medium">+{progress}%</span>
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const FloatingActionButton = () => {
  return (
    <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50">
      <div className="w-6 h-6 flex items-center justify-center">
        <div className="w-4 h-0.5 bg-white absolute"></div>
        <div className="w-0.5 h-4 bg-white absolute"></div>
      </div>
    </button>
  );
};

export default function DashboardPage() {
  const stats = mockDashboardData;
  const userInfo = mockUserInfo;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="lg:row-span-2">
            <WelcomeCard userInfo={userInfo} stats={stats} />
          </div>
          
          {/* Stats Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title="Total Project"
              value={stats.totalProjects}
              progress={stats.projectProgress}
              icon={FileText}
              iconColor="bg-red-500/20"
              valueColor="text-red-400"
            />
            
            <StatsCard
              title="Completed"
              value={stats.completedProjects}
              progress={stats.projectProgress}
              icon={CheckCircle}
              iconColor="bg-green-500/20"
              valueColor="text-green-400"
            />
            
            <StatsCard
              title="In Progress"
              value={stats.inProgressProjects}
              progress={stats.projectProgress}
              icon={Clock}
              iconColor="bg-red-500/20"
              valueColor="text-red-400"
            />
            
            <StatsCard
              title="Active Project"
              value={stats.activeProjects}
              progress={stats.projectProgress}
              icon={Folder}
              iconColor="bg-blue-500/20"
              valueColor="text-blue-400"
            />
          </div>
        </div>
        
        <FloatingActionButton />
      </div>
    </div>
  );
}