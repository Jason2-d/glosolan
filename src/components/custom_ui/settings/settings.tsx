'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCard } from '@/components/custom_ui/settings/profile-card';
import { PortfolioSection } from '@/components/custom_ui/settings/portfolio-section';
import { SkillsSection } from '@/components/custom_ui/settings/skills-section';
import { PersonalDetailsForm } from '@/components/custom_ui/settings/personal-details-form';
import { ChangePasswordForm } from '@/components/custom_ui/settings/change-password-form';
import { OthersForm } from '@/components/custom_ui/settings/others-form';
import { User, PortfolioLink, Skill, PasswordChangeData } from '@/types/settings';

// Mock data - replace with real data fetching
const mockUser: User = {
  id: '1',
  firstName: 'Jennyfer',
  lastName: 'Franklin',
  email: 'jennyfer.franklin@example.com',
  phoneNumber: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  role: 'Data Analytics',
  joiningDate: new Date('2020-01-15'),
  website: 'https://jennyferfranklin.com',
  organization: 'Tech Corp',
  designation: 'Senior Data Analyst',
  language: 'english',
  experienceYearsFrom: '2018',
  experienceYearsTo: '2024',
  country: 'united states',
  city: 'San Francisco',
  zipCode: '94105',
  timezone: 'UTC-08:00',
  currency: 'USD',
  about: 'Passionate data analyst with expertise in machine learning and statistical analysis. Love working with complex datasets to derive meaningful insights.'
};

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

export default function SettingsPage() {
  const [user, setUser] = useState<User>(mockUser);
  const [portfolioLinks, setPortfolioLinks] = useState<PortfolioLink[]>(mockPortfolioLinks);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [activeTab, setActiveTab] = useState('personal-details');

  const handleSavePersonalDetails = () => {
    // Handle save logic here
    console.log('Saving personal details:', user);
  };

  const handleSavePassword = (passwordData: PasswordChangeData) => {
    // Handle password change logic here
    console.log('Changing password:', passwordData);
  };

  const handleSaveOthers = () => {
    // Handle save logic here
    console.log('Saving other settings');
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelled');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard user={user} onUpdateUser={setUser} />
            
            {activeTab === 'personal-details' && (
              <SkillsSection 
                skills={skills} 
                onUpdateSkills={setSkills} 
              />
            )}
            
            {(activeTab === 'personal-details' || activeTab === 'others') && (
              <PortfolioSection 
                portfolioLinks={portfolioLinks} 
                onUpdateLinks={setPortfolioLinks} 
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b px-6 py-4">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
                    <TabsTrigger value="change-password">Change Password</TabsTrigger>
                    <TabsTrigger value="others">Others</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="personal-details" className="mt-0">
                    <PersonalDetailsForm
                      user={user}
                      onUpdateUser={setUser}
                      onSave={handleSavePersonalDetails}
                      onCancel={handleCancel}
                    />
                  </TabsContent>
                  
                  <TabsContent value="change-password" className="mt-0">
                    <ChangePasswordForm
                      onSave={handleSavePassword}
                      onCancel={handleCancel}
                    />
                  </TabsContent>
                  
                  <TabsContent value="others" className="mt-0">
                    <OthersForm
                      onSave={handleSaveOthers}
                      onCancel={handleCancel}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}