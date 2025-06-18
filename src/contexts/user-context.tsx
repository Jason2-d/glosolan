'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PortfolioLink, Skill, ProfileData, ProfileStats, TeamMembership, ActivityItem, ContactInfo, ProfileCompletion } from '@/types/profile';

interface UserContextType {
  profileData: ProfileData;
  updateUser: (user: User) => void;
  updatePortfolioLinks: (links: PortfolioLink[]) => void;
  updateSkills: (skills: Skill[]) => void;
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  updateCoverImage: (file: File) => Promise<void>; // New method for cover image upload
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock data - Updated to include coverImage
const mockUser: User = {
  id: '1',
  firstName: 'Jennyfer',
  lastName: 'Franklin',
  email: 'jennyfer.franklin@gmail.com',
  phoneNumber: '+1 (987) 654-3210',
  avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  coverImage: '', // Add default empty cover image
  role: 'Data Analytics',
  joiningDate: new Date('2021-11-24'),
  website: 'https://jennyferfranklin.com',
  organization: 'Tech Corp',
  designation: 'Lead UX/UI Designer',
  language: 'english',
  experienceYearsFrom: '2018',
  experienceYearsTo: '2024',
  country: 'united states',
  city: 'California',
  zipCode: '94105',
  timezone: 'UTC-08:00',
  currency: 'USD',
  about: 'Hi I\'m Jennyfer Franklin. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.'
};

const mockStats: ProfileStats = {
  followers: 24500,
  following: 22500
};

const mockTeams: TeamMembership[] = [
  {
    id: '1',
    name: 'UI/UX Designer',
    role: 'Lead Designer',
    memberCount: 65,
    color: 'bg-blue-500',
    isActive: true
  },
  {
    id: '2',
    name: 'Frontend Developer',
    role: 'Senior Developer',
    memberCount: 126,
    color: 'bg-green-500',
    isActive: true
  }
];

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'photo_changed',
    title: 'User Photo Changed',
    description: 'Jone Doe changed his avatar photo',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    user: {
      name: 'Jone Doe',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
    }
  },
  {
    id: '2',
    type: 'video_added',
    title: 'Video Added',
    description: 'Mores Clarke added new video',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    user: {
      name: 'Mores Clarke'
    }
  },
  {
    id: '3',
    type: 'image_added',
    title: 'Image Added',
    description: 'Mores Clarke added new video',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: {
      name: 'Mores Clarke'
    },
    media: {
      type: 'image',
      urls: [
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      ]
    }
  }
];

const mockPortfolioLinks: PortfolioLink[] = [
  {
    id: '1',
    platform: 'github',
    url: 'https://github.com/sakilanwar12',
    icon: 'github',
    color: 'bg-gray-900 text-white'
  },
  {
    id: '2',
    platform: 'dribbble',
    url: 'www.dribbble.com/prantikuxui',
    icon: 'dribbble',
    color: 'bg-pink-500 text-white'
  },
  {
    id: '3',
    platform: 'behance',
    url: 'https://www.behance.net/prantikuxui',
    icon: 'behance',
    color: 'bg-blue-500 text-white'
  },
  {
    id: '4',
    platform: 'pinterest',
    url: 'https://www.pinterest.com/prantikux',
    icon: 'pinterest',
    color: 'bg-red-500 text-white'
  },
  {
    id: '5',
    platform: 'website',
    url: 'https://prantikuxui.com',
    icon: 'website',
    color: 'bg-blue-600 text-white'
  }
];

const mockSkills: Skill[] = [
  { id: '1', name: 'HTML' },
  { id: '2', name: 'HTML 5' },
  { id: '3', name: 'CSS' },
  { id: '4', name: 'JavaScript' },
  { id: '5', name: 'React' },
  { id: '6', name: 'NextJS' },
  { id: '7', name: 'Vue JS' },
  { id: '8', name: 'Nuxt JS' },
  { id: '9', name: 'PHP' },
  { id: '10', name: 'Tailwind' }
];

const calculateCompletion = (user: User, portfolioLinks: PortfolioLink[], skills: Skill[]): ProfileCompletion => {
  const fields = [
    { key: 'firstName', value: user.firstName },
    { key: 'lastName', value: user.lastName },
    { key: 'email', value: user.email },
    { key: 'phoneNumber', value: user.phoneNumber },
    { key: 'avatar', value: user.avatar },
    { key: 'coverImage', value: user.coverImage }, // Added cover image to completion calculation
    { key: 'role', value: user.role },
    { key: 'joiningDate', value: user.joiningDate },
    { key: 'website', value: user.website },
    { key: 'organization', value: user.organization },
    { key: 'designation', value: user.designation },
    { key: 'about', value: user.about },
    { key: 'portfolioLinks', value: portfolioLinks.length > 0 },
    { key: 'skills', value: skills.length > 0 }
  ];

  const completedFields = fields.filter(field => field.value).map(field => field.key);
  const missingFields = fields.filter(field => !field.value).map(field => field.key);
  const percentage = Math.round((completedFields.length / fields.length) * 100);

  return {
    percentage,
    completedFields,
    missingFields
  };
};

const generateContactInfo = (user: User): ContactInfo[] => [
  {
    type: 'designation',
    label: 'Designation',
    value: user.designation,
    icon: 'briefcase',
    color: 'text-purple-500'
  },
  {
    type: 'designation',
    label: 'Designation',
    value: user.designation,
    icon: 'briefcase',
    color: 'text-blue-500'
  },
  {
    type: 'email',
    label: 'Mail',
    value: user.email,
    icon: 'mail',
    color: 'text-green-500'
  }
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [portfolioLinks, setPortfolioLinks] = useState<PortfolioLink[]>(mockPortfolioLinks);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);

  const [profileData, setProfileData] = useState<ProfileData>({
    user: mockUser,
    stats: mockStats,
    completion: calculateCompletion(mockUser, mockPortfolioLinks, mockSkills),
    portfolioLinks: mockPortfolioLinks,
    skills: mockSkills,
    teams: mockTeams,
    activities: mockActivities,
    contactInfo: generateContactInfo(mockUser)
  });

  useEffect(() => {
    const completion = calculateCompletion(user, portfolioLinks, skills);
    const contactInfo = generateContactInfo(user);
    
    setProfileData(prev => ({
      ...prev,
      user,
      portfolioLinks,
      skills,
      activities,
      completion,
      contactInfo
    }));
  }, [user, portfolioLinks, skills, activities]);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const updatePortfolioLinks = (links: PortfolioLink[]) => {
    setPortfolioLinks(links);
  };

  const updateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
  };

  const addActivity = (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  // New method to handle cover image upload
  const updateCoverImage = async (file: File) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('coverImage', file);
      formData.append('userId', user.id);

      // Upload to your API endpoint
      const response = await fetch('/api/users/upload-cover', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to upload cover image');
      }

      const { imageUrl } = await response.json();

      // Update the user with the new cover image
      const updatedUser = {
        ...user,
        coverImage: imageUrl,
      };
      
      setUser(updatedUser);

      // Add activity for cover image change
      addActivity({
        type: 'cover_changed',
        title: 'Cover Image Changed',
        description: `${user.firstName} ${user.lastName} updated their cover image`,
        user: {
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar
        }
      });

    } catch (error) {
      console.error('Error uploading cover image:', error);
      throw error; // Re-throw to let the component handle the error
    }
  };

  return (
    <UserContext.Provider value={{
      profileData,
      updateUser,
      updatePortfolioLinks,
      updateSkills,
      addActivity,
      updateCoverImage // Add the new method to the context
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}