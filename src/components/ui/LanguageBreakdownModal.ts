// LanguageBreakdownModal.ts - Modal to show language breakdown for a repository
import gsap from 'gsap';
import { githubService } from '@/services/github.service';

export class LanguageBreakdownModal {
    private modal: HTMLElement;
    private overlay: HTMLElement;
    private isOpen: boolean = false;

    constructor() {
        this.modal = document.createElement('div');
        this.overlay = document.createElement('div');
        this.setupModal();
    }

    private setupModal(): void {
        // Overlay
        this.overlay.className = 'fixed inset-0 bg-dark/40 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300';
        this.overlay.id = 'language-modal-overlay';

        // Modal
        this.modal.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] opacity-0 scale-95 pointer-events-none';
        this.modal.id = 'language-breakdown-modal';
        this.modal.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl w-[90vw] max-w-lg relative overflow-hidden">
        <button id="close-language-modal" class="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div id="language-modal-content">
          <!-- Content will be dynamically inserted -->
        </div>
      </div>
    `;

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);

        // Event listeners
        const closeBtn = this.modal.querySelector('#close-language-modal');
        closeBtn?.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    public async open(repoOwner: string, repoName: string): Promise<void> {
        if (this.isOpen) return;
        this.isOpen = true;

        const content = this.modal.querySelector('#language-modal-content');
        if (!content) return;

        // Show loading state
        content.innerHTML = `
      <div class="text-center py-8">
        <div class="animate-spin w-8 h-8 border-3 border-accent-aqua border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Loading language breakdown...</p>
      </div>
    `;

        this.overlay.classList.remove('pointer-events-none');
        this.modal.classList.remove('pointer-events-none');

        gsap.to(this.overlay, { opacity: 1, duration: 0.3 });
        gsap.to(this.modal, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });

        // Fetch language data
        try {
            const languages = await githubService.getLanguages(repoOwner, repoName);
            this.renderLanguageBreakdown(repoName, languages);
        } catch (error) {
            content.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-500">Failed to load language data</p>
        </div>
      `;
        }
    }

    private renderLanguageBreakdown(repoName: string, languages: Record<string, number>): void {
        const content = this.modal.querySelector('#language-modal-content');
        if (!content) return;

        const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
        const languagePercentages = Object.entries(languages)
            .map(([lang, bytes]) => ({
                name: lang,
                bytes,
                percentage: ((bytes / total) * 100).toFixed(1)
            }))
            .sort((a, b) => b.bytes - a.bytes);

        content.innerHTML = `
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-dark mb-2">${repoName}</h3>
        <p class="text-gray-600">Language Breakdown</p>
      </div>

      <div class="space-y-4">
        ${languagePercentages.map(({ name, percentage }) => `
          <div>
            <div class="flex justify-between mb-2">
              <span class="font-semibold text-dark">${name}</span>
              <span class="text-gray-600">${percentage}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-accent-aqua to-accent-primary rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500 text-center">
          Total: ${this.formatBytes(total)}
        </p>
      </div>
    `;
    }

    private formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    public close(): void {
        if (!this.isOpen) return;
        this.isOpen = false;

        gsap.to(this.overlay, { opacity: 0, duration: 0.3 });
        gsap.to(this.modal, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                this.overlay.classList.add('pointer-events-none');
                this.modal.classList.add('pointer-events-none');
            }
        });
    }
}
