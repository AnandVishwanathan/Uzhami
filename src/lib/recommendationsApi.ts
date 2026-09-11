import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using placeholders for UI testing.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  created_at: string;
  expires_at: string | null;
  status: 'active' | 'completed' | 'dismissed';
  metadata: Record<string, any>;
}

class RecommendationsAPI {
  static async getRecommendations(): Promise<Recommendation[]> {
    try {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Failed to fetch recommendations');
    }
  }

  static async updateRecommendationStatus(
    id: string,
    status: 'completed' | 'dismissed'
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('recommendations')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating recommendation:', error);
      throw new Error('Failed to update recommendation');
    }
  }

  static async createRecommendation(
    recommendation: Omit<Recommendation, 'id' | 'created_at' | 'user_id'>
  ): Promise<Recommendation> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recommendations')
        .insert([{ ...recommendation, user_id: user.id }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating recommendation:', error);
      throw new Error('Failed to create recommendation');
    }
  }
}

export default RecommendationsAPI;