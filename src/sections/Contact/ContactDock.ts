// ContactDock.ts - Contact form section
import { Section } from '@components/layout/Section';
import { contactForm } from './contact.form';
import { ContactModal } from '@components/ui/ContactModal';

export class ContactDock extends Section {
  constructor() {
    super({
      id: 'contact',
      title: 'Get In Touch',
      subtitle: "Let's create something amazing together",
    });
  }

  render(): string {
    const content = `
      <div class="max-w-2xl mx-auto">
        <!-- Terminal-style form -->
        <div class="glass-panel bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <!-- Terminal header -->
          <div class="flex items-center gap-2 px-4 py-3 bg-white/10 border-b border-white/10">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="ml-4 text-gray-400 text-sm font-mono">contact@portfolio ~ %</span>
          </div>
          
          <!-- Form content -->
          <div class="p-6 md:p-8">
            <form id="contact-form" class="space-y-6">
              <div>
                <label class="block text-accent-aqua font-mono text-sm mb-2">$ name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  class="w-full bg-transparent border-b-2 border-gray-600 focus:border-accent-aqua text-[#333333] py-2 outline-none transition-colors font-mono"
                  placeholder="John Doe"
                >
              </div>
              
              <div>
                <label class="block text-accent-aqua font-mono text-sm mb-2">$ email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  class="w-full bg-transparent border-b-2 border-gray-600 focus:border-accent-aqua text-[#333333] py-2 outline-none transition-colors font-mono"
                  placeholder="john@example.com"
                >
              </div>
              
              <div>
                <label class="block text-accent-aqua font-mono text-sm mb-2">$ message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  required
                  class="w-full bg-transparent border-b-2 border-gray-600 focus:border-accent-aqua text-[#333333] py-2 outline-none transition-colors font-mono resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="w-full py-3 bg-accent-aqua text-dark font-bold rounded-lg hover:bg-aqua-dark transition-colors flex items-center justify-center gap-2"
                data-cursor-hover
              >
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
            
            <div id="form-status" class="mt-4 text-center font-mono text-sm hidden"></div>
          </div>
        </div>
        
        <!-- Alternative contact methods -->
        <div class="flex justify-center gap-8 mt-12">
          <a href="mailto:tejaskumar_punyap@srmap.edu.in" class="flex items-center gap-2 text-gray-600 hover:text-accent-aqua transition-colors" data-cursor-hover>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Email</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="flex items-center gap-2 text-gray-600 hover:text-accent-aqua transition-colors" data-cursor-hover>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    `;

    return this.wrapContent(content);
  }

  override init(): void {
    super.init();
    const modal = new ContactModal();
    contactForm.init(() => modal.open());
  }
}
