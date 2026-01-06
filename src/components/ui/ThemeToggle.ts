// ThemeToggle.ts - Floating Theme Switcher
import gsap from 'gsap';

export class ThemeToggle {
    private button: HTMLElement;
    private isDark: boolean = false;

    constructor() {
        this.button = document.createElement('button');
        this.init();
    }

    private init(): void {
        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.isDark = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            this.isDark = false;
            document.documentElement.removeAttribute('data-theme');
        }

        this.render();
        this.addListeners();
        this.mount();
    }

    private render(): void {
        this.button.className = `
            fixed bottom-6 right-6 z-50 p-4 rounded-full
            bg-white/10 backdrop-blur-md border border-dark/10 dark:border-white/10
            shadow-lg hover:scale-110 active:scale-95 transition-all duration-300
            flex items-center justify-center group
            text-dark dark:text-white
        `;
        this.button.setAttribute('aria-label', 'Toggle Theme');
        this.button.id = 'theme-toggle';

        // Sun/Moon Icon SVG
        this.button.innerHTML = `
            <div class="relative w-6 h-6 overflow-hidden">
                <svg class="sun-icon absolute inset-0 transform transition-transform duration-500 rotate-0 ${this.isDark ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="moon-icon absolute inset-0 transform transition-transform duration-500 rotate-0 ${this.isDark ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
        `;
    }

    private addListeners(): void {
        this.button.addEventListener('click', () => this.toggle());
    }

    private toggle(): void {
        this.isDark = !this.isDark;

        if (this.isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');

            // Animation for icon switch
            const sun = this.button.querySelector('.sun-icon');
            const moon = this.button.querySelector('.moon-icon');

            if (sun && moon) {
                gsap.to(sun, { y: 24, opacity: 0, duration: 0.4, ease: 'back.in(1.7)' });
                gsap.fromTo(moon, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 });
            }

        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');

            const sun = this.button.querySelector('.sun-icon');
            const moon = this.button.querySelector('.moon-icon');

            if (sun && moon) {
                gsap.to(moon, { y: -24, opacity: 0, duration: 0.4, ease: 'back.in(1.7)' });
                gsap.fromTo(sun, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 });
            }
        }
    }

    private mount(): void {
        document.body.appendChild(this.button);
    }
}
