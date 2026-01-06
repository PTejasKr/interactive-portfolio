// github-fetch Edge Function
// Fetches GitHub repos and caches them in Supabase

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    const githubUsername = Deno.env.get('GITHUB_USERNAME') || 'octocat';

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch repos from GitHub
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Interactive-Portfolio',
    };

    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Upsert to projects table
    for (const repo of repos) {
      const { error } = await supabase.from('projects').upsert(
        {
          github_repo: repo.full_name,
          title: repo.name,
          description: repo.description,
          tech_stack: [repo.language, ...repo.topics].filter(Boolean),
          live_url: repo.homepage,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'github_repo' }
      );

      if (error) {
        console.error(`Error upserting ${repo.name}:`, error);
      }
    }

    // Update cache
    await supabase.from('github_cache').upsert(
      {
        cache_key: `repos_${githubUsername}`,
        data: repos,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      { onConflict: 'cache_key' }
    );

    return new Response(
      JSON.stringify({ success: true, count: repos.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
