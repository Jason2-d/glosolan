'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Calendar, Clock, Phone } from 'lucide-react';
import { useUser } from '@/contexts/user-context';
import { format } from 'date-fns';

export function ProfileInformation() {
  const { profileData } = useUser();
  const { user, teams } = profileData;

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return format(date, 'dd MMM yyyy');
  };

  const getLastTaskDate = () => {
    // Mock last task completion date
    return format(new Date('2024-03-09'), 'dd MMM yyyy');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground leading-relaxed">
              Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">{user.firstName} {user.lastName}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">{user.phoneNumber}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{user.city}, {user.country}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joining Date:</span>
                <span className="font-medium">{formatDate(user.joiningDate)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Task Complete:</span>
                <span className="font-medium">{getLastTaskDate()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='hidden'>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Active Teams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${team.color}`} />
                <div>
                  <p className="font-medium text-sm">{team.name}</p>
                  <p className="text-xs text-muted-foreground">({team.memberCount} members)</p>
                </div>
              </div>
              {team.isActive && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}