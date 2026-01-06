// ProjectCard.ts - Individual project card component
import gsap from 'gsap';

export interface ProjectData {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export class ProjectCard {
  private data: ProjectData;

  constructor(data: ProjectData) {
    this.data = data;
  }

  render(): string {
    const { name, description, html_url, homepage, language, stargazers_count, topics } = this.data;

    const category = this.determineCategory(language, topics);

    return `
      <div class="project-card glass-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" data-category="${category}" data-cursor-hover>
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-xl font-bold text-dark truncate">${name}</h3>
            <div class="flex items-center gap-1 text-gray-600 font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
              </svg>
              <span class="text-sm">${stargazers_count}</span>
            </div>
          </div>
          
          <p class="text-gray-800 text-sm mb-4 line-clamp-2 leading-relaxed">${description || 'No description available'}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            ${topics
        .slice(0, 3)
        .map((topic) => `<span class="px-2 py-1 text-xs bg-accent-aqua/20 text-accent-aqua rounded-full">${topic}</span>`)
        .join('')}
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: ${this.getLanguageColor(language)}"></span>
              <span class="text-sm text-gray-600">${language || 'Unknown'}</span>
            </div>
            
            <div class="flex gap-3">
              <a href="${html_url}" target="_blank" rel="noopener" class="text-gray-500 hover:text-dark transition-colors" data-cursor-hover>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
              </a>
              ${homepage
        ? `
                <a href="${homepage}" target="_blank" rel="noopener" class="text-gray-500 hover:text-accent-aqua transition-colors" data-cursor-hover>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              `
        : ''
      }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private determineCategory(language: string, topics: string[]): string {
    const frontendLangs = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Svelte'];
    const backendLangs = ['Python', 'Go', 'Rust', 'Java', 'C#', 'Ruby'];

    if (topics.includes('fullstack') || topics.includes('full-stack')) return 'fullstack';
    if (frontendLangs.includes(language)) return 'frontend';
    if (backendLangs.includes(language)) return 'backend';
    return 'frontend';
  }

  private getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Go: '#00ADD8',
      Rust: '#dea584',
      Java: '#b07219',
      Ruby: '#701516',
    };
    return colors[language] || '#6e7681';
  }

  init(selector: string): void {
    const element = document.querySelector(selector);
    if (!element) return;

    // Tilt effect
    element.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }
}
