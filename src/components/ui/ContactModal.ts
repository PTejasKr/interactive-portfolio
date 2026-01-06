// ContactModal.ts - Premium glass popup for contact options
import gsap from 'gsap';

export class ContactModal {
  private modal: HTMLElement;
  private overlay: HTMLElement;
  private isOpen: boolean = false;

  constructor() {
    this.modal = document.createElement('div');
    this.overlay = document.createElement('div');
    this.setupModal();
  }

  private setupModal(): void {
    // Overlay backdrop
    this.overlay.className = 'fixed inset-0 bg-dark/30 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300';
    this.overlay.id = 'contact-modal-overlay';

    // Modal Container
    this.modal.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] opacity-0 scale-95 pointer-events-none';
    this.modal.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl w-[90vw] max-w-md relative overflow-hidden">
        <!-- Close Button -->
        <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <!-- Content -->
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-dark mb-2">Connect With Me</h3>
          <p class="text-gray-600">Choose your preferred way to get in touch</p>
        </div>

        <div class="space-y-4">
          <!-- Gmail Button -->
          <a href="mailto:tejaskumar_punyap@srmap.edu.in" class="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all group border border-transparent hover:border-red-200 hover:shadow-lg hover:shadow-red-500/10" data-cursor-hover>
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-bold text-dark group-hover:text-red-600 transition-colors">Email Me</div>
              <div class="text-sm text-gray-500">tejaskumar_punyap@srmap.edu.in</div>
            </div>
          </a>

          <!-- LinkedIn Button -->
          <a href="https://www.linkedin.com/in/tejas-k-punyap" target="_blank" rel="noopener" class="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all group border border-transparent hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10" data-cursor-hover>
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-bold text-dark group-hover:text-blue-700 transition-colors">LinkedIn</div>
              <div class="text-sm text-gray-500">Connect professionally</div>
            </div>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);

    // Event Listeners
    modalLinker(this);
  }

  public open(): void {
    if (this.isOpen) return;
    this.isOpen = true;

    this.overlay.classList.remove('pointer-events-none');
    this.modal.classList.remove('pointer-events-none');

    gsap.to(this.overlay, { opacity: 1, duration: 0.3 });
    gsap.to(this.modal, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
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

// Helper to bind events (avoids `this` context issues in constructor)
function modalLinker(instance: ContactModal) {
  const closeBtn = instance['modal'].querySelector('#close-modal');
  const overlay = instance['overlay'];

  closeBtn?.addEventListener('click', () => instance.close());
  overlay?.addEventListener('click', () => instance.close());

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') instance.close();
  });
}
