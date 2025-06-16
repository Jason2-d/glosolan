import {
  Folder,
  BarChart3,
  FileText,
  Mail,
  Activity,
  Settings,
  User,
  Bell,
} from "lucide-react";

export interface NavItem {
  label: string;
  link: string;
  icon: React.ComponentType<any>; // Updated to accept a React component
}

export const sideMenu: NavItem[] = [
  { label: "Projects", link: "projects", icon: Folder },
  { label: "Analytics", link: "analytics", icon: BarChart3 },
  { label: "Reports", link: "reports", icon: FileText },
  { label: "Messages", link: "messages", icon: Mail },
  { label: "Activity", link: "activity", icon: Activity },
  { label: "Settings", link: "settings", icon: Settings },
  { label: "Profile", link: "profile", icon: User },
  { label: "Notifications", link: "notifications", icon: Bell },
];