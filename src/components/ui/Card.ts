// Card.ts - Glass-morphism card component
import gsap from 'gsap';

export interface CardProps {
  title?: string;
  content: string;
  image?: string;
  tags?: string[];
  link?: string;
  variant?: 'default' | 'glass' | 'solid';
}

export class Card {
  private props: CardProps;
  private element: HTMLElement | null = null;

  constructor(props: CardProps) {
    this.props = {
      variant: 'glass',
      ...props,
    };
  }

  render(): string {
    const { title, content, image, tags, link, variant } = this.props;

    const variantClasses = {
      default: 'bg-white shadow-lg',
      glass: 'bg-white/70 backdrop-blur-md shadow-xl',
      solid: 'bg-beige border-2 border-dark',
    };

    return `
      <div class="card ${variantClasses[variant!]} rounded-2xl overflow-hidden transition-transform duration-300" data-cursor-hover>
        ${image ? `<img src="${image}" alt="${title}" class="w-full h-48 object-cover" />` : ''}
        <div class="p-6">
          ${title ? `<h3 class="text-xl font-semibold mb-2">${title}</h3>` : ''}
          <p class="text-gray-600 mb-4">${content}</p>
          ${
            tags
              ? `
            <div class="flex flex-wrap gap-2 mb-4">
              ${tags.map((tag) => `<span class="px-2 py-1 text-xs bg-accent-aqua/20 text-accent-aqua rounded-full">${tag}</span>`).join('')}
            </div>
          `
              : ''
          }
          ${link ? `<a href="${link}" class="text-accent-aqua hover:underline">Learn more &rarr;</a>` : ''}
        </div>
      </div>
    `;
  }

  init(selector: string): void {
    this.element = document.querySelector(selector);
    if (!this.element) return;

    // Tilt effect on hover
    this.element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = this.element!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(this.element, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    this.element.addEventListener('mouseleave', () => {
      gsap.to(this.element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }
}
