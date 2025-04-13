
import { createClient } from '@supabase/supabase-js';

// These should be replaced with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
