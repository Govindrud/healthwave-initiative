
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import InitializeSupabase from "@/components/InitializeSupabase";

const DatabaseSetup = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Database Setup</h1>
          <p className="text-muted-foreground mb-8">
            Initialize your Supabase database with the necessary tables and sample data
          </p>
          
          <InitializeSupabase />
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium mb-4">What this does</h2>
            <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Creates a products table in your Supabase database</li>
              <li>Adds sample product data for testing</li>
              <li>Sets up proper indexes for efficient querying</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DatabaseSetup;
