// AboutLounge.ts - About me section
import { Section } from '@components/layout/Section';

export class AboutLounge extends Section {
  constructor() {
    super({
      id: 'about',
      title: 'About Me',
      subtitle: 'Get to know the person behind the code',
    });
  }

  render(): string {
    const content = `
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Avatar/Image -->
        <div class="relative">
          <div class="about-image w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full bg-gradient-to-br from-accent-aqua to-accent-red/50 p-1">
            <div class="w-full h-full rounded-full overflow-hidden">
              <img src="/baymax.png" alt="Profile Picture" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <!-- Floating badges -->
          <div class="absolute top-0 right-0 md:right-12 bg-white rounded-full px-4 py-2 shadow-lg animate-bounce">
            <span class="text-accent-aqua font-bold">5+ Years</span>
          </div>
          <div class="absolute bottom-4 left-0 md:left-8 bg-white rounded-full px-4 py-2 shadow-lg animate-bounce delay-150">
            <span class="font-bold">50+ Projects</span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="space-y-6">
          <p class="text-lg text-gray-800 leading-relaxed font-medium">
            Hi! I'm a passionate developer who loves creating immersive digital experiences. 
            I believe that great software should not only work flawlessly but also delight users 
            with thoughtful interactions and beautiful design.
          </p>
          
          <p class="text-lg text-gray-800 leading-relaxed font-medium">
            When I'm not coding, you'll find me exploring new technologies, contributing to 
            open-source projects, or teaching others about the joy of programming.
          </p>
          
          <div class="grid grid-cols-2 gap-6 pt-6">
            <div>
              <h4 class="font-bold text-2xl text-accent-aqua">5+</h4>
              <p class="text-gray-500">Years Experience</p>
            </div>
            <div>
              <h4 class="font-bold text-2xl text-accent-aqua">50+</h4>
              <p class="text-gray-500">Projects Completed</p>
            </div>
            <div>
              <h4 class="font-bold text-2xl text-accent-aqua">20+</h4>
              <p class="text-gray-500">Happy Clients</p>
            </div>
            <div>
              <h4 class="font-bold text-2xl text-accent-aqua">10k+</h4>
              <p class="text-gray-500">Lines of Code</p>
            </div>
          </div>
          
          <div class="pt-6">
            <a href="https://docs.google.com/document/d/1EskC8cfP9iqe8vEyAR0KbjvlGb-8K4DUaN8TtrkzxdM/edit?usp=sharing" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 bg-dark text-white rounded-full hover:bg-gray-800 transition-colors" data-cursor-hover>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              View Resume
            </a>
          </div>
        </div>
      </div>
    `;

    return this.wrapContent(content);
  }
}
