
/**
 * Application Configuration
 * 
 * Central configuration for the MeantToHelp application.
 * This provides environment-specific settings and feature flags.
 */

// Environment detection
const isDevelopment = import.meta.env.DEV || false;
const isProduction = import.meta.env.PROD || false;
const isTesting = import.meta.env.MODE === 'test' || false;

// Base URLs
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000/api'
  : 'https://api.meanttohelp.com';

// Feature flags
const FEATURES = {
  enableVoiceAssistant: true,
  enableEmotionDetection: true,
  enableAIRecommendations: true,
  enableMultiLanguage: true,
  enableBookingSystem: true,
  enablePayments: true,
};

// AI Configuration
const AI_CONFIG = {
  defaultModel: 'gpt-3.5-turbo',
  defaultVoice: 'EXAVITQu4vr4xnSDxMaL', // Sarah voice
  voiceModel: 'eleven_multilingual_v2',
  maxConversationLength: 20,
  personas: [
    { id: 'therapist', name: 'Therapist' },
    { id: 'coach', name: 'Life Coach' },
    { id: 'mindful', name: 'Mindfulness Guide' },
    { id: 'friend', name: 'Supportive Friend' }
  ]
};

// Regional settings
const REGIONS = {
  defaultRegion: 'india',
  availableRegions: ['india', 'global'] as const,
  currencyByRegion: {
    india: 'INR',
    global: 'USD'
  }
};

// Application constants
const APP_CONSTANTS = {
  siteName: 'MeantToHelp',
  contactEmail: 'support@meanttohelp.com',
  maxFileUploadSize: 5 * 1024 * 1024, // 5MB
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
};

export const AppConfig = {
  environment: {
    isDevelopment,
    isProduction,
    isTesting
  },
  api: {
    baseUrl: API_BASE_URL
  },
  features: FEATURES,
  ai: AI_CONFIG,
  regions: REGIONS,
  constants: APP_CONSTANTS
};

export default AppConfig;
