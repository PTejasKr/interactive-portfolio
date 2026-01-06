// FlipText.ts - Flip Clock Animation Text
import gsap from 'gsap';

export interface FlipTextItem {
  text: string;
  font: string; // e.g., 'font-legacy', 'font-hindi', 'font-jp'
}

export class FlipText {
  private element: HTMLElement;
  private items: FlipTextItem[];
  private currentIndex: number = 0;
  private fontSize: string;
  private isAnimating: boolean = false;

  constructor(element: HTMLElement, items: FlipTextItem[], fontSize: string = 'text-8xl') {
    this.element = element;
    this.items = items;
    this.fontSize = fontSize;
  }

  render(): string {
    const currentItem = this.items[this.currentIndex];
    return `
      <div class="flip-text-container flex justify-center gap-2 perspective-1000 ${this.fontSize} ${currentItem.font} font-bold text-[#1E1E1E] dark:text-inverse transition-all duration-500 scale-[2.3] origin-center">
        ${currentItem.text.split('').map((char, _index) => `
          <div class="flip-char-wrapper relative inline-block perspective-1000" style="width: 1ch;">
            <div class="flip-card-inner relative w-full h-full transform-style-3d origin-center" data-char="${char}" style="opacity: 0;">
              <span class="block">${char}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  animate(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const chars = this.element.querySelectorAll('.flip-card-inner');

    // 1. Flip In
    gsap.to(chars, {
      opacity: 1,
      rotationX: 360,
      duration: 1.2,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      transformOrigin: '50% 50%',
      onStart: () => {
        gsap.set(chars, { rotationX: -90 });
      },
      onComplete: () => {
        // 2. Wait, then cycle
        setTimeout(() => {
          this.cycle();
        }, 3000);
      }
    });

    // Add continuous subtle motion for the current set
    chars.forEach((char, i) => {
      gsap.to(char, {
        y: 'random(-5, 5)',
        rotation: 'random(-2, 2)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2 + (i * 0.1)
      });
    });
  }

  cycle(): void {
    // Flip Out
    const chars = this.element.querySelectorAll('.flip-card-inner');
    gsap.to(chars, {
      rotationX: 90,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        // Update content
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.element.innerHTML = this.render();

        // Reset animating flag effectively, but actually we are starting a new animation immediately
        this.isAnimating = false;

        // Animate In new text
        this.animate();
      }
    });
  }
}
