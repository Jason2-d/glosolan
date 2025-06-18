'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Camera } from 'lucide-react';
import { User, ProfileStats } from '@/types/profile';
import { useRef, useState } from 'react';

interface ProfileHeroProps {
  user: User;
  stats: ProfileStats;
  onCoverImageChange?: (file: File) => void;
}

export function ProfileHero({ user, stats, onCoverImageChange }: ProfileHeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const getUserInitials = () => {
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      await onCoverImageChange?.(file);
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative h-64 md:h-80 overflow-hidden group">
      {/* Cover Image or Ocean Background */}
      <div className="absolute inset-0">
        {user.coverImage ? (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-white text-center">
            <Camera className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Click Edit to change cover</p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload cover image"
      />


      {/* Profile Info - Updated with responsive text sizing */}
      <div className="absolute bottom-6 left-6 flex items-end space-x-4">
        <Avatar className="h-16 w-16 md:h-24 md:w-24 ring-4 ring-white/20 backdrop-blur-sm">
          {user.avatar ? (
            <AvatarImage 
              src={user.avatar} 
              alt={`${user.firstName} ${user.lastName}`}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="text-lg md:text-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-white pb-2 max-w-[180px] md:max-w-none">
          <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm md:text-lg opacity-90 whitespace-nowrap overflow-hidden text-ellipsis">
            {user.role}
          </p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="absolute bottom-6 right-6">        
        <Button 
          onClick={handleEditClick}
          disabled={isUploading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 disabled:opacity-50"
        >
          <Edit className="h-4 w-4" />
          <span className='hidden md:block'>{isUploading ? 'Uploading...' : 'Edit Cover'}</span>
          
        </Button>
      </div>
    </div>
  );
}