'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

export function ProfileSkills() {
  const { profileData } = useUser();
  const { skills } = profileData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Skills</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge 
              key={skill.id} 
              variant="secondary" 
              className="px-3 py-1 text-sm hover:bg-primary/10 transition-colors"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}