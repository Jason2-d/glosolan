export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  coverImage?: string;
  role: string;
  joiningDate: Date | null;
  website: string;
  organization: string;
  designation: string;
  language: string;
  experienceYearsFrom: string;
  experienceYearsTo: string;
  country: string;
  city: string;
  zipCode: string;
  timezone: string;
  currency: string;
  about: string;
}

export interface PortfolioLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

// New profile-specific types
export interface ProfileStats {
  followers: number;
  following: number;
}

export interface ProfileCompletion {
  percentage: number;
  completedFields: string[];
  missingFields: string[];
}

export interface TeamMembership {
  id: string;
  name: string;
  role: string;
  memberCount: number;
  color: string;
  isActive: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'photo_changed' | 'video_added' | 'image_added' | 'document_uploaded' | 'profile_updated' | 'cover_changed';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
  };
  media?: {
    type: 'image' | 'video';
    urls: string[];
  };
}

export interface ContactInfo {
  type: 'designation' | 'email' | 'phone' | 'location';
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface ProfileData {
  user: User;
  stats: ProfileStats;
  completion: ProfileCompletion;
  portfolioLinks: PortfolioLink[];
  skills: Skill[];
  teams: TeamMembership[];
  activities: ActivityItem[];
  contactInfo: ContactInfo[];
}

export type ProfileTab = 'overview' | 'documents' | 'activity' | 'settings';