'use client';

import { cn } from '@/lib/utils';
import { ProfileTab } from '@/types/profile';

interface ProfileNavigationProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs = [
  { id: 'overview' as ProfileTab, label: 'Overview' },
  { id: 'documents' as ProfileTab, label: 'Documents' },
  { id: 'settings' as ProfileTab, label: 'Settings' },
];

export function ProfileNavigation({ activeTab, onTabChange }: ProfileNavigationProps) {
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}