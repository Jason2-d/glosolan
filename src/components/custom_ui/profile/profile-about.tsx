'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

export function ProfileAbout() {
  const { profileData } = useUser();
  const { user, contactInfo } = profileData;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'briefcase':
        return Briefcase;
      case 'mail':
        return Mail;
      default:
        return Briefcase;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
          <p>{user.about}</p>
          <p className="break-words">
            You always want to make sure that your fonts work well together and try to limit the number of fonts you 
            use to three or less. Experiment and play around with the fonts that you already have in the software 
            you're working with reputable font websites. This may be the most commonly encountered tip I received 
            from the designers I spoke with. They highly encourage that you use different fonts in one design, but do 
            not over-exaggerate and go overboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactInfo.map((info, index) => {
            const IconComponent = getIconComponent(info.icon);
            return (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`p-2 rounded-lg bg-primary/10 flex-shrink-0`}>
                  <IconComponent className={`h-4 w-4 ${info.color}`} />
                </div>
                <div className="min-w-0"> {/* Added min-w-0 to enable text truncation */}
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium break-words whitespace-normal truncate">
                    {info.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}