// types/auth.ts
export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  hoverColor: string;
}

export interface HeroContent {
  title: string[];
  subtitle: string[];
}

// Static data
export const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: 'google',
    color: 'bg-gray-800 hover:bg-gray-700',
    hoverColor: 'hover:bg-gray-700'
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: 'apple',
    color: 'bg-gray-800 hover:bg-gray-700',
    hoverColor: 'hover:bg-gray-700'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    color: 'bg-gray-800 hover:bg-gray-700',
    hoverColor: 'hover:bg-gray-700'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: 'bg-blue-600 hover:bg-blue-700',
    hoverColor: 'hover:bg-blue-700'
  }
];

export const HERO_CONTENT: HeroContent = {
  title: ['Unlock', 'Your Project', 'Performance'],
  subtitle: ['You will never know everything.', 'But you will know more...']
};

export const DEFAULT_FORM_DATA: SignInFormData = {
  email: '',
  password: '',
  rememberMe: false
};

export const DEFAULT_SIGNUP_DATA: SignUpFormData = {
  fullName: '',
  email: '',
  password: '',
  acceptTerms: false
};

export const DEFAULT_FORGOT_PASSWORD_DATA: ForgotPasswordFormData = {
  email: ''
};