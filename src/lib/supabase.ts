
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://irdlreisgahtmnubbmky.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZGxyZWlzZ2FodG1udWJibWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mzg2MDcsImV4cCI6MjA2MDExNDYwN30.YXjJWgJLysAOai72R7PFGijlq6B2vl-1pYiQMXVNX_4';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
