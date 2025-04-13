
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { initSupabase } from '@/utils/supabase-init';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Database } from 'lucide-react';

const InitializeSupabase: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitialize = async () => {
    setIsInitializing(true);
    setProgress(10);
    setError(null);
    
    try {
      // Artificial delay to show progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(30);
      
      // Initialize Supabase
      const result = await initSupabase();
      
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result.success) {
        setProgress(100);
        setIsComplete(true);
        toast.success("Database initialized successfully!");
      } else {
        throw new Error(result.error?.message || "Unknown error occurred");
      }
    } catch (err: any) {
      console.error("Initialization failed:", err);
      setError(err.message || "Failed to initialize Supabase");
      toast.error("Database initialization failed!");
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supabase Database Setup
        </CardTitle>
        <CardDescription>
          Initialize the database schema for your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isComplete && !error && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              This will create all necessary tables and sample data in your Supabase database.
              You only need to do this once when setting up the project.
            </p>
            {isInitializing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{progress}%</p>
              </div>
            )}
          </>
        )}
        
        {isComplete && (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Database initialized successfully!</span>
          </div>
        )}
        
        {error && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-center gap-2 text-red-600 font-medium">
              <AlertCircle className="h-5 w-5" />
              <span>Initialization failed</span>
            </div>
            <p className="mt-2 text-sm text-red-800">{error}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleInitialize} 
          disabled={isInitializing || isComplete}
          className="w-full"
        >
          {isInitializing ? "Initializing..." : isComplete ? "Completed" : "Initialize Database"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InitializeSupabase;
