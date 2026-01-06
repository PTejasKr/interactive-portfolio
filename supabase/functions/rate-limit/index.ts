// rate-limit Edge Function
// Middleware for rate limiting API requests

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
};

interface RateLimitEntry {
  count: number;
  reset_at: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client identifier
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const endpoint = new URL(req.url).pathname;
    const key = `rate_limit:${clientIP}:${endpoint}`;

    // Get current rate limit entry from cache
    const { data: cacheData } = await supabase
      .from('github_cache')
      .select('data, expires_at')
      .eq('cache_key', key)
      .single();

    const now = new Date();
    let entry: RateLimitEntry;

    if (cacheData && new Date(cacheData.expires_at) > now) {
      entry = cacheData.data as RateLimitEntry;
      entry.count += 1;
    } else {
      entry = {
        count: 1,
        reset_at: new Date(now.getTime() + defaultConfig.windowMs).toISOString(),
      };
    }

    // Check if rate limit exceeded
    if (entry.count > defaultConfig.maxRequests) {
      const resetTime = new Date(entry.reset_at);
      const retryAfter = Math.ceil((resetTime.getTime() - now.getTime()) / 1000);

      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          retry_after: retryAfter,
          limit: defaultConfig.maxRequests,
          remaining: 0,
          reset: entry.reset_at,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(defaultConfig.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.reset_at,
            'Retry-After': String(retryAfter),
          },
        }
      );
    }

    // Update rate limit entry
    await supabase.from('github_cache').upsert(
      {
        cache_key: key,
        data: entry,
        expires_at: entry.reset_at,
      },
      { onConflict: 'cache_key' }
    );

    const remaining = defaultConfig.maxRequests - entry.count;

    return new Response(
      JSON.stringify({
        success: true,
        limit: defaultConfig.maxRequests,
        remaining,
        reset: entry.reset_at,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(defaultConfig.maxRequests),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': entry.reset_at,
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
