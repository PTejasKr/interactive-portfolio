// MascotSpeech.ts - Speech bubble tooltip system
import gsap from 'gsap';

export class MascotSpeech {
  private container: HTMLElement | null = null;
  private bubble: HTMLElement | null = null;
  private textElement: HTMLElement | null = null;

  private typewriterTimeout: number = 0;

  constructor() {
    this.createBubble();
  }

  private createBubble(): void {
    this.container = document.getElementById('mascot-container');
    if (!this.container) return;

    this.bubble = document.createElement('div');
    this.bubble.className = 'mascot-speech-bubble';
    this.bubble.style.cssText = `
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      background: white;
      border-radius: 16px;
      padding: 12px 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      color: #0B0B0B;
      max-width: 200px;
      opacity: 0;
      pointer-events: none;
      z-index: 1001;
    `;

    // Speech bubble tail
    const tail = document.createElement('div');
    tail.style.cssText = `
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
    `;
    this.bubble.appendChild(tail);

    this.textElement = document.createElement('span');
    this.bubble.appendChild(this.textElement);

    this.container.appendChild(this.bubble);
  }

  show(message: string, duration: number = 4000): void {
    if (!this.bubble || !this.textElement) return;

    // this.isVisible = true;

    // Clear any existing text
    this.textElement.textContent = '';
    clearTimeout(this.typewriterTimeout);

    // Animate in
    gsap.to(this.bubble, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

    // Typewriter effect
    this.typewrite(message, 0);

    // Auto hide after duration
    if (duration > 0) {
      setTimeout(() => this.hide(), duration);
    }
  }

  private typewrite(message: string, index: number): void {
    if (!this.textElement || index > message.length) return;

    this.textElement.textContent = message.slice(0, index);

    if (index < message.length) {
      this.typewriterTimeout = window.setTimeout(() => {
        this.typewrite(message, index + 1);
      }, 30);
    }
  }

  hide(): void {
    if (!this.bubble) return;

    // this.isVisible = false;
    clearTimeout(this.typewriterTimeout);

    gsap.to(this.bubble, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  destroy(): void {
    clearTimeout(this.typewriterTimeout);
    this.bubble?.remove();
  }
}
