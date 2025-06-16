// types/dashboard.ts

export interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  activeProjects: number;
  todaysTasks: number;
  overdueTasks: number;
  projectProgress: number;
}

export interface UserInfo {
  name: string;
  avatar?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'active';
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignedTo?: string;
  projectId: string;
}

export interface StatsCardData {
  title: string;
  value: number;
  progress: number;
  iconType: 'file' | 'check' | 'clock' | 'folder';
  color: 'red' | 'green' | 'blue' | 'yellow';
}

// Mock Data
export const mockDashboardData: DashboardStats = {
  totalProjects: 1206,
  completedProjects: 240,
  inProgressProjects: 96,
  activeProjects: 18,
  todaysTasks: 123,
  overdueTasks: 213,
  projectProgress: 8.2
};

export const mockUserInfo: UserInfo = {
  name: "Prantik",
  avatar: undefined
};

export const mockProjects: ProjectData[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    progress: 85,
    status: "in-progress",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-06-10"),
    description: "Building a comprehensive e-commerce platform with React and Node.js"
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 100,
    status: "completed",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-05-30"),
    description: "React Native app for iOS and Android"
  },
  {
    id: "3",
    name: "Dashboard Analytics",
    progress: 45,
    status: "active",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-06-14"),
    description: "Real-time analytics dashboard for business metrics"
  },
  {
    id: "4",
    name: "API Integration",
    progress: 70,
    status: "in-progress",
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-06-12"),
    description: "Third-party API integrations and data synchronization"
  }
];

export const mockTasks: TaskData[] = [
  {
    id: "1",
    title: "Design system updates",
    description: "Update component library and design tokens",
    status: "in-progress",
    priority: "high",
    dueDate: new Date("2024-06-16"),
    assignedTo: "Prantik",
    projectId: "1"
  },
  {
    id: "2",
    title: "Database optimization",
    description: "Optimize database queries for better performance",
    status: "pending",
    priority: "medium",
    dueDate: new Date("2024-06-18"),
    assignedTo: "Prantik",
    projectId: "3"
  },
  {
    id: "3",
    title: "User authentication",
    description: "Implement secure user authentication system",
    status: "overdue",
    priority: "high",
    dueDate: new Date("2024-06-10"),
    assignedTo: "Prantik",
    projectId: "1"
  },
  {
    id: "4",
    title: "API documentation",
    description: "Create comprehensive API documentation",
    status: "completed",
    priority: "low",
    dueDate: new Date("2024-06-05"),
    assignedTo: "Prantik",
    projectId: "4"
  }
];

export const mockStatsCards: StatsCardData[] = [
  {
    title: "Total Project",
    value: 1206,
    progress: 8.2,
    iconType: "file",
    color: "red"
  },
  {
    title: "Completed",
    value: 240,
    progress: 8.2,
    iconType: "check",
    color: "green"
  },
  {
    title: "In Progress",
    value: 96,
    progress: 8.2,
    iconType: "clock",
    color: "red"
  },
  {
    title: "Active Project",
    value: 18,
    progress: 8.2,
    iconType: "folder",
    color: "blue"
  }
];

// Utility functions for data processing
export const calculateCompletionRate = (stats: DashboardStats): number => {
  return Math.round((stats.completedProjects / stats.totalProjects) * 100);
};

export const getOverdueTasksCount = (tasks: TaskData[]): number => {
  return tasks.filter(task => task.status === 'overdue').length;
};

export const getTodaysTasksCount = (tasks: TaskData[]): number => {
  const today = new Date();
  return tasks.filter(task => 
    task.dueDate.toDateString() === today.toDateString()
  ).length;
};

export const getProjectsByStatus = (projects: ProjectData[], status: ProjectData['status']): ProjectData[] => {
  return projects.filter(project => project.status === status);
};

// Color mapping for different elements
export const colorMap = {
  red: {
    bg: 'bg-red-500',
    bgOpacity: 'bg-red-500/20',
    text: 'text-red-400',
    gradient: 'from-red-500 to-red-600'
  },
  green: {
    bg: 'bg-green-500',
    bgOpacity: 'bg-green-500/20',
    text: 'text-green-400',
    gradient: 'from-green-500 to-green-600'
  },
  blue: {
    bg: 'bg-blue-500',
    bgOpacity: 'bg-blue-500/20',
    text: 'text-blue-400',
    gradient: 'from-blue-500 to-blue-600'
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgOpacity: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    gradient: 'from-yellow-500 to-yellow-600'
  }
} as const;