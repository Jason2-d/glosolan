'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { Skill } from '@/types/settings';
import { useState } from 'react';

interface SkillsSectionProps {
  skills: Skill[];
  onUpdateSkills: (skills: Skill[]) => void;
}

export function SkillsSection({ skills, onUpdateSkills }: SkillsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const removeSkill = (id: string) => {
    onUpdateSkills(skills.filter(skill => skill.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
      };
      onUpdateSkills([...skills, skill]);
      setNewSkill('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="px-3 py-1 text-sm group">
              {skill.name}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeSkill(skill.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        
        {isAdding ? (
          <div className="flex space-x-2">
            <Input
              placeholder="Enter skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="sm" onClick={addSkill}>Add</Button>
            <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full border border-dashed border-muted-foreground/25 text-muted-foreground hover:text-foreground"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skills
          </Button>
        )}
      </CardContent>
    </Card>
  );
}