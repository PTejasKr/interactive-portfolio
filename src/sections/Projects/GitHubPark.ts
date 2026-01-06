// GitHubPark.ts - GitHub projects showcase section
import { Section } from '@components/layout/Section';
import { ProjectCard } from './ProjectCard';
import { supabaseClient } from '@/services/supabase.client';
import { githubService } from '@/services/github.service';
import { StackBar } from '@/components/ui/StackBar';
import { LanguageBreakdownModal } from '@/components/ui/LanguageBreakdownModal';

export class GitHubPark extends Section {
  private stackBar: StackBar;
  private languageModal: LanguageBreakdownModal;

  constructor() {
    super({
      id: 'projects',
      title: 'GitHub Project Park',
      subtitle: 'Explore my latest creations',
    });
    this.stackBar = new StackBar();
    this.languageModal = new LanguageBreakdownModal();
  }

  render(): string {
    const content = `
      <!-- Sync Button Container -->
      <div id="sync-container" class="flex justify-center mb-8"></div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button class="filter-btn active px-4 py-2 rounded-full bg-accent-aqua text-dark font-medium transition-all shadow-lg hover:shadow-cyan-500/50" data-filter="all" data-cursor-hover>
          All
        </button>
        <button class="filter-btn px-4 py-2 rounded-full bg-white text-dark font-medium hover:bg-accent-aqua transition-all" data-filter="frontend" data-cursor-hover>
          Frontend
        </button>
        <button class="filter-btn px-4 py-2 rounded-full bg-white text-dark font-medium hover:bg-accent-aqua transition-all" data-filter="backend" data-cursor-hover>
          Backend
        </button>
        <button class="filter-btn px-4 py-2 rounded-full bg-white text-dark font-medium hover:bg-accent-aqua transition-all" data-filter="fullstack" data-cursor-hover>
          Full Stack
        </button>
      </div>

      <!-- Projects Grid -->
      <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Projects loaded dynamically -->
        ${Array(3).fill('<div class="project-skeleton animate-pulse glass-card rounded-2xl h-64 bg-white/50"></div>').join('')}
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <a href="https://github.com/PTejasKr" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 bg-dark text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg" data-cursor-hover>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
          </svg>
          View All on GitHub
        </a>
      </div>
    `;

    return this.wrapContent(content);
  }

  override async init(): Promise<void> {
    super.init();

    // Mount StackBar
    this.stackBar.mount(document.body);

    const session = await supabaseClient.getSession();
    this.renderSyncButton();
    this.loadProjects(session);
    this.setupFilters();
  }

  private renderSyncButton(): void {
    const container = document.getElementById('sync-container');
    if (!container) return;

    const btn = document.createElement('button');
    btn.className = 'glass-button px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-accent-aqua/20 transition-all shadow-lg hover:shadow-accent-aqua/30';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>Sync from GitHub</span>
    `;
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full"></span> <span>Syncing...</span>`;
      await this.loadProjects(null); // Force reload
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>Synced!</span>
      `;
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Sync from GitHub</span>
        `;
      }, 2000);
    });
    container.innerHTML = '';
    container.appendChild(btn);
  }

  private async loadProjects(session: any): Promise<void> {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
      const username = session?.user?.user_metadata?.user_name || 'PTejasKr';
      // Fetch up to 100 repos (page 1) to "sync all" as requested
      const repos = await githubService.getRepos(username, { sort: 'updated', per_page: 100 });

      const stats = githubService.calculateStackStats(repos);
      if (Object.keys(stats).length > 0) {
        this.stackBar.updateStats(stats);
      }

      grid.querySelectorAll('.project-skeleton').forEach((el) => el.remove());

      if (repos.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray-500 col-span-full py-8">No public repositories found.</p>';
        return;
      }

      // Fetch languages for all repos in parallel (limit might be an issue, but requested feature)
      // To satisfy "sync all" and "show language bar", we need this data.
      // We'll process them in batches if needed, but for now Promise.all for simplicity.
      // Note: This matches the user's "all" requirement.
      const projectsWithLanguages = await Promise.all(
        repos.map(async (repo) => {
          let languages = {};
          try {
            languages = await githubService.getLanguages(repo.owner.login, repo.name);
          } catch (e) {
            console.warn(`Failed to load languages for ${repo.name}`);
          }

          return {
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            topics: repo.topics || [],
            languages: languages
          };
        })
      );

      projectsWithLanguages.forEach((project) => {
        const card = new ProjectCard(project);
        grid.insertAdjacentHTML('beforeend', card.render());
      });

      // Add click handlers to show language breakdown
      grid.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          // Don't trigger if clicking on links
          if (target.closest('a')) return;

          const repoName = card.querySelector('h3')?.textContent || '';
          this.languageModal.open('PTejasKr', repoName);
        });
      });

      this.animateCards();

      if (session) {
        const container = document.getElementById('sync-container');
        if (container) {
          container.innerHTML = `
                <div class="glass-button px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-3 bg-white/80 text-green-700 border-green-200">
                  <div class="relative">
                     <img src="${session.user.user_metadata.avatar_url}" class="w-6 h-6 rounded-full" />
                     <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span>Synced as ${session.user.user_metadata.full_name || session.user.user_metadata.preferred_username}</span>
                </div>
             `;
        }
      }
    } catch (error) {
      console.error('[GitHubPark] Failed to load projects:', error);
      grid.innerHTML = '<p class="text-center text-gray-500 col-span-full">Failed to load projects. Check connectivity or rate limits.</p>';
    }
  }

  private setupFilters(): void {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach((b) => b.classList.remove('active', 'bg-accent-aqua'));
        filterBtns.forEach((b) => b.classList.add('bg-white'));
        btn.classList.add('active', 'bg-accent-aqua');
        btn.classList.remove('bg-white');

        const filter = btn.getAttribute('data-filter');
        this.filterProjects(filter || 'all');
      });
    });
  }

  private filterProjects(category: string): void {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      // Simple frontend implementation of filtering
      if (category === 'all' || cardCategory === category) {
        (card as HTMLElement).style.display = 'block';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  }

  private animateCards(): void {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      import('gsap').then(({ default: gsap }) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });
    });
  }
}
