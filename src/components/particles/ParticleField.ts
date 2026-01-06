// ParticleField.ts - Background particle system with cursor repulsion
import { particlesConfig } from './particles.config';
import { PARTICLES } from '@/assets/constants';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export class ParticleField {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private animationId: number = 0;
  private isActive: boolean = true;

  init(): void {
    const container = document.getElementById('particle-container');
    if (!container) return;

    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    this.createParticles();
    this.setupEventListeners();
    this.animate();

    console.log('[ParticleField] Initialized');
  }

  private resize(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    const count = particlesConfig.count;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * PARTICLES.SPEED,
        vy: (Math.random() - 0.5) * PARTICLES.SPEED,
        size: PARTICLES.MIN_SIZE + Math.random() * (PARTICLES.MAX_SIZE - PARTICLES.MIN_SIZE),
        opacity: 0.3 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? particlesConfig.colors.primary : particlesConfig.colors.secondary,
      });
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  private animate(): void {
    if (!this.isActive) return;
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p) => {
      // Apply cursor repulsion
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < PARTICLES.REPULSION_RADIUS) {
        const force = (PARTICLES.REPULSION_RADIUS - dist) / PARTICLES.REPULSION_RADIUS;
        p.vx += (dx / dist) * force * PARTICLES.REPULSION_STRENGTH;
        p.vy += (dy / dist) * force * PARTICLES.REPULSION_STRENGTH;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas!.width;
      if (p.x > this.canvas!.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas!.height;
      if (p.y > this.canvas!.height) p.y = 0;

      // Draw particle
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = p.color;
      this.ctx!.globalAlpha = p.opacity;
      this.ctx!.fill();
    });

    this.ctx.globalAlpha = 1;
  }

  setReactivity(amplitude: number): void {
    // Scale particles based on audio amplitude
    this.particles.forEach((p) => {
      p.size = (PARTICLES.MIN_SIZE + Math.random() * (PARTICLES.MAX_SIZE - PARTICLES.MIN_SIZE)) * (1 + amplitude);
    });
  }

  pause(): void {
    this.isActive = false;
    cancelAnimationFrame(this.animationId);
  }

  resume(): void {
    this.isActive = true;
    this.animate();
  }

  destroy(): void {
    this.pause();
    this.canvas?.remove();
  }
}
