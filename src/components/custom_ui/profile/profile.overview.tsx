'use client';

import { ProfileCompletion } from '@/components/custom_ui/profile/profile-completion';
import { ProfileInformation } from '@/components/custom_ui/profile/profile-information';
import { ProfileAbout } from '@/components/custom_ui/profile/profile-about';
import { ProfileActivity } from '@/components/custom_ui/profile/profile-activity';
import { ProfilePortfolio } from '@/components/custom_ui/profile/profile-portfolio';
import { ProfileSkills } from '@/components/custom_ui/profile/profile-skills';

export function ProfileOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-6">
        {/* <ProfileCompletion /> */}
        <ProfileInformation />
        <ProfilePortfolio />
        <ProfileSkills />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        <ProfileAbout />
        {/* <ProfileActivity /> */}
      </div>
    </div>
  );
}