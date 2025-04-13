
import { supabase } from '@/lib/supabase';

export interface DatabaseRecord {
  id?: string;
  created_at?: string;
  [key: string]: any;
}

class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}
  
  /**
   * Get DatabaseService singleton instance
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
  
  /**
   * Get all records from a table
   */
  async getAll<T extends DatabaseRecord>(table: string, limit = 100, offset = 0): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .range(offset, offset + limit - 1);
      
    if (error) {
      console.error(`Error fetching records from ${table}:`, error);
      return [];
    }
    
    return data as T[];
  }
  
  /**
   * Get a record by ID
   */
  async getById<T extends DatabaseRecord>(table: string, id: string | number): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching record #${id} from ${table}:`, error);
      return null;
    }
    
    return data as T;
  }
  
  /**
   * Get records that match certain conditions
   */
  async getWhere<T extends DatabaseRecord>(
    table: string, 
    conditions: Record<string, any>, 
    limit = 100, 
    offset = 0
  ): Promise<T[]> {
    let query = supabase.from(table).select('*');
    
    // Apply all conditions
    for (const [field, value] of Object.entries(conditions)) {
      query = query.eq(field, value);
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching records from ${table} with conditions:`, conditions, error);
      return [];
    }
    
    return data as T[];
  }
  
  /**
   * Create a new record
   */
  async create<T extends DatabaseRecord>(table: string, data: Omit<T, 'id' | 'created_at'>): Promise<string | number | null> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select('id')
      .single();
      
    if (error) {
      console.error(`Error creating record in ${table}:`, error);
      return null;
    }
    
    return result?.id || null;
  }
  
  /**
   * Update an existing record
   */
  async update<T extends DatabaseRecord>(table: string, id: string | number, data: Partial<T>): Promise<boolean> {
    const { error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id);
      
    if (error) {
      console.error(`Error updating record #${id} in ${table}:`, error);
      return false;
    }
    
    return true;
  }
  
  /**
   * Delete a record
   */
  async delete(table: string, id: string | number): Promise<boolean> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting record #${id} from ${table}:`, error);
      return false;
    }
    
    return true;
  }
  
  /**
   * Search records
   */
  async search<T extends DatabaseRecord>(
    table: string, 
    field: string, 
    query: string,
    limit = 100, 
    offset = 0
  ): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .ilike(field, `%${query}%`)
      .range(offset, offset + limit - 1);
      
    if (error) {
      console.error(`Error searching records in ${table} for ${field} like ${query}:`, error);
      return [];
    }
    
    return data as T[];
  }
}

export default DatabaseService;
