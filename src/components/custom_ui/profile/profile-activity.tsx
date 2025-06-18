'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '@/contexts/user-context';

export function ProfileActivity() {
  const { profileData } = useUser();
  const { activities } = profileData;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'photo_changed':
        return '📷';
      case 'video_added':
        return '🎥';
      case 'image_added':
        return '🖼️';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'photo_changed':
        return 'bg-gray-100 dark:bg-gray-800';
      case 'video_added':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'image_added':
        return 'bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              
              {activity.media && activity.media.type === 'image' && (
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {activity.media.urls.slice(0, 6).map((url, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={url} 
                        alt={`Activity image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}