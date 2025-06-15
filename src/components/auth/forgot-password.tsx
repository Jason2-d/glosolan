"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// Import types and data
import { 
  ForgotPasswordFormData, 
  HERO_CONTENT, 
  DEFAULT_FORGOT_PASSWORD_DATA 
} from '../../types/auth';

export default function ForgotPassword() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>(DEFAULT_FORGOT_PASSWORD_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendRecoveryEmail = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Recovery email sent to:', formData.email);
    setEmailSent(true);
    setIsLoading(false);
  };

  const handleBackToSignIn = () => {
    console.log('Navigate back to sign in');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Hero */}
      <div className="flex-1 bg-gradient-to-br from-red-500 to-red-600 items-center justify-center p-8 hidden md:block">
        <div className="max-w-md w-full">
          {/* Video/Image Placeholder */}
          <Card className="bg-red-400/30 border-none backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Hero Text */}
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {HERO_CONTENT.title.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < HERO_CONTENT.title.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-red-100 text-lg leading-relaxed">
              {HERO_CONTENT.subtitle.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < HERO_CONTENT.subtitle.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Forgot Password Form */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center p-8">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
              <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
            </div>
            
            <h2 className="text-white text-2xl font-semibold mb-2">
              Forget Your Password?
            </h2>
            <p className="text-gray-400">
              Enter your email & instructions will be sent to you!
            </p>
          </div>

          {/* Success Message */}
          {emailSent && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <p className="text-green-400 text-sm">
                Recovery instructions have been sent to your email address.
              </p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your email"
                disabled={emailSent}
              />
            </div>

            {/* Send Recovery Email Button */}
            <Button
              onClick={handleSendRecoveryEmail}
              disabled={isLoading || !formData.email || emailSent}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : emailSent ? 'Email Sent!' : 'Send Recovery Email'}
            </Button>

            {/* Back to Sign In */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Forget it. Send me back to{' '}
                <Button 
                  variant="link" 
                  onClick={handleBackToSignIn}
                  className="text-red-500 hover:text-red-400 p-0 h-auto"
                >
                  Sign In
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}