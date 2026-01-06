// sync-github-cache.ts
// Script to sync GitHub repos to local cache/Supabase

import * as fs from 'fs';
import * as path from 'path';

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
  updated_at: string;
}

interface CacheData {
  repos: GitHubRepo[];
  timestamp: string;
  username: string;
}

const GITHUB_API = 'https://api.github.com';
const CACHE_FILE = 'data/github-cache.json';

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Interactive-Portfolio-Sync',
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  
  console.log(`Fetching repos for ${username}...`);
  
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=10`,
    { headers }
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  const repos = await response.json();
  console.log(`Fetched ${repos.length} repositories`);
  
  return repos;
}

async function saveToCache(data: CacheData): Promise<void> {
  const dir = path.dirname(CACHE_FILE);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  console.log(`Cache saved to ${CACHE_FILE}`);
}

function loadFromCache(): CacheData | null {
  if (!fs.existsSync(CACHE_FILE)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function syncToSupabase(repos: GitHubRepo[]): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase credentials not configured, skipping sync');
    return;
  }
  
  console.log('Syncing to Supabase...');
  
  for (const repo of repos) {
    const response = await fetch(`${supabaseUrl}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        github_repo: repo.full_name,
        title: repo.name,
        description: repo.description,
        tech_stack: [repo.language, ...repo.topics].filter(Boolean),
        live_url: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }),
    });
    
    if (!response.ok) {
      console.error(`Failed to sync ${repo.name}: ${response.statusText}`);
    }
  }
  
  console.log('Supabase sync complete');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const username = args[0] || process.env.GITHUB_USERNAME || 'octocat';
  const forceRefresh = args.includes('--force');
  
  console.log('GitHub Cache Sync Script');
  console.log('========================\n');
  
  // Check existing cache
  const existingCache = loadFromCache();
  
  if (existingCache && !forceRefresh) {
    const cacheAge = Date.now() - new Date(existingCache.timestamp).getTime();
    const cacheAgeHours = cacheAge / (1000 * 60 * 60);
    
    if (cacheAgeHours < 24) {
      console.log(`Cache is ${cacheAgeHours.toFixed(1)} hours old, still valid`);
      console.log('Use --force to refresh anyway');
      return;
    }
  }
  
  try {
    const repos = await fetchRepos(username);
    
    const cacheData: CacheData = {
      repos,
      timestamp: new Date().toISOString(),
      username,
    };
    
    await saveToCache(cacheData);
    await syncToSupabase(repos);
    
    console.log('\nSync complete!');
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

main();
