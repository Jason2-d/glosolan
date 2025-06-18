'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Github, Globe } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

const platformIcons: Record<string, any> = {
  github: Github,
  dribbble: Globe,
  behance: Globe,
  pinterest: Globe,
  website: Globe,
};

const platformColors: Record<string, string> = {
  github: 'bg-gray-900 text-white',
  dribbble: 'bg-pink-500 text-white',
  behance: 'bg-blue-500 text-white',
  pinterest: 'bg-red-500 text-white',
  website: 'bg-blue-600 text-white',
};

export function ProfilePortfolio() {
  const { profileData } = useUser();
  const { portfolioLinks } = profileData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Portfolio</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {portfolioLinks.slice(0, 5).map((link) => {
            const IconComponent = platformIcons[link.icon] || Globe;
            return (
              <div
                key={link.id}
                className={`p-3 rounded-full ${platformColors[link.platform] || 'bg-gray-500 text-white'} hover:scale-110 transition-transform cursor-pointer`}
                title={link.url}
              >
                <IconComponent className="h-5 w-5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}