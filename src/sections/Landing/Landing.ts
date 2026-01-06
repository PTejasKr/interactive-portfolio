// Landing.ts - Hero landing section
import { Section } from '@components/layout/Section';
import { landingAnimations } from './landing.animations';
import { FlipText } from '@/components/ui/FlipText';

export class Landing extends Section {
  constructor() {
    super({
      id: 'landing',
      className: 'relative flex items-center justify-center',
    });
  }

  render(): string {
    return `
      <section id="landing" class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="text-center z-30 relative">
          <h1 class="landing-title text-6xl md:text-8xl font-bold mb-6">
            <span class="block py-12">
              <span id="landing-hello" class="title-line inline-block tracking-tighter"></span>
            </span>
          </h1>

          <p class="text-2xl md:text-3xl font-primary font-semibold tracking-wide text-[#1E1E1E] dark:text-inverse mb-8 mt-4">
            <span class="inline-block hover:scale-105 transition-transform">Myself</span> <span class="inline-block text-accent-aqua hover:scale-110 transition-transform font-bold">Punyap Tejas Kumar</span>
          </p>
          
          <div class="landing-cta flex flex-col sm:flex-row gap-4 justify-center relative z-40">
            <a href="#contact" class="px-8 py-4 glass-button font-semibold rounded-full hover:bg-white/20 transition-all" data-cursor-hover>
              Get In Touch
            </a>
          </div>
        </div>
        
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <div class="w-6 h-10 border-2 border-dark rounded-full flex justify-center">
            <div class="w-1.5 h-3 bg-dark rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
    `;
  }

  override init(): void {
    const helloContainer = document.getElementById('landing-hello');
    if (helloContainer) {
      const greetings = [
        { text: 'HELLO', font: 'font-legacy' },
        { text: 'नमस्ते', font: 'font-hindi' }, // Hindi
        { text: 'HOLA', font: 'font-primary' }, // Spanish
        { text: 'BONJOUR', font: 'font-legacy' }, // French
        { text: 'こんにちは', font: 'font-jp' }, // Japanese
        { text: 'HALLO', font: 'font-primary' }, // German
      ];

      const flipText = new FlipText(helloContainer, greetings, 'text-6xl md:text-8xl');
      helloContainer.innerHTML = flipText.render();
      // Small delay to let DOM settle before animating
      setTimeout(() => flipText.animate(), 100);
    }

    landingAnimations.init();
  }
}
