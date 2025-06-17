export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
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

export interface SettingsFormData {
  user: User;
  portfolioLinks: PortfolioLink[];
  skills: Skill[];
}

export type SettingsTab = 'personal-details' | 'change-password' | 'others';

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}