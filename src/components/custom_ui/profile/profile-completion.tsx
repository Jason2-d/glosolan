'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/contexts/user-context';

export function ProfileCompletion() {
  const { profileData } = useUser();
  const { completion } = profileData;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{completion.percentage}% Complete</span>
        </div>
        <Progress 
          value={completion.percentage} 
          className="h-2"
        />
        {completion.missingFields.length > 0 && (
          <div className="text-xs text-muted-foreground">
            Complete your {completion.missingFields.slice(0, 2).join(', ')}
            {completion.missingFields.length > 2 && ` and ${completion.missingFields.length - 2} more`} to reach 100%
          </div>
        )}
      </CardContent>
    </Card>
  );
}