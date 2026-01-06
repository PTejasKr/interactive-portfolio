// CustomCursor.ts - Custom cursor with trailing effects
import { cursorEffects } from './cursor.effects';

export class CustomCursor {
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private trail: HTMLElement[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private cursorX: number = 0;
  private cursorY: number = 0;


  init(): void {
    if (this.isTouchDevice()) return;

    this.createCursor();
    this.createTrail();
    this.setupEventListeners();
    this.animate();

    // Hide default cursor
    document.body.style.cursor = 'none';

    console.log('[CustomCursor] Initialized');
  }

  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private createCursor(): void {
    const container = document.getElementById('cursor-container');
    if (!container) return;

    // Main cursor ring
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid #4FD1C5;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, border-color 0.2s;
      mix-blend-mode: difference;
    `;

    // Center dot
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'cursor-dot';
    this.cursorDot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: #4FD1C5;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
      transition: transform 0.1s;
    `;

    container.appendChild(this.cursor);
    container.appendChild(this.cursorDot);
  }

  private createTrail(): void {
    const container = document.getElementById('cursor-container');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: ${6 - i}px;
        height: ${6 - i}px;
        background: rgba(79, 209, 197, ${0.3 - i * 0.05});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
      `;
      container.appendChild(particle);
      this.trail.push(particle);
    }
  }

  private setupEventListeners(): void {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
      // this.isClicking = true;
      this.applyClickEffect();
    });

    document.addEventListener('mouseup', () => {
      // this.isClicking = false;
      this.removeClickEffect();
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.setHover(true));
      el.addEventListener('mouseleave', () => this.setHover(false));
    });
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Smooth follow
    this.cursorX += (this.mouseX - this.cursorX) * 0.15;
    this.cursorY += (this.mouseY - this.cursorY) * 0.15;

    if (this.cursor) {
      this.cursor.style.left = `${this.cursorX}px`;
      this.cursor.style.top = `${this.cursorY}px`;
    }

    if (this.cursorDot) {
      this.cursorDot.style.left = `${this.mouseX}px`;
      this.cursorDot.style.top = `${this.mouseY}px`;
    }

    // Update trail
    this.trail.forEach((particle, i) => {
      const delay = (i + 1) * 0.05;
      const x = this.mouseX + (this.cursorX - this.mouseX) * delay;
      const y = this.mouseY + (this.cursorY - this.mouseY) * delay;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
    });
  }

  setHover(isHovering: boolean): void {


    if (this.cursor) {
      if (isHovering) {
        this.cursor.style.width = '60px';
        this.cursor.style.height = '60px';
        this.cursor.style.borderColor = '#E63946';
      } else {
        this.cursor.style.width = '40px';
        this.cursor.style.height = '40px';
        this.cursor.style.borderColor = '#4FD1C5';
      }
    }
  }

  private applyClickEffect(): void {
    if (this.cursorDot) {
      this.cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
    cursorEffects.ripple(this.mouseX, this.mouseY);
  }

  private removeClickEffect(): void {
    if (this.cursorDot) {
      this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  destroy(): void {
    document.body.style.cursor = 'auto';
    this.cursor?.remove();
    this.cursorDot?.remove();
    this.trail.forEach((p) => p.remove());
  }
}
