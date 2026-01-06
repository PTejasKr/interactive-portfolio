// SkillOrb.ts - Individual skill orb component with physics
import gsap from 'gsap';

export interface SkillOrbData {
  name: string;
  level: number;
  years: number;
  category: string;
  logoUrl: string;
}

export class SkillOrb {
  private element: HTMLElement;

  private x: number = 0;
  private y: number = 0;
  private vx: number = 0;
  private vy: number = 0;

  constructor(element: HTMLElement, _data: SkillOrbData) {
    this.element = element;

    this.init();
  }

  private init(): void {
    this.setupHoverEffects();
    this.setupClickHandler();
  }

  private setupHoverEffects(): void {
    this.element.addEventListener('mouseenter', () => {
      gsap.to(this.element, {
        scale: 1.15,
        boxShadow: '0 20px 40px rgba(79, 209, 197, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Emit particles
      this.emitParticles();
    });

    this.element.addEventListener('mouseleave', () => {
      gsap.to(this.element, {
        scale: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }

  private setupClickHandler(): void {
    this.element.addEventListener('click', () => {
      // Bounce animation
      gsap.to(this.element, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    });
  }

  private emitParticles(): void {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 6px;
        height: 6px;
        background: #4FD1C5;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
      `;

      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 5;
      const distance = 50 + Math.random() * 30;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    }
  }

  applyForce(fx: number, fy: number): void {
    this.vx += fx;
    this.vy += fy;
  }

  update(): void {
    // Simple physics
    this.x += this.vx;
    this.y += this.vy;

    // Damping
    this.vx *= 0.95;
    this.vy *= 0.95;

    // Apply position
    gsap.set(this.element, {
      x: this.x,
      y: this.y,
    });
  }
}
