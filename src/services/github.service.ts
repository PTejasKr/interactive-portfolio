// github.service.ts - GitHub API service
import { appConfig } from '@/app/app.config';

const GITHUB_API = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
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
  owner: {
    login: string;
  };
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

class GitHubService {
  private headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  async getHeaders(): Promise<HeadersInit> {
    const userHeaders: HeadersInit = { ...this.headers };

    try {
      // Try to get Supabase provider token first
      const session = await import('./supabase.client').then(m => m.supabaseClient.getSession());
      if (session?.provider_token) {
        (userHeaders as Record<string, string>)['Authorization'] = `token ${session.provider_token}`;
      } else if (appConfig.api.githubToken) {
        // Fallback to env token
        (userHeaders as Record<string, string>)['Authorization'] = `token ${appConfig.api.githubToken}`;
      }
    } catch (e) {
      console.warn('Failed to get auth headers', e);
    }

    return userHeaders;
  }

  async getUser(username: string): Promise<GitHubUser | null> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${GITHUB_API}/users/${username}`, { headers });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[GitHubService] Failed to fetch user:', error);
      return null;
    }
  }

  async getRepos(
    username: string,
    options: { sort?: string; per_page?: number } = {}
  ): Promise<GitHubRepo[]> {
    const { sort = 'updated', per_page = 100 } = options;

    try {
      const headers = await this.getHeaders();
      const session = await import('./supabase.client').then(m => m.supabaseClient.getSession());

      const endpoint = session?.provider_token
        ? `${GITHUB_API}/user/repos?sort=${sort}&per_page=${per_page}&type=owner`
        : `${GITHUB_API}/users/${username}/repos?sort=${sort}&per_page=${per_page}`;

      const response = await fetch(endpoint, { headers });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[GitHubService] Failed to fetch repos:', error);
      return [];
    }
  }

  calculateStackStats(repos: GitHubRepo[]): Record<string, number> {
    const stats: Record<string, number> = {};
    let total = 0;

    repos.forEach(repo => {
      if (repo.language) {
        stats[repo.language] = (stats[repo.language] || 0) + 1;
        total++;
      }
    });

    const percentages: Record<string, number> = {};
    Object.keys(stats).forEach(lang => {
      percentages[lang] = Math.round((stats[lang] / total) * 100);
    });

    return Object.fromEntries(
      Object.entries(percentages).sort(([, a], [, b]) => b - a)
    );
  }

  async getRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[GitHubService] Failed to fetch repo:', error);
      return null;
    }
  }

  async getLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}/languages`,
        { headers }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('[GitHubService] Failed to fetch languages:', error);
      return {};
    }
  }
}

export const githubService = new GitHubService();
