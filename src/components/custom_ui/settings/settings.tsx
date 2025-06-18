'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCard } from '@/components/custom_ui/settings/profile-card';
import { PortfolioSection } from '@/components/custom_ui/settings/portfolio-section';
import { SkillsSection } from '@/components/custom_ui/settings/skills-section';
import { PersonalDetailsForm } from '@/components/custom_ui/settings/personal-details-form';
import { ChangePasswordForm } from '@/components/custom_ui/settings/change-password-form';
import { OthersForm } from '@/components/custom_ui/settings/others-form';
import { PasswordChangeData } from '@/types/settings';
import { useUser } from '@/contexts/user-context';

export default function SettingsPage() {
  const { profileData, updateUser, updatePortfolioLinks, updateSkills, addActivity } = useUser();
  const { user, portfolioLinks, skills } = profileData;
  const [activeTab, setActiveTab] = useState('personal-details');

  const handleSavePersonalDetails = () => {
    addActivity({
      type: 'profile_updated',
      title: 'Profile Updated',
      description: `${user.firstName} ${user.lastName} updated their profile information`,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
      }
    });
    console.log('Saving personal details:', user);
  };

  const handleSavePassword = (passwordData: PasswordChangeData) => {
    addActivity({
      type: 'profile_updated',
      title: 'Password Changed',
      description: `${user.firstName} ${user.lastName} changed their password`,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
      }
    });
    console.log('Changing password:', passwordData);
  };

  const handleSaveOthers = () => {
    addActivity({
      type: 'profile_updated',
      title: 'Settings Updated',
      description: `${user.firstName} ${user.lastName} updated their preferences`,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
      }
    });
    console.log('Saving other settings');
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleUpdateUser = (updatedUser: typeof user) => {
    updateUser(updatedUser);
    if (updatedUser.avatar !== user.avatar) {
      addActivity({
        type: 'photo_changed',
        title: 'Profile Photo Changed',
        description: `${updatedUser.firstName} ${updatedUser.lastName} changed their profile photo`,
        user: {
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          avatar: updatedUser.avatar
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard user={user} onUpdateUser={handleUpdateUser} />
            
            {activeTab === 'personal-details' && (
              <SkillsSection 
                skills={skills} 
                onUpdateSkills={updateSkills} 
              />
            )}
            
            {(activeTab === 'personal-details' || activeTab === 'others') && (
              <PortfolioSection 
                portfolioLinks={portfolioLinks} 
                onUpdateLinks={updatePortfolioLinks} 
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b px-6 py-4">
                  <TabsList className="grid w-full  grid-cols-2 ">
                    <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
                    <TabsTrigger value="change-password">Change Password</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="personal-details" className="mt-0">
                    <PersonalDetailsForm
                      user={user}
                      onUpdateUser={updateUser}
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