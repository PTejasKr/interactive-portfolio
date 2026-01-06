// Modal.ts - Modal/dialog component
import gsap from 'gsap';

export interface ModalProps {
  id: string;
  title: string;
  content: string;
  onClose?: () => void;
}

export class Modal {
  private props: ModalProps;
  private overlay: HTMLElement | null = null;
  private modal: HTMLElement | null = null;

  constructor(props: ModalProps) {
    this.props = props;
  }

  render(): string {
    const { id, title, content } = this.props;

    return `
      <div id="${id}-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden">
        <div id="${id}" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">${title}</h2>
            <button class="modal-close w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center" data-cursor-hover>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="modal-content">
            ${content}
          </div>
        </div>
      </div>
    `;
  }

  init(): void {
    this.overlay = document.getElementById(`${this.props.id}-overlay`);
    this.modal = document.getElementById(this.props.id);

    if (!this.overlay || !this.modal) return;

    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn?.addEventListener('click', () => this.close());

    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  open(): void {
    if (!this.overlay || !this.modal) return;

    this.overlay.classList.remove('hidden');

    gsap.fromTo(
      this.overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(
      this.modal,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }

  close(): void {
    if (!this.overlay || !this.modal) return;

    gsap.to(this.modal, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
    });

    gsap.to(this.overlay, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        this.overlay?.classList.add('hidden');
        this.props.onClose?.();
      },
    });
  }
}
