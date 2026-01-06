// supabase.client.ts - Supabase client initialization
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { appConfig } from '@/app/app.config';

class SupabaseService {
  private client: SupabaseClient | null = null;

  getClient(): SupabaseClient | null {
    if (this.client) return this.client;

    const { supabaseUrl, supabaseKey } = appConfig.api;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('[Supabase] Missing credentials, some features may not work');
      return null;
    }

    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });

    return this.client;
  }

  // Authentication helpers
  async signInWithGitHub(): Promise<void> {
    const client = this.getClient();
    if (!client) return;

    const { error } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin, // Redirect back to the portfolio
        scopes: 'read:user repo', // Request repo access
      },
    });

    if (error) {
      console.error('[Supabase] GitHub sign-in failed:', error);
    }
  }

  async getSession() {
    const client = this.getClient();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session;
  }

  async signOut(): Promise<void> {
    const client = this.getClient();
    if (!client) return;

    await client.auth.signOut();
  }

  // Database helpers
  async query<T>(table: string, select: string = '*'): Promise<T[] | null> {
    const client = this.getClient();
    if (!client) return null;

    const { data, error } = await client.from(table).select(select);

    if (error) {
      console.error(`[Supabase] Query error on ${table}:`, error);
      return null;
    }

    return data as T[];
  }

  async insert<T>(table: string, data: Partial<T>): Promise<T | null> {
    const client = this.getClient();
    if (!client) return null;

    const { data: result, error } = await client
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error(`[Supabase] Insert error on ${table}:`, error);
      return null;
    }

    return result as T;
  }

  // Real-time subscription
  subscribe<T>(
    table: string,
    callback: (payload: T) => void
  ): (() => void) | null {
    const client = this.getClient();
    if (!client) return null;

    const channel = client
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => callback(payload.new as T)
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }
}

export const supabaseClient = new SupabaseService();
