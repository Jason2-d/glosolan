'use client';

import { useState } from 'react';
import { ProfileHero } from '@/components/custom_ui/profile/profile-hero';
import { ProfileNavigation } from '@/components/custom_ui/profile/profile.navigation';
import { ProfileOverview } from '@/components/custom_ui/profile/profile.overview';
import { ProfileDocuments } from '@/components/custom_ui/profile/profile-documents';
import { ProfileActivity } from '@/components/custom_ui/profile/profile-activity';
import { ProfileSettings } from '@/components/custom_ui/profile/profile-settings';
import { ProfileTab } from '@/types/profile';
import { useUser } from '@/contexts/user-context';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const { profileData, updateCoverImage } = useUser();

  const handleCoverImageChange = async (file: File) => {
    try {
      await updateCoverImage(file);
      // You could add a toast notification here if you have a toast system
      console.log('Cover image updated successfully!');
    } catch (error) {
      console.error('Failed to update cover image:', error);
      // You could add an error toast notification here
      alert('Failed to update cover image. Please try again.');
      throw error; // Re-throw to let the ProfileHero component handle the loading state
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileOverview />;
      case 'documents':
        return <ProfileDocuments />;
      case 'activity':
        return <ProfileActivity />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProfileHero 
        user={profileData.user} 
        stats={profileData.stats}
        onCoverImageChange={handleCoverImageChange}
      />
      <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}