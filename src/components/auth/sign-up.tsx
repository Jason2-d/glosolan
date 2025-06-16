"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

// Import types and data
import { 
  SignUpFormData, 
  SocialProvider, 
  SOCIAL_PROVIDERS, 
  HERO_CONTENT, 
  DEFAULT_SIGNUP_DATA 
} from '../../types/auth';

// Social Icon Components
const SocialIcon = ({ provider }: { provider: SocialProvider }) => {
  const icons = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    apple: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.082.34-.09.394-.293 1.189-.334 1.352-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  };

  return icons[provider.icon as keyof typeof icons] || null;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>(DEFAULT_SIGNUP_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sign up attempt:', formData);
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} signup initiated`);
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

      {/* Right Section - Sign Up Form */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center p-8">
        <div className="w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
              <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
            </div>
            
            <h2 className="text-white text-2xl font-semibold mb-2">
              Hey, Hello 👋
            </h2>
            <p className="text-gray-400">
              Create account to start using DashTail
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your full name"
              />
            </div>

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
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500 pr-12"
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 hover:bg-transparent"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', !!checked)}
                className="border-gray-600 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 mt-1"
              />
              <Label htmlFor="terms" className="text-gray-300 text-sm leading-5">
                You accept our{' '}
                <Button variant="link" className="text-red-500 hover:text-red-400 p-0 h-auto">
                  Terms & Conditions
                </Button>
              </Label>
            </div>

            {/* Create Account Button */}
            <Button
              onClick={handleSignUp}
              disabled={isLoading || !formData.acceptTerms}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create an Account'}
            </Button>

            {/* Social Login */}
            <div className="flex justify-center space-x-4 pt-4">
              {SOCIAL_PROVIDERS.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  size="icon"
                  onClick={() => handleSocialLogin(provider.name)}
                  className={`w-12 h-12 ${provider.color} border-gray-700 rounded-full transition-colors`}
                >
                  <SocialIcon provider={provider} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}