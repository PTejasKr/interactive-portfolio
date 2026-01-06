// StackBar.ts - Visualizes the most used stack from GitHub stats


export interface StackStat {
  language: string;
  percentage: number;
  color?: string;
}

// Popular language brand colors
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Java: '#007396',
  'C#': '#239120',
  PHP: '#777BB4',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Swift: '#F05138',
  Kotlin: '#7F52FF',
  Dart: '#0175C2',
};

export class StackBar {
  private element: HTMLElement;
  private stats: StackStat[] = [];

  constructor() {
    this.element = document.createElement('div');
    this.element.className =
      'fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-dark/5 p-4 transform translate-y-full transition-transform duration-500 hidden md:block';
    this.element.id = 'stack-bar';
  }

  updateStats(stats: Record<string, number>): void {
    this.stats = Object.entries(stats)
      .map(([language, percentage]) => ({
        language,
        percentage,
        color: LANG_COLORS[language] || '#999999'
      }))
      .slice(0, 5); // Top 5

    this.render();
    this.show();
  }

  private render(): void {
    const statsHtml = this.stats.map(stat => `
      <div class="flex items-center gap-3 min-w-[150px]">
        <div class="flex flex-col gap-1 w-full">
           <div class="flex justify-between text-xs font-semibold text-dark/70">
             <span>${stat.language}</span>
             <span>${stat.percentage}%</span>
           </div>
           <div class="h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
             <div class="h-full rounded-full" style="width: ${stat.percentage}%; background-color: ${stat.color}"></div>
           </div>
        </div>
      </div>
    `).join('');

    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto flex items-center gap-8 justify-center">
        <div class="text-sm font-bold text-dark/40 uppercase tracking-wider whitespace-nowrap">Most Used Stack</div>
        <div class="h-8 w-[1px] bg-dark/10"></div>
        <div class="flex gap-8 items-center flex-1 justify-center overflow-x-auto">
          ${statsHtml}
        </div>
      </div>
    `;
  }

  mount(container: HTMLElement): void {
    container.appendChild(this.element);
  }

  show(): void {
    this.element.classList.remove('translate-y-full');
  }

  hide(): void {
    this.element.classList.add('translate-y-full');
  }
}
