// TubelightNavbar.ts - "Tubelight" Style Navigation
import gsap from 'gsap';

export class TubelightNavbar {
    private nav: HTMLElement;
    private items = [
        { label: 'Home', id: '#landing' },
        { label: 'Skills', id: '#skills' },
        { label: 'Projects', id: '#projects' },
        { label: 'About', id: '#about' },
        { label: 'Contact', id: '#contact' }
    ];

    constructor() {
        this.nav = document.createElement('nav');
        this.init();
    }

    private init(): void {
        this.render();
        this.setupInteractions();
        this.mount();
    }

    private render(): void {
        this.nav.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-50';

        // Glass container with "tubelight" container look
        const containerClass = `
      flex items-center gap-1 p-2 rounded-full
      bg-white/10 backdrop-blur-md border border-white/20
      shadow-[0_8px_32px_rgba(0,0,0,0.1)]
      dark:bg-charcoal/50 dark:border-white/5
    `;

        this.nav.innerHTML = `
      <div class="${containerClass}">
        ${this.items.map((item, index) => `
          <a href="${item.id}" class="nav-item relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 text-dark/70 dark:text-white/70 hover:text-dark dark:hover:text-white" data-index="${index}">
            <span class="relative z-10">${item.label}</span>
            <span class="tubelight-glow absolute inset-0 rounded-full opacity-0 transition-opacity duration-300">
                <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-accent-aqua/50 blur-[2px]"></span>
                <span class="absolute inset-0 bg-accent-aqua/5 rounded-full"></span>
            </span>
            ${index === 0 ? '<span class="active-lamp absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full shadow-[0_0_15px_rgba(79,209,197,0.3)]"></span>' : ''}
          </a>
        `).join('')}
      </div>
    `;
    }

    private setupInteractions(): void {
        const items = this.nav.querySelectorAll('.nav-item');
        const lamp = this.nav.querySelector('.active-lamp') as HTMLElement;

        items.forEach((item) => {
            item.addEventListener('click', () => {
                // e.preventDefault(); // Optional: let default anchor work for smooth scroll usually
                this.moveLamp(item as HTMLElement, lamp);
            });

            // Optional: Add hover "flicker" effects here if requested
        });

        // Handle scroll spy to update active index based on section
        window.addEventListener('scroll', () => {
            // Simple scroll spy logic could go here
        }, { passive: true });
    }

    private moveLamp(targetItem: HTMLElement, lamp: HTMLElement): void {
        if (!lamp) return;

        // We can use FLIP or just append to new parent for simple movement
        // For smooth animation between parents, FLIP is best, but absolute positioning is easier here

        // Let's animate the lamp to the new target's position relative to the container
        const container = this.nav.firstElementChild as HTMLElement;
        const targetRect = targetItem.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const offsetX = targetRect.left - containerRect.left;
        const width = targetRect.width;

        gsap.to(lamp, {
            left: offsetX,
            width: width,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    }

    private mount(): void {
        const app = document.getElementById('app');
        if (app) {
            // Append to app container
            app.appendChild(this.nav);
        } else {
            document.body.appendChild(this.nav);
        }
    }

    public getElement(): HTMLElement {
        return this.nav;
    }
}
