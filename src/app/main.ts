import '../styles/globals.css';
import { Loader } from '../components/ui/Loader';
import { initRouter } from './router';
import { appConfig } from './app.config';
import { AudioManager } from '../av/audio.manager';
import { CustomCursor } from '../components/cursor/CustomCursor';
import { ParticleField } from '../components/particles/ParticleField';
import { Footer } from '../components/layout/Footer';
import { TubelightNavbar } from '../components/ui/TubelightNavbar';
import { Landing } from '../sections/Landing/Landing';
import { SkillPlayground } from '../sections/Skills/SkillPlayground';
import { GitHubPark } from '../sections/Projects/GitHubPark';
import { AboutLounge } from '../sections/About/AboutLounge';
import { ContactDock } from '../sections/Contact/ContactDock';
import { ThemeToggle } from '../components/ui/ThemeToggle';

class App {
  private audioManager: AudioManager;
  private cursor: CustomCursor;
  private particles: ParticleField;

  constructor() {
    this.audioManager = new AudioManager();
    this.cursor = new CustomCursor();
    this.particles = new ParticleField();
  }

  async init(): Promise<void> {
    console.log(`[App] Initializing ${appConfig.name} v${appConfig.version}`);

    // Initialize Loader
    const loader = new Loader(async () => {
      // Start app after loader
      // Initialize core systems
      await this.audioManager.init();
      this.cursor.init();
      this.particles.init();

      // Initialize router and sections
      initRouter();

      // Render layout
      this.renderLayout();

      // Render sections
      this.renderSections();

      console.log('[App] Initialization complete');
    });

    loader.start();
  }

  private renderLayout(): void {
    const app = document.getElementById('app');
    if (!app) return;

    const footer = new Footer();

    // Tubelight Navbar handles its own rendering/mounting
    new TubelightNavbar();

    app.insertAdjacentHTML('beforeend', footer.render());
  }

  private renderSections(): void {
    const app = document.getElementById('app');
    if (!app) return;

    const sections = [
      new Landing(),
      new SkillPlayground(),
      new GitHubPark(),
      new AboutLounge(),
      new ContactDock(),
    ];

    const main = document.createElement('main');
    main.id = 'main-content';

    sections.forEach((section) => {
      main.insertAdjacentHTML('beforeend', section.render());
    });

    app.appendChild(main);

    // Initialize section scripts
    sections.forEach((section) => section.init());

    // Initialize Theme Toggle
    new ThemeToggle();
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init().catch(console.error);
});
