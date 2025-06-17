'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { User } from '@/types/settings';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProfileCardProps {
  user: User;
  onUpdateUser?: (user: User) => void;
}

export function ProfileCard({ user, onUpdateUser }: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setSelectedFile(file);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !onUpdateUser) return;

    setIsUploading(true);
    
    try {
      // In a real application, you would upload to a server here
      // For demo purposes, we'll use the local preview
      const imageUrl = URL.createObjectURL(selectedFile);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdateUser({ ...user, avatar: imageUrl });
      setIsDialogOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setIsDialogOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    if (onUpdateUser) {
      onUpdateUser({ ...user, avatar: '' });
    }
  };

  return (
    <>
      <Card className="p-6">
        <CardContent className="flex flex-col items-center space-y-4 p-0">
          <div className="relative group">
            <Avatar className="h-24 w-24 ring-2 ring-border transition-all duration-200 group-hover:ring-primary/20">
              <AvatarImage 
                src={user.avatar} 
                alt={`${user.firstName} ${user.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {/* Camera button */}
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-2 border-background shadow-lg transition-all duration-200 hover:scale-110"
              onClick={handleImageClick}
              title="Change profile picture"
            >
              <Camera className="h-4 w-4 text-white" />
            </Button>

            {/* Remove image button (only show if user has an avatar) */}
            {user.avatar && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={handleRemoveImage}
                title="Remove profile picture"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{user.role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription>
              Preview your new profile picture before uploading.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-4">
            {previewImage && (
              <Avatar className="h-32 w-32 ring-2 ring-border">
                <AvatarImage 
                  src={previewImage} 
                  alt="Preview"
                  className="object-cover"
                />
                <AvatarFallback>Preview</AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelUpload}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Picture
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}