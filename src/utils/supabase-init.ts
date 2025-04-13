
import { supabase } from "@/lib/supabase";
import { setupTables } from "./supabase-setup";

/**
 * Initialize Supabase with SQL functions needed for table creation
 * This only needs to be run once when setting up the database
 */
export async function initSupabase() {
  console.log("Initializing Supabase with SQL functions...");
  
  // Create SQL function for creating products table
  const { error: fnError } = await supabase.rpc('create_sql_function_for_products');
  
  if (fnError) {
    // If the function already exists, this is fine
    if (!fnError.message.includes('already exists')) {
      console.error("Error creating SQL function:", fnError);
      
      // Create the function manually
      const { error } = await supabase.from('_sql').rpc('execute_sql', {
        sql_string: `
          CREATE OR REPLACE FUNCTION create_products_table()
          RETURNS void
          LANGUAGE plpgsql
          SECURITY DEFINER
          AS $$
          BEGIN
            CREATE TABLE IF NOT EXISTS products (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name TEXT NOT NULL,
              description TEXT NOT NULL,
              short_description TEXT,
              price INTEGER NOT NULL,
              image TEXT NOT NULL,
              category TEXT NOT NULL,
              featured BOOLEAN DEFAULT false,
              stock INTEGER DEFAULT 0,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            
            -- Add necessary indexes
            CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
            CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
          END;
          $$;
        `
      });
      
      if (error) {
        console.error("Error creating function manually:", error);
        return { success: false, error };
      }
    } else {
      console.log("SQL function already exists, continuing...");
    }
  } else {
    console.log("SQL function created successfully");
  }
  
  // Now set up the tables
  return await setupTables();
}
