// Header.ts - Site header/navigation component
import { SoundToggle } from '@/components/ui/SoundToggle';

export class Header {
  private isMenuOpen: boolean = false;

  render(): string {
    return `
      <header class="fixed top-0 left-0 right-0 z-40 glass-panel transition-all duration-300">
        <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#landing" class="text-2xl font-bold text-dark" data-cursor-hover>
            Portfolio<span class="text-accent-aqua">.</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="hidden md:flex items-center gap-8">
            <li><a href="#skills" class="nav-link" data-cursor-hover>Skills</a></li>
            <li><a href="#projects" class="nav-link" data-cursor-hover>Projects</a></li>
            <li><a href="#experience" class="nav-link" data-cursor-hover>Experience</a></li>
            <li><a href="#about" class="nav-link" data-cursor-hover>About</a></li>
            <li><a href="#contact" class="nav-link text-accent-aqua font-semibold" data-cursor-hover>Contact</a></li>
          </ul>

          <!-- Sound Toggle Placeholder -->
          <div id="sound-toggle-container" class="hidden md:block"></div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden p-2" data-cursor-hover>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden hidden absolute top-full left-0 right-0 bg-beige border-b border-dark/10 py-4">
          <ul class="flex flex-col items-center gap-4">
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#experience" class="nav-link">Experience</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#contact" class="nav-link text-accent-aqua font-semibold">Contact</a></li>
          </ul>
        </div>
      </header>
    `;
  }

  init(): void {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Sound Toggle
    const soundContainer = document.getElementById('sound-toggle-container');
    if (soundContainer) {
      const soundToggle = new SoundToggle();
      soundToggle.mount(soundContainer);
    }

    menuBtn?.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen;
      mobileMenu?.classList.toggle('hidden', !this.isMenuOpen);
    });

    // Close menu on link click
    mobileMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        this.isMenuOpen = false;
        mobileMenu.classList.add('hidden');
      });
    });
  }
}
