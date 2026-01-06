// Section.ts - Base section wrapper component
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export abstract class Section {
  protected props: SectionProps;

  constructor(props: SectionProps) {
    this.props = props;
  }

  protected wrapContent(content: string): string {
    const { id, title, subtitle, className = '' } = this.props;

    return `
      <section id="${id}" class="min-h-screen py-16 px-6 ${className}">
        <div class="max-w-7xl mx-auto">
          ${title
        ? `
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">${title}</h2>
              ${subtitle ? `<p class="text-xl text-gray-600 section-subtitle">${subtitle}</p>` : ''}
            </div>
          `
        : ''
      }
          <div class="section-content">
            ${content}
          </div>
        </div>
      </section>
    `;
  }

  abstract render(): string;

  init(): void {
    const section = document.getElementById(this.props.id);
    if (!section) return;

    // Animate section elements on scroll
    const title = section.querySelector('.section-title');
    const subtitle = section.querySelector('.section-subtitle');
    const content = section.querySelector('.section-content');

    if (title) {
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (subtitle) {
      gsap.from(subtitle, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }

    if (content) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });
    }
  }
}
