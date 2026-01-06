// github.fetch.ts - GitHub API fetching utilities
import { ProjectData } from './ProjectCard';
import { appConfig } from '@/app/app.config';

const GITHUB_API = 'https://api.github.com';
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheData {
  repos: ProjectData[];
  timestamp: number;
}

export async function fetchGitHubRepos(username: string = 'PTejasKr'): Promise<ProjectData[]> {
  // Check cache first
  const cached = getFromCache();
  if (cached) return cached;

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (appConfig.api.githubToken) {
      headers.Authorization = `token ${appConfig.api.githubToken}`;
    }

    const response = await fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Transform to ProjectData format
    const projects: ProjectData[] = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics || [],
    }));

    // Cache the results
    saveToCache(projects);

    return projects;
  } catch (error) {
    console.error('[github.fetch] Error fetching repos:', error);
    // Return mock data on error
    return getMockRepos();
  }
}

function getFromCache(): ProjectData[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CacheData = JSON.parse(cached);
    if (Date.now() - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data.repos;
  } catch {
    return null;
  }
}

function saveToCache(repos: ProjectData[]): void {
  try {
    const data: CacheData = {
      repos,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    console.warn('[github.fetch] Failed to cache repos');
  }
}

function getMockRepos(): ProjectData[] {
  return [
    {
      name: 'awesome-project',
      description: 'An awesome full-stack project with modern technologies',
      html_url: 'https://github.com/PTejasKr',
      homepage: 'https://example.com',
      language: 'TypeScript',
      stargazers_count: 128,
      forks_count: 24,
      topics: ['react', 'typescript', 'fullstack'],
    },
    {
      name: 'creative-portfolio',
      description: 'Interactive portfolio with 3D graphics and animations',
      html_url: 'https://github.com/PTejasKr',
      homepage: 'https://example.com',
      language: 'JavaScript',
      stargazers_count: 89,
      forks_count: 15,
      topics: ['three.js', 'gsap', 'frontend'],
    },
    {
      name: 'api-server',
      description: 'High-performance REST API built with modern practices',
      html_url: 'https://github.com/PTejasKr',
      language: 'Python',
      stargazers_count: 56,
      forks_count: 12,
      topics: ['fastapi', 'python', 'backend'],
    },
  ];
}
