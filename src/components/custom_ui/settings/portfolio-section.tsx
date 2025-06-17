'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Github, Globe, Plus } from 'lucide-react';
import { PortfolioLink } from '@/types/settings';
import { useState } from 'react';

interface PortfolioSectionProps {
  portfolioLinks: PortfolioLink[];
  onUpdateLinks: (links: PortfolioLink[]) => void;
}

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

export function PortfolioSection({ portfolioLinks, onUpdateLinks }: PortfolioSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  const removeLink = (id: string) => {
    onUpdateLinks(portfolioLinks.filter(link => link.id !== id));
  };

  const addLink = () => {
    if (newLink.platform && newLink.url) {
      const link: PortfolioLink = {
        id: Date.now().toString(),
        platform: newLink.platform.toLowerCase(),
        url: newLink.url,
        icon: newLink.platform.toLowerCase(),
        color: platformColors[newLink.platform.toLowerCase()] || 'bg-gray-500 text-white'
      };
      onUpdateLinks([...portfolioLinks, link]);
      setNewLink({ platform: '', url: '' });
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {portfolioLinks.map((link) => {
          const IconComponent = platformIcons[link.icon] || Globe;
          return (
            <div key={link.id} className="flex items-center space-x-3 group">
              <div className={`p-2 rounded-lg ${platformColors[link.platform] || 'bg-gray-500 text-white'}`}>
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{link.url}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeLink(link.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        
        {isAdding ? (
          <div className="space-y-2 p-3 border border-dashed border-muted-foreground/25 rounded-lg">
            <Input
              placeholder="Platform name"
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
            />
            <Input
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={addLink}>Add</Button>
              <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full border border-dashed border-muted-foreground/25 text-muted-foreground hover:text-foreground"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        )}
      </CardContent>
    </Card>
  );
}